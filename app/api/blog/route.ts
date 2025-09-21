import { NextResponse } from 'next/server';

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

// GET endpoint for fetching blog data
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const blogId = url.searchParams.get('id');
    const action = url.searchParams.get('action');

    if (!process.env.CLOUDFLARE_AI_CHAT) {
      return NextResponse.json(
        { type: 'error', message: 'AI service not configured' },
        { status: 500 }
      );
    }

    // Get specific blog post
    if (blogId && action === 'blog') {
      try {
        const res = await fetch(`${process.env.CLOUDFLARE_AI_CHAT}/blog?id=${blogId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });

        if (res.ok) {
          const data = await res.json();
          console.log('Cloudflare Blog Response:', data);

          return NextResponse.json({
            type: 'blog',
            blog: data.blog,
            success: data.success
          });
        } else {
          console.error('Cloudflare Blog API failed:', res.status, res.statusText);
          return NextResponse.json(
            { type: 'error', message: 'Blog not found' },
            { status: 404 }
          );
        }
      } catch (err) {
        console.error('Error calling Cloudflare Blog API:', err);
        return NextResponse.json(
          { type: 'error', message: 'Failed to fetch blog' },
          { status: 502 }
        );
      }
    }

    // Get all blog posts
    if (action === 'blogs') {
      try {
        const res = await fetch(`${process.env.CLOUDFLARE_AI_CHAT}/blogs`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });

        if (res.ok) {
          const data = await res.json();
          console.log('Cloudflare Blogs Response:', data);

          return NextResponse.json({
            type: 'blogs',
            blogs: data.blogs,
            success: data.success
          });
        } else {
          console.error('Cloudflare Blogs API failed:', res.status, res.statusText);
          return NextResponse.json(
            { type: 'error', message: 'Failed to fetch blogs' },
            { status: 502 }
          );
        }
      } catch (err) {
        console.error('Error calling Cloudflare Blogs API:', err);
        return NextResponse.json(
          { type: 'error', message: 'Failed to fetch blogs' },
          { status: 502 }
        );
      }
    }

    // Invalid GET request
    return NextResponse.json(
      { type: 'error', message: 'Invalid GET request' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Error in GET blog API:', error);
    return NextResponse.json(
      { type: 'error', message: 'Failed to process request. Please try again.' },
      { status: 500 }
    );
  }
}