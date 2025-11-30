import { Card } from '@/components/ui/card';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow, parseISO } from 'date-fns';
import BlogChatButton from './BlogChatButton'; // Client component for the AI chat
import BlogFilters from '@/app/blogs/BlogFilters'; // Client component for filters

// Define the API response type
interface BlogApiResponse {
  posts: BlogPost[];
  nextPageToken?: string | null;
}

// Define the blog post type
interface BlogPost {
  id: string;
  title: string;
  content: string;
  url: string;
  published: string;
  thumbnail: string;
  labels: string[];
}

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    const res = await fetch(`${baseUrl}/api/blog`, {
      next: { revalidate: 3600 },
      cache: 'force-cache',
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59'
      },
      signal: AbortSignal.timeout(30000), // 30 second timeout
    });
   
    if (!res.ok) throw new Error('Failed to fetch blog posts');
    
    const data = await res.json();
    
    // Check if data has a posts property that is an array
    if (data && Array.isArray(data.posts)) {
      return data.posts;
    } else if (Array.isArray(data)) {
      // Fallback for if the API returns an array directly
      return data;
    } else {
      console.error('API did not return expected format:', data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export default async function BlogsPage() {
  const blogPosts = await getBlogPosts();
  
  // Extract unique labels for filtering
  const allLabels = Array.from(
    new Set(blogPosts.flatMap(post => post.labels || []))
  ).sort();
  
  return (
    <main className="min-h-screen pt-20 pb-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4 mb-6">
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Blog Posts
            </h1>
            <BlogChatButton />
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Insights, tutorials, and stories about web development, cloud architecture, and cybersecurity.
            <br />
            <span className="text-sm text-gray-500">Use filters to find exactly what you're looking for!</span>
          </p>
        </div>
        
        {blogPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800/50 mb-4">
              <Calendar className="w-8 h-8 text-gray-600" />
            </div>
            <p className="text-gray-400 text-lg">No blog posts found. Check back soon!</p>
          </div>
        ) : (
          <>
            {/* Filters Component */}
            <BlogFilters posts={blogPosts} labels={allLabels} />
          </>
        )}
      </div>
    </main>
  );
}