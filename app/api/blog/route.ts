import { NextResponse } from 'next/server';

async function fetchWithRetry(url: string, options: RequestInit, retries: number = 3): Promise<Response> {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      const errorText = await res.text().catch(() => 'No response body');
      throw new Error(`Failed to fetch blog posts: ${res.status} ${res.statusText} - ${errorText}`);
    }
    return res;
  } catch (error) {
    if (retries > 0) {
      // Add exponential backoff
      const delay = 1000 * Math.pow(2, 3 - retries); // 1s, 2s, 4s
      console.warn(`Retrying after ${delay}ms... (${retries} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetry(url, options, retries - 1);
    } else {
      console.error('Failed to fetch blog posts after multiple attempts:', error);
      throw error;
    }
  }
}

// POST endpoint for AI chat interactions
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, action, blogId, selectedBlog } = body;

    console.log('AI Chat Request:', { message, action, blogId, selectedBlogId: selectedBlog?.id });

    if (!process.env.CLOUDFLARE_AI_CHAT) {
      return NextResponse.json(
        { type: 'error', message: 'AI service not configured' },
        { status: 500 }
      );
    }

    // Main chat endpoint - handles personal questions and blog queries
    if (action === 'chat' || !action) {
      try {
        const requestBody = {
          message: message,
          ...(blogId && { blogId: blogId }),
          ...(selectedBlog?.id && { blogId: selectedBlog.id })
        };

        const res = await fetch(`${process.env.CLOUDFLARE_AI_CHAT}/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        });

        if (res.ok) {
          const data = await res.json();
          console.log('Cloudflare AI Chat Response:', data);

          return NextResponse.json({
            type: 'ai_response',
            message: data.response,
            relevantBlogs: data.relevantBlogs || [],
            blogId: data.blogId,
            timestamp: data.timestamp,
            query: message
          });
        } else {
          console.error('Cloudflare AI Chat API failed:', res.status, res.statusText);
          const errorData = await res.text();
          console.error('Error details:', errorData);
          
          return NextResponse.json(
            { type: 'error', message: 'AI service temporarily unavailable' },
            { status: 502 }
          );
        }
      } catch (err) {
        console.error('Error calling Cloudflare AI Chat API:', err);
        return NextResponse.json(
          { type: 'error', message: 'Failed to connect to AI service' },
          { status: 502 }
        );
      }
    }

    // Blog recommendations endpoint
    if (action === 'recommend') {
      try {
        const res = await fetch(`${process.env.CLOUDFLARE_AI_CHAT}/recommend`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: message })
        });

        if (res.ok) {
          const data = await res.json();
          console.log('Cloudflare AI Recommend Response:', data);

          return NextResponse.json({
            type: 'recommendations',
            message: data.answer,
            recommendations: data.recommendations || [],
            query: data.query
          });
        } else {
          console.error('Cloudflare AI Recommend API failed:', res.status, res.statusText);
          return NextResponse.json(
            { type: 'error', message: 'Recommendation service unavailable' },
            { status: 502 }
          );
        }
      } catch (err) {
        console.error('Error calling Cloudflare AI Recommend API:', err);
        return NextResponse.json(
          { type: 'error', message: 'Failed to get recommendations' },
          { status: 502 }
        );
      }
    }

    // Invalid action
    return NextResponse.json(
      { type: 'error', message: 'Invalid action specified' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Error in POST blog API:', error);
    return NextResponse.json(
      { type: 'error', message: 'Failed to process request. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Validate required environment variables
    const blogId = process.env.BLOGGER_BLOG_ID;
    const apiKey = process.env.GOOGLE_API_KEY;
    
    if (!blogId || !apiKey) {
      console.error('Missing required environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }
    
    console.log('Blog ID:', blogId);
    console.log('API Key exists:', !!apiKey);
    
    const apiUrl = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts`;
    const params = new URLSearchParams({
      key: apiKey,
      maxResults: '6',
      orderBy: 'published',
      fields: 'items(id,title,content,url,published,updated,labels,author,images),nextPageToken',
      fetchBodies: 'true'
    });
    
    console.log('Fetching from:', `${apiUrl}?${params.toString().replace(apiKey, '[REDACTED]')}`);
    
    const res = await fetchWithRetry(`${apiUrl}?${params}`, {
      signal: AbortSignal.timeout(5000), // 5 second timeout
      headers: {
        'Accept': 'application/json',
      }
    });
    
    const data = await res.json();
   
    if (!data.items || !Array.isArray(data.items)) {
      console.log('No items found in response:', data);
      return NextResponse.json([]);  // Return empty array instead of object
    }
    
    console.log(`Found ${data.items.length} blog posts`);
    
    const posts = data.items.map((post: any) => {
      // Extract first image from content more reliably
      const imgMatch = post.content?.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
      const contentImage = imgMatch ? imgMatch[1] : null;
      
      return {
        id: post.id,
        title: post.title,
        content: post.content,
        url: post.url,
        published: post.published,
        updated: post.updated,
        labels: post.labels || [],
        thumbnail: post.images?.[0]?.url ||
                  contentImage ||
                  '/blog-placeholder.jpg',
        author: {
          name: post.author?.displayName || 'Anonymous',
          image: post.author?.image?.url || null
        }
      };
    });
    
    // Return the posts array directly, not wrapped in an object
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error in blog API:', error);
    // Return an empty array on error to prevent client-side errors
    return NextResponse.json([]);
  }
}