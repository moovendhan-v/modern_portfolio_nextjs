'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Star, GitFork } from 'lucide-react';
import Link from 'next/link';
import { projects, categories } from '@/app/data/project';

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter projects based on selected category
  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <main className="min-h-screen pt-20 pb-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">My Projects</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          A collection of my recent projects, ranging from full-stack applications to frontend designs. Each project represents different aspects of my skills and interests in web development.
        </p>
      </section>

      {/* Categories */}
      <section className="mb-12">
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === selectedCategory ? 'default' : 'outline'}
              className={category === selectedCategory ? 'bg-blue-600 hover:bg-blue-700' : ''}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project, index) => (
          <Card key={index} className="bg-black/50 border-gray-800 overflow-hidden">
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4" /> {project.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="h-4 w-4" /> {project.forks}
                    </span>
                  </div>
                </div>
                <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-sm">
                  {project.category}
                </span>
              </div>

              <p className="text-gray-400">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, techIndex) => (
                  <span key={techIndex} className="px-3 py-1 bg-white/5 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 pt-4">
                <Button asChild>
                  <Link href={project.github} target="_blank">
                    <Github className="mr-2 h-4 w-4" /> View Source
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href={project.demo} target="_blank">
                    <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </section>
    </main>
  );
}
