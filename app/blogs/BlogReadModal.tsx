'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Calendar, Clock, ExternalLink, ChevronLeft, ChevronRight, BookOpen, Share2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  url: string;
  published: string;
  thumbnail: string;
  labels: string[];
}

interface BlogReadModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  currentIndex?: number;
  totalPosts?: number;
}

export default function BlogReadModal({
  post,
  isOpen,
  onClose,
  onNext,
  onPrevious,
  currentIndex,
  totalPosts,
}: BlogReadModalProps) {
  if (!post) return null;

  const getReadTime = (content: string) => Math.ceil(content.length / 1000);
  const cleanContent = post.content.replace(/<[^>]*>/g, '').substring(0, 800);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: cleanContent.substring(0, 200) + '...',
          url: post.url,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(post.url);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[90vh] bg-gradient-to-br from-gray-950 via-gray-900 to-black border border-white/10 p-0 gap-0 overflow-hidden [&>button]:hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative h-full w-full flex flex-col"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-sm transition-all duration-300 group"
            >
              <X className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            </button>

            {/* Navigation buttons */}
            {onPrevious && (
              <button
                onClick={onPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-sm transition-all group"
              >
                <ChevronLeft className="w-6 h-6 text-white group-hover:-translate-x-1 transition-transform" />
              </button>
            )}
            {onNext && (
              <button
                onClick={onNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-sm transition-all group"
              >
                <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
              </button>
            )}

            {/* Top - Banner Image (smaller, like YouTube banner) */}
            <div className="relative w-full h-48 flex-shrink-0">
              <Image
                src={post.thumbnail || 'https://avatars.githubusercontent.com/u/96030910?s=400&u=9e85c0b451a4d7b141357a646877f30b1cbf7e11&v=4'}
                alt={post.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Counter on image */}
              {currentIndex !== undefined && totalPosts !== undefined && (
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-sm">
                  <span className="text-xs text-white font-medium">
                    {currentIndex + 1} / {totalPosts}
                  </span>
                </div>
              )}

              {/* Icon badge on image */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="absolute bottom-4 left-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-500/30"
              >
                <BookOpen className="w-6 h-6 text-white" />
              </motion.div>
            </div>

            {/* Bottom - Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar" style={{ maxHeight: 'calc(90vh - 192px)' }}>
              <div className="p-8 space-y-6">
                {/* Title */}
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                    {post.title}
                  </h2>
                  
                  {/* Meta info and Labels */}
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDistanceToNow(parseISO(post.published), { addSuffix: true })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{getReadTime(post.content)} min read</span>
                      </div>
                    </div>
                  </div>

                  {/* Labels */}
                  <div className="flex flex-wrap gap-2">
                    {post.labels.map((label) => (
                      <Badge
                        key={label}
                        className="bg-blue-600/20 text-blue-300 border border-blue-500/30 hover:bg-blue-600/30 transition-colors"
                      >
                        {label}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Content preview */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                    Quick Preview
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-base">
                    {cleanContent}...
                  </p>
                </div>

                {/* What you'll learn section */}
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-400" />
                    What You'll Discover
                  </h3>
                  <ul className="space-y-3 text-gray-300">
                    {post.labels.slice(0, 3).map((label, index) => (
                      <motion.li
                        key={label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-blue-400" />
                        </div>
                        <span>Insights on {label} and best practices</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Stats cards */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Clock className="w-4 h-4 text-blue-400" />
                      </div>
                      <span className="text-xs text-gray-400 font-medium">Reading Time</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{getReadTime(post.content)} min</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 bg-purple-500/20 rounded-lg">
                        <BookOpen className="w-4 h-4 text-purple-400" />
                      </div>
                      <span className="text-xs text-gray-400 font-medium">Topics</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{post.labels.length}</p>
                  </motion.div>
                </div>

                {/* Footer actions */}
                <div className="sticky bottom-0 p-6 border-t border-white/10 bg-gradient-to-t from-gray-950 via-gray-900/95 to-gray-900/80 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <Link href={post.url} target="_blank" className="flex-1">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 group py-6">
                        <ExternalLink className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                        Read Full Article on Blog
                      </Button>
                    </Link>
                    <Button
                      onClick={handleShare}
                      variant="outline"
                      className="border-white/10 hover:bg-white/5 py-6"
                    >
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

// Add Sparkles icon if not imported
const Sparkles = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);
