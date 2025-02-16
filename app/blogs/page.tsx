import { Card } from '@/components/ui/card';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow, parseISO } from 'date-fns';

async function getBlogPosts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/blog`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });
    
    if (!res.ok) throw new Error('Failed to fetch blog posts');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

export default async function BlogsPage() {
  const blogPosts = await getBlogPosts();

  return (
    <main className="min-h-screen pt-20 pb-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Blog Posts</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Insights, tutorials, and stories about web development, gaming, and
            creative editing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post: any) => (
            <Card
              key={post.id}
              className="overflow-hidden bg-black/50 border-gray-800"
            >
              <div className="aspect-[16/9] relative">
                <Image
                  src={post.thumbnail || '/blog-placeholder.jpg'}
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
      </div>
    </main>
  );
}
