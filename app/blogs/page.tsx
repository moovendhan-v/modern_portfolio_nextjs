import { Card } from '@/components/ui/card';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow, parseISO } from 'date-fns';
import BlogChatButton from './BlogChatButton'; // Client component for the AI chat

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
  
  return (
    <main className="min-h-screen pt-20 pb-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4 mb-6">
            <h1 className="text-4xl font-bold">Blog Posts</h1>
            <BlogChatButton />
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Insights, tutorials, and stories about web development, gaming, and
            creative editing. Use our AI assistant to discover relevant posts!
          </p>
        </div>
        
        {blogPosts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">No blog posts found. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post: BlogPost) => (
              <Card
                key={post.id}
                className="overflow-hidden bg-black/50 border-gray-800"
              >
                <div className="aspect-[16/9] relative">
                  <Image
                    src={post.thumbnail || 'https://avatars.githubusercontent.com/u/96030910?s=400&u=9e85c0b451a4d7b141357a646877f30b1cbf7e11&v=4'}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 space-y-4">
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-blue-500">
                      {post.labels?.[0] || 'General'}
                    </span>
                    <h3 className="font-semibold line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {post.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDistanceToNow(parseISO(post.published), { addSuffix: true })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {Math.ceil(post.content.length / 1000)} min read
                      </span>
                    </div>
                    <Link
                      href={post.url}
                      target="_blank"
                      className="text-blue-500 hover:text-blue-400 flex items-center gap-1"
                    >
                      Read more <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}