import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

const categories = [
  {
    title: 'Photoshop Edits',
    slug: 'photoshop',
    image:
      'https://blogger.googleusercontent.com/img/a/AVvXsEhr_NlidocCkMrc26GYs86yIKArBF35_eEeNUUsuUZR6n05jvu8PL6jIGvyYLm1OgON1ZoT8oUkQu3BE9lkWj5dv6NnGxcSdd1FkHZS3xkiogFvY8TCEfMqGMMjkDFmzuNrLH2jW8yiMQssVU3H6Yrc1MwHafLEabPsy2_AwdwLGJL7u9D3H4Hs-MLxn7ib=s16000',
    description: 'Creative photo manipulations and digital art',
  },
  {
    title: 'Photography',
    slug: 'photography',
    image:
      'https://blogger.googleusercontent.com/img/a/AVvXsEhr_NlidocCkMrc26GYs86yIKArBF35_eEeNUUsuUZR6n05jvu8PL6jIGvyYLm1OgON1ZoT8oUkQu3BE9lkWj5dv6NnGxcSdd1FkHZS3xkiogFvY8TCEfMqGMMjkDFmzuNrLH2jW8yiMQssVU3H6Yrc1MwHafLEabPsy2_AwdwLGJL7u9D3H4Hs-MLxn7ib=s16000',
    description: 'Portrait and lifestyle photography',
  },
  {
    title: 'Gaming',
    slug: 'gaming',
    image:
      'https://cdn.pixabay.com/photo/2023/12/13/06/40/cat-8446390_1280.jpg',
    description: 'Gaming screenshots and edits',
  },
  {
    title: 'Personal',
    slug: 'personal',
    image:
      'https://blogger.googleusercontent.com/img/a/AVvXsEhr_NlidocCkMrc26GYs86yIKArBF35_eEeNUUsuUZR6n05jvu8PL6jIGvyYLm1OgON1ZoT8oUkQu3BE9lkWj5dv6NnGxcSdd1FkHZS3xkiogFvY8TCEfMqGMMjkDFmzuNrLH2jW8yiMQssVU3H6Yrc1MwHafLEabPsy2_AwdwLGJL7u9D3H4Hs-MLxn7ib=s16000',
    description: 'Personal photos and memories',
  },
];

export default function GalleryPage() {
  return (
    <main className="min-h-screen pt-20 pb-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Gallery</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore my creative work across different categories, from photo
            edits to gaming captures
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {categories.map((category) => (
            <Link
              href={`/gallery/${category.slug}`}
              key={category.slug}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div className="aspect-[16/9] relative">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 transition-opacity group-hover:opacity-70" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h2 className="text-2xl font-bold text-white">
                    {category.title}
                  </h2>
                  <p className="text-gray-200 mt-2">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
