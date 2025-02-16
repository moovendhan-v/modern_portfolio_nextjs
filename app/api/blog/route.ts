import { NextResponse } from 'next/server';

async function fetchWithRetry(url: string, options: RequestInit, retries: number = 3): Promise<Response> {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error('Failed to fetch blog posts');
    return res;
  } catch (error) {
    if (retries > 0) {
      console.warn(`Retrying... (${retries} attempts left)`);
      return fetchWithRetry(url, options, retries - 1);
    } else {
      console.error('Failed to fetch blog posts after multiple attempts:', error);
      throw error;
    }
  }
}

export async function GET() {
  try {
    // Log environment variables (without exposing API key)
    console.log('Blog ID:', process.env.BLOGGER_BLOG_ID);
    console.log('API Key exists:', !!process.env.GOOGLE_API_KEY);

    const apiUrl = `https://www.googleapis.com/blogger/v3/blogs/${process.env.BLOGGER_BLOG_ID}/posts`;
    const params = new URLSearchParams({
      key: process.env.GOOGLE_API_KEY || '',
      maxResults: '6',
      orderBy: 'published',
      fields: 'items(id,title,content,url,published,updated,labels,author)',
      fetchBodies: 'true'
    });

    console.log('Fetching from:', `${apiUrl}?${params}`);

    const res = await fetchWithRetry(`${apiUrl}?${params}`, {
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });

    const data = await res.json();
    
    if (!data.items) {
      console.log('No items found in response');
      return NextResponse.json([]);
    }

    console.log(`Found ${data.items.length} blog posts`);

    const posts = data.items.map((post: any) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      url: post.url,
      published: post.published,
      updated: post.updated,
      labels: post.labels || [],
      thumbnail: post.images?.[0]?.url || 
                post.content.match(/src="([^"]*)"/)?.pop() || 
                '/blog-placeholder.jpg',
      author: {
        name: post.author?.displayName || 'Anonymous',
        image: post.author?.image?.url
      }
    }));

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error in blog API:', error);
    // Return a proper error response
    return NextResponse.json(
      { error: 'Failed to fetch blog posts', details: (error as Error).message },
      { status: 500 }
    );
  }
}