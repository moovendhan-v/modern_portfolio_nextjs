import { Card } from '@/components/ui/card';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const blogPosts = [
  {
    id: 'post1',
    title: '10 Advanced Photoshop Techniques Every Editor Should Know',
    excerpt:
      'Master these essential Photoshop techniques to take your editing skills to the next level...',
    image:
      'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&q=80',
    date: 'March 15, 2024',
    readTime: '8 min read',
    category: 'Tutorials',
  },
  {
    id: 'post2',
    title: 'The Evolution of Battle Royale Games: From PUBG to Present',
    excerpt:
      'Exploring how battle royale games have transformed the gaming industry...',
    image:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
    date: 'March 10, 2024',
    readTime: '6 min read',
    category: 'Gaming',
  },
  {
    id: 'post2',
    title: 'The Evolution of Battle Royale Games: From PUBG to Present',
    excerpt:
      'Exploring how battle royale games have transformed the gaming industry...',
    image:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
    date: 'March 10, 2024',
    readTime: '6 min read',
    category: 'Gaming',
  },
  {
    id: 'post2',
    title: 'The Evolution of Battle Royale Games: From PUBG to Present',
    excerpt:
      'Exploring how battle royale games have transformed the gaming industry...',
    image:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
    date: 'March 10, 2024',
    readTime: '6 min read',
    category: 'Gaming',
  },
  {
    id: 'post2',
    title: 'The Evolution of Battle Royale Games: From PUBG to Present',
    excerpt:
      'Exploring how battle royale games have transformed the gaming industry...',
    image:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
    date: 'March 10, 2024',
    readTime: '6 min read',
    category: 'Gaming',
  },
  {
    id: 'post2',
    title: 'The Evolution of Battle Royale Games: From PUBG to Present',
    excerpt:
      'Exploring how battle royale games have transformed the gaming industry...',
    image:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
    date: 'March 10, 2024',
    readTime: '6 min read',
    category: 'Gaming',
  },
];

export default function BlogsPage() {
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
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden bg-black/50 border-gray-800"
            >
              <div className="aspect-[16/9] relative">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <span className="text-sm font-medium text-blue-500">
                    {post.category}
                  </span>
                  <h3 className="font-semibold line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" /> {post.readTime}
                    </span>
                  </div>
                  <Link
                    href={`/blogs/${post.id}`}
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
