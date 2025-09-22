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