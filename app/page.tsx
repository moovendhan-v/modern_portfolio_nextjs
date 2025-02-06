'use client';

import { Button } from '@/components/ui/button';
import {
  Github,
  Youtube,
  Instagram,
  Linkedin,
  Code,
  Video,
  ChevronLeft,
  ChevronRight,
  Star,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';

const testimonials = [
  {
    name: 'Suresh Rajendran',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&q=80',
    rating: 5,
    text: 'I recently had the pleasure of working with Moovendhan an incredible video editor, and I am thrilled to share my positive experience. From start to finish, this editor demonstrated exceptional skill, professionalism, and dedication, delivering a final product that exceeded my expectations.',
  },
  {
    name: 'Priya Kumar',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&q=80',
    rating: 5,
    text: 'Working with Moovendhan was an absolute pleasure. His expertise in web development and attention to detail made our project a success. The website he created for us is not only beautiful but also performs exceptionally well.',
  },
  {
    name: 'Rahul Sharma',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&q=80',
    rating: 5,
    text: 'Moovendhan creative approach to problem-solving and his technical skills are outstanding. He delivered our project ahead of schedule and exceeded all our expectations. I highly recommend his services.',
  },
];

const services = [
  {
    title: 'Web Development',
    description:
      'Full-stack development with modern technologies like React, Next.js, and Node.js',
    icon: Code,
  },
  {
    title: 'Video Editing',
    description:
      'Professional video editing for YouTube, social media, and promotional content',
    icon: Video,
  },
  {
    title: 'Content Creation',
    description:
      'Engaging content creation for blogs, social media, and digital platforms',
    icon: Youtube,
  },
];

export default function Home() {
  const [testimonialCarouselRef, testimonialApi] = useEmblaCarousel();
  const [servicesCarouselRef, servicesApi] = useEmblaCarousel();
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [currentServicesIndex, setCurrentServicesIndex] = useState(0);

  const scrollPrevTestimonial = useCallback(
    () => testimonialApi?.scrollPrev(),
    [testimonialApi]
  );
  const scrollNextTestimonial = useCallback(
    () => testimonialApi?.scrollNext(),
    [testimonialApi]
  );
  const scrollPrevServices = useCallback(
    () => servicesApi?.scrollPrev(),
    [servicesApi]
  );
  const scrollNextServices = useCallback(
    () => servicesApi?.scrollNext(),
    [servicesApi]
  );

  const skills = {
    webDevelopment: [
      { name: 'HTML and CSS', value: 80 },
      { name: 'JavaScript', value: 70 },
      { name: 'PHP', value: 70 },
      { name: 'MySQL', value: 70 },
    ],
    programming: [
      { name: 'PHP', value: 70 },
      { name: 'JavaScript', value: 70 },
      { name: 'Python', value: 20 },
      { name: 'C', value: 30 },
    ],
    database: [
      { name: 'MySQL', value: 70 },
      { name: 'MongoDB', value: 10 },
      { name: 'Redis', value: 10 },
      { name: 'PostgreSQL', value: 5 },
    ],
    adobe: [
      { name: 'Photoshop', value: 70 },
      { name: 'Adobe XD', value: 40 },
      { name: 'Premiere Pro', value: 80 },
      { name: 'After Effects', value: 30 },
    ],
  };

  useEffect(() => {
    if (!testimonialApi || !servicesApi) return;

    testimonialApi.on('select', () => {
      setCurrentTestimonialIndex(testimonialApi.selectedScrollSnap());
    });

    servicesApi.on('select', () => {
      setCurrentServicesIndex(servicesApi.selectedScrollSnap());
    });
  }, [testimonialApi, servicesApi]);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold">
              Hi, I am,
              <br />
              <span className="text-blue-500">Moovendhan V,</span>
            </h1>
            <p className="text-lg text-gray-400">
              Hi, I am a professional web developer. I have been actively
              engaged in writing articles for a blog. Additionally, I possess a
              keen interest in multimedia and have dedicated the past two years
              to working on YouTube.
            </p>
            <div className="flex gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Code className="mr-2 h-4 w-4" /> Web developer
              </Button>
              <Button variant="outline">
                <Video className="mr-2 h-4 w-4" /> Video editor
              </Button>
            </div>
            <div className="flex gap-4 pt-4">
              <Link href="https://github.com/moovendhan-v" target="_blank">
                <Button variant="ghost" size="icon">
                  <Github className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://youtube.com/yourchannel" target="_blank">
                <Button variant="ghost" size="icon">
                  <Youtube className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://instagram.com/moovendhan-v" target="_blank">
                <Button variant="ghost" size="icon">
                  <Instagram className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://linkedin.com/in/moovendhan-v" target="_blank">
                <Button variant="ghost" size="icon">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="relative w-full aspect-square">
              <Image
                src="https://blogger.googleusercontent.com/img/a/AVvXsEhr_NlidocCkMrc26GYs86yIKArBF35_eEeNUUsuUZR6n05jvu8PL6jIGvyYLm1OgON1ZoT8oUkQu3BE9lkWj5dv6NnGxcSdd1FkHZS3xkiogFvY8TCEfMqGMMjkDFmzuNrLH2jW8yiMQssVU3H6Yrc1MwHafLEabPsy2_AwdwLGJL7u9D3H4Hs-MLxn7ib=s16000"
                alt="Moovendhan V"
                fill
                className="object-cover rounded-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-b from-black to-blue-950">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-6xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            OUR SERVICES
          </h2>

          <div className="relative">
            <div className="overflow-hidden" ref={servicesCarouselRef}>
              <div className="flex">
                {services.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <div
                      key={index}
                      className="flex-[0_0_100%] min-w-0 md:flex-[0_0_33.33%] px-4"
                    >
                      <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full transform transition-transform hover:scale-105">
                        <Icon className="w-12 h-12 text-blue-500 mb-6" />
                        <h3 className="text-2xl font-bold mb-4">
                          {service.title}
                        </h3>
                        <p className="text-gray-400">{service.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={scrollPrevServices}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-blue-500/20 hover:bg-blue-500/30 rounded-full p-2 backdrop-blur-sm transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={scrollNextServices}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-500/20 hover:bg-blue-500/30 rounded-full p-2 backdrop-blur-sm transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-blue-950 to-black">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-6xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            CLIENT TESTIMONIALS
          </h2>
          <p className="text-center text-gray-400 mb-16">
            What Our Clients Say About Us:
          </p>

          <div className="relative">
            <div className="overflow-hidden" ref={testimonialCarouselRef}>
              <div className="flex">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0 px-4">
                    <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
                      <div className="flex items-center gap-4 mb-6">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={64}
                          height={64}
                          className="rounded-full"
                        />
                        <div>
                          <h3 className="text-xl font-semibold">
                            {testimonial.name}
                          </h3>
                          <div className="flex gap-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 fill-yellow-500 text-yellow-500"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-400 italic">{testimonial.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={scrollPrevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-blue-500/20 hover:bg-blue-500/30 rounded-full p-2 backdrop-blur-sm transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={scrollNextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-500/20 hover:bg-blue-500/30 rounded-full p-2 backdrop-blur-sm transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentTestimonialIndex
                    ? 'bg-blue-500 w-6'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                onClick={() => testimonialApi?.scrollTo(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="space-y-6">
              <h2 className="text-2xl font-bold capitalize">
                {category.replace(/([A-Z])/g, ' $1').trim()}
              </h2>
              <div className="space-y-4">
                {items.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span>{skill.name}</span>
                      <span>{skill.value}%</span>
                    </div>
                    <Progress value={skill.value} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
