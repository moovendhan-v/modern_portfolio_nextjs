'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight, Search, Filter, X, SortAsc, SortDesc, Grid3x3, List, BookOpen, Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import BlogReadModal from './BlogReadModal';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  url: string;
  published: string;
  thumbnail: string;
  labels: string[];
}

interface BlogFiltersProps {
  posts: BlogPost[];
  labels: string[];
}

type SortOption = 'newest' | 'oldest' | 'shortest' | 'longest';
type ViewMode = 'grid' | 'list';

export default function BlogFilters({ posts, labels }: BlogFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedPostIndex, setSelectedPostIndex] = useState<number>(0);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.labels.some(label => label.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Label filter
    if (selectedLabels.length > 0) {
      filtered = filtered.filter(post =>
        selectedLabels.some(label => post.labels.includes(label))
      );
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.published).getTime() - new Date(a.published).getTime();
        case 'oldest':
          return new Date(a.published).getTime() - new Date(b.published).getTime();
        case 'shortest':
          return a.content.length - b.content.length;
        case 'longest':
          return b.content.length - a.content.length;
        default:
          return 0;
      }
    });

    return sorted;
  }, [posts, searchQuery, selectedLabels, sortBy]);

  const toggleLabel = (label: string) => {
    setSelectedLabels(prev =>
      prev.includes(label)
        ? prev.filter(l => l !== label)
        : [...prev, label]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedLabels([]);
    setSortBy('newest');
  };

  const getReadTime = (content: string) => Math.ceil(content.length / 1000);

  const handleOpenPost = (post: BlogPost, index: number) => {
    setSelectedPost(post);
    setSelectedPostIndex(index);
  };

  const handleNextPost = () => {
    if (selectedPostIndex < filteredPosts.length - 1) {
      const nextIndex = selectedPostIndex + 1;
      setSelectedPost(filteredPosts[nextIndex]);
      setSelectedPostIndex(nextIndex);
    }
  };

  const handlePreviousPost = () => {
    if (selectedPostIndex > 0) {
      const prevIndex = selectedPostIndex - 1;
      setSelectedPost(filteredPosts[prevIndex]);
      setSelectedPostIndex(prevIndex);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <Input
            type="text"
            placeholder="Search posts by title, content, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-4 py-6 bg-gray-900/50 border-gray-800 focus:border-blue-500 rounded-xl text-white placeholder:text-gray-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-800 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          )}
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className={`border-gray-800 hover:bg-gray-900 ${showFilters ? 'bg-gray-900' : ''}`}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {selectedLabels.length > 0 && (
              <Badge className="ml-2 bg-blue-600">{selectedLabels.length}</Badge>
            )}
          </Button>

          {/* View Mode Toggle */}
          <div className="flex border border-gray-800 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-900 text-gray-400 hover:text-white'}`}
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-900 text-gray-400 hover:text-white'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <Card className="bg-gray-900/50 border-gray-800 p-6 space-y-6">
              {/* Sort Options */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
                  <SortAsc className="w-4 h-4" />
                  Sort By
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'newest', label: 'Newest First', icon: SortDesc },
                    { value: 'oldest', label: 'Oldest First', icon: SortAsc },
                    { value: 'shortest', label: 'Quick Reads', icon: Clock },
                    { value: 'longest', label: 'Long Reads', icon: BookOpen },
                  ].map((option) => (
                    <Button
                      key={option.value}
                      onClick={() => setSortBy(option.value as SortOption)}
                      variant={sortBy === option.value ? 'default' : 'outline'}
                      size="sm"
                      className={sortBy === option.value ? 'bg-blue-600 hover:bg-blue-700' : 'border-gray-800 hover:bg-gray-800'}
                    >
                      <option.icon className="w-4 h-4 mr-2" />
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Label Filters */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter by Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {labels.map((label) => (
                    <Badge
                      key={label}
                      onClick={() => toggleLabel(label)}
                      className={`cursor-pointer transition-all ${
                        selectedLabels.includes(label)
                          ? 'bg-blue-600 hover:bg-blue-700'
                          : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                      }`}
                    >
                      {label}
                      {selectedLabels.includes(label) && (
                        <X className="w-3 h-3 ml-1" />
                      )}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {(searchQuery || selectedLabels.length > 0 || sortBy !== 'newest') && (
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  size="sm"
                  className="border-gray-800 hover:bg-gray-800"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear All Filters
                </Button>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-gray-400">
        <span>
          Showing <span className="text-white font-semibold">{filteredPosts.length}</span> of{' '}
          <span className="text-white font-semibold">{posts.length}</span> posts
        </span>
        {(searchQuery || selectedLabels.length > 0) && (
          <span className="text-blue-400">Filters active</span>
        )}
      </div>

      {/* Posts Grid/List */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800/50 mb-4">
            <Search className="w-8 h-8 text-gray-600" />
          </div>
          <p className="text-gray-400 text-lg mb-2">No posts found</p>
          <p className="text-gray-500 text-sm">Try adjusting your filters or search query</p>
        </div>
      ) : (
        <motion.div
          layout
          className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}
        >
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                {viewMode === 'grid' ? (
                  <Card
                    onClick={() => handleOpenPost(post, filteredPosts.indexOf(post))}
                    className="overflow-hidden bg-gradient-to-br from-gray-900/90 to-gray-900/50 border-gray-800 hover:border-blue-500/50 transition-all duration-300 group h-full flex flex-col cursor-pointer"
                  >
                    <div className="aspect-[16/9] relative overflow-hidden">
                      <Image
                        src={post.thumbnail || 'https://avatars.githubusercontent.com/u/96030910?s=400&u=9e85c0b451a4d7b141357a646877f30b1cbf7e11&v=4'}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-blue-600/90 backdrop-blur-sm">
                          {post.labels?.[0] || 'General'}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-5 space-y-4 flex-1 flex flex-col">
                      <div className="space-y-2 flex-1">
                        <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-blue-400 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed">
                          {post.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                        </p>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-800">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDistanceToNow(parseISO(post.published), { addSuffix: true })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {getReadTime(post.content)} min
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenPost(post, filteredPosts.indexOf(post));
                          }}
                          className="text-blue-500 hover:text-blue-400 flex items-center gap-1 font-medium"
                        >
                          <Eye className="h-3 w-3" />
                          Quick Read
                        </button>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <Card
                    onClick={() => handleOpenPost(post, filteredPosts.indexOf(post))}
                    className="overflow-hidden bg-gradient-to-r from-gray-900/90 to-gray-900/50 border-gray-800 hover:border-blue-500/50 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex gap-4 p-4">
                      <div className="w-48 h-32 relative flex-shrink-0 rounded-lg overflow-hidden">
                        <Image
                          src={post.thumbnail || 'https://avatars.githubusercontent.com/u/96030910?s=400&u=9e85c0b451a4d7b141357a646877f30b1cbf7e11&v=4'}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-blue-600/90">
                                {post.labels?.[0] || 'General'}
                              </Badge>
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {getReadTime(post.content)} min read
                              </span>
                            </div>
                            <h3 className="font-semibold text-xl line-clamp-1 group-hover:text-blue-400 transition-colors">
                              {post.title}
                            </h3>
                            <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
                              {post.content.replace(/<[^>]*>/g, '').substring(0, 200)}...
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenPost(post, filteredPosts.indexOf(post));
                            }}
                            className="flex-shrink-0"
                          >
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              <Eye className="h-4 w-4 mr-1" />
                              Quick Read
                            </Button>
                          </button>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDistanceToNow(parseISO(post.published), { addSuffix: true })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Blog Read Modal */}
      <BlogReadModal
        post={selectedPost}
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        onNext={selectedPostIndex < filteredPosts.length - 1 ? handleNextPost : undefined}
        onPrevious={selectedPostIndex > 0 ? handlePreviousPost : undefined}
        currentIndex={selectedPostIndex}
        totalPosts={filteredPosts.length}
      />
    </div>
  );
}
