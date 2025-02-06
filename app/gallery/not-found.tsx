import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">Gallery Not Found</h1>
        <p className="text-gray-400">
          The gallery category you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button asChild>
          <Link href="/gallery">Return to Gallery</Link>
        </Button>
      </div>
    </div>
  );
}
