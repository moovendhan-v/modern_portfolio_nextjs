"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Youtube, ThumbsUp, Eye, MessageCircle, Clock, Calendar } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const videos = [
  {
    id: "video1",
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    title: "Advanced Photoshop Tutorial: Create Marvel-Style Effects",
    description: "Learn how to create cinematic effects in Photoshop that rival Hollywood productions. Perfect for both beginners and advanced users.",
    views: "15K",
    likes: "1.2K",
    comments: 156,
    duration: "15:24",
    date: "2 weeks ago",
    category: "Tutorial"
  },
  {
    id: "video2",
    thumbnail: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&q=80",
    title: "PUBG Montage: Best Gaming Moments 2024",
    description: "Watch the most intense PUBG battles and clutch moments from my gaming sessions. Features epic sniper shots and team plays.",
    views: "8.5K",
    likes: "950",
    comments: 84,
    duration: "10:15",
    date: "1 month ago",
    category: "Gaming"
  },
  {
    id: "video3",
    thumbnail: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80",
    title: "Behind the Scenes: Professional Photo Shoot",
    description: "Take a look at how I set up and execute a professional photo shoot. Learn about lighting, composition, and client interaction.",
    views: "12K",
    likes: "1.5K",
    comments: 230,
    duration: "20:18",
    date: "3 weeks ago",
    category: "Photography"
  },
  {
    id: "video4",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    title: "Web Development Tips: Building Modern UIs",
    description: "Essential tips and tricks for building beautiful, responsive user interfaces using React and Tailwind CSS.",
    views: "10K",
    likes: "890",
    comments: 145,
    duration: "25:30",
    date: "5 days ago",
    category: "Tutorial"
  },
  {
    id: "video5",
    thumbnail: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
    title: "Creating Cinematic Video Effects",
    description: "Step-by-step guide on how to add professional cinematic effects to your videos using Adobe Premiere Pro.",
    views: "20K",
    likes: "2.3K",
    comments: 312,
    duration: "18:45",
    date: "1 week ago",
    category: "Tutorial"
  },
  {
    id: "video6",
    thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
    title: "Gaming Setup Tour 2024",
    description: "Complete walkthrough of my updated gaming and streaming setup. Featuring the latest tech and accessories.",
    views: "25K",
    likes: "3.1K",
    comments: 428,
    duration: "12:50",
    date: "4 days ago",
    category: "Gaming"
  }
];

const categories = ["All", "Tutorial", "Gaming", "Photography"];

export default function YoutubePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredVideos = videos.filter(video => 
    selectedCategory === "All" || video.category === selectedCategory
  );

  return (
    <main className="min-h-screen pt-20 pb-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">My YouTube Channel</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Gaming content, tutorials, and creative edits. Subscribe to stay updated!
          </p>
          <Button className="bg-red-600 hover:bg-red-700">
            <Youtube className="mr-2 h-4 w-4" />
            Subscribe
          </Button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === selectedCategory ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={category === selectedCategory ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <Card key={video.id} className="overflow-hidden bg-black/50 border-gray-800">
              <div className="relative">
                <div className="aspect-video relative">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-sm flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {video.duration}
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <h3 className="font-semibold line-clamp-2 mb-2">{video.title}</h3>
                  <p className="text-sm text-gray-400 line-clamp-2">{video.description}</p>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" /> {video.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" /> {video.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" /> {video.comments}
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> {video.date}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}