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
    X,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import type { Testimonial, Service } from '@/lib/types';
import { BlogModal } from '@/app/blogs/BlogModal';

// Map icon names to components
const ICONS = Object.freeze({
    Code: Code,
    Youtube: Youtube,
    Video: Video,
});

interface IconComponents {
    [key: string]: React.ComponentType;
}

const getIconComponent = (iconName: string): React.ComponentType<{ className?: string }> => {
    return (ICONS as IconComponents)[iconName] || Code; // Default to Code if not found
};

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

interface HomePageProps {
    testimonials: Testimonial[];
    services: Service[];
}

const AnimatedProgress = ({ value }: { value: number }) => (
    <div className="w-full h-3 bg-gray-700 rounded-lg overflow-hidden">
        <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            className="h-full bg-blue-600 rounded-lg"
        />
    </div>
);

export default function HomePage({ testimonials, services }: HomePageProps) {
    const [testimonialCarouselRef, testimonialApi] = useEmblaCarousel();
    const [servicesCarouselRef, servicesApi] = useEmblaCarousel({
        loop: true,
        dragFree: true,
    });
    const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
    const [currentServicesIndex, setCurrentServicesIndex] = useState(0);
    const [hoveredService, setHoveredService] = useState<number | null>(null);
    const [selectedTestimonial, setSelectedTestimonial] = useState<number | null>(null);
    const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
    const [progressValues, setProgressValues] = useState<Record<string, number[]>>(() => {
        return Object.fromEntries(
            Object.entries(skills).map(([key, items]) => [
                key,
                items.map(() => 0),
            ])
        );
    });

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

    useEffect(() => {
        if (!testimonialApi || !servicesApi) return;

        testimonialApi.on('select', () => {
            setCurrentTestimonialIndex(testimonialApi.selectedScrollSnap());
        });

        servicesApi.on('select', () => {
            setCurrentServicesIndex(servicesApi.selectedScrollSnap());
        });
    }, [testimonialApi, servicesApi]);

    useEffect(() => {
        // Animate progress bars on mount
        const timer = setTimeout(() => {
            setProgressValues(
                Object.fromEntries(
                    Object.entries(skills).map(([key, items]) => [
                        key,
                        items.map((skill) => skill.value),
                    ])
                )
            );
        }, 500);

        return () => clearTimeout(timer);
    }, []);

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
                            I'm <strong>Moovendhan</strong>, a passionate web engineer specializing in <strong>scalable, high-performance applications</strong>
                            <br />
                            At <a href="https://cybertechmind.com" className="text-blue-500 font-medium hover:underline" target="_blank" rel="noopener noreferrer">CyberTechMind</a>, I simplify complex tech concepts, enhance online security awareness, and share real-world solutions. My mission is to empower tech enthusiasts and innovators with <strong>practical advice and honest recommendations</strong>.
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
                            <Link href="https://www.youtube.com/@moovendhanagri" target="_blank">
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
                                    const Icon = getIconComponent(service.icon as unknown as string);
                                    console.log("Icon", service.icon);
                                    return (
                                        <div
                                            key={index}
                                            className="flex-[0_0_100%] min-w-0 md:flex-[0_0_33.33%] px-4"
                                            onMouseEnter={() => setHoveredService(index)}
                                            onMouseLeave={() => setHoveredService(null)}
                                        >
                                            <div className="relative h-[400px] group overflow-hidden rounded-2xl">
                                                <Image
                                                    src={service.image}
                                                    alt={service.title}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300" />
                                                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                                    <div className="transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                                                        <div className="flex items-center gap-3 mb-4">
                                                            <div className="p-3 bg-blue-500/20 backdrop-blur-sm rounded-lg">
                                                                <Icon className="h-6 w-6 text-blue-400" />
                                                            </div>
                                                            <h3 className="text-2xl font-bold">{service.title}</h3>
                                                        </div>
                                                        <p className="text-gray-300 transform transition-all duration-500 opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-[200px]">
                                                            {service.description}
                                                        </p>
                                                    </div>
                                                </div>
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

                    <div className="flex justify-center gap-2 mt-8">
                        {services.map((_, index) => (
                            <button
                                key={index}
                                className={`w-3 h-3 rounded-full transition-all ${index === currentServicesIndex
                                    ? 'bg-blue-500 w-6'
                                    : 'bg-gray-600 hover:bg-gray-500'
                                    }`}
                                onClick={() => servicesApi?.scrollTo(index)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section - Only show if we have testimonials */}
            {testimonials.length > 0 && (
                <section className="py-20 bg-gradient-to-b from-blue-950 to-black">
                    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                        <h2 className="text-6xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                            CLIENT TESTIMONIALS
                        </h2>
                        <p className="text-center text-gray-400 mb-16">
                            What Our Clients Say About Us
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Featured Testimonial */}
                            <div className="h-[500px]">
                                <div className="relative h-full">
                                    <div className="overflow-hidden h-full" ref={testimonialCarouselRef}>
                                        <div className="flex h-full">
                                            {testimonials.map((testimonial: Testimonial, index: number) => (
                                                <div
                                                    key={testimonial.id}
                                                    className="flex-[0_0_100%] min-w-0"
                                                >
                                                    <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full flex flex-col">
                                                        <div className="flex items-center gap-4 mb-6">
                                                            <Image
                                                                src={testimonial.image}
                                                                alt={testimonial.name}
                                                                width={80}
                                                                height={80}
                                                                className="rounded-full"
                                                            />
                                                            <div>
                                                                <h3 className="text-2xl font-semibold">
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
                                                        <p className="text-gray-400 italic flex-grow">
                                                            {testimonial.text}
                                                        </p>
                                                        <Button
                                                            onClick={() => setSelectedTestimonial(index)}
                                                            className="mt-4 bg-blue-600 hover:bg-blue-700"
                                                        >
                                                            View Full Details
                                                        </Button>
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
                            </div>

                            {/* Truncated Testimonials Grid */}
                            <div className="grid grid-cols-2 gap-4 h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                                {[...testimonials, ...testimonials].map((testimonial: Testimonial, index) => (
                                    <div
                                        key={`${testimonial.id}-${index}`}
                                        className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-black/50 transition-colors cursor-pointer"
                                        onClick={() => setSelectedTestimonial(index % testimonials.length)}
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <Image
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                width={40}
                                                height={40}
                                                className="rounded-full"
                                            />
                                            <div>
                                                <h4 className="font-medium">{testimonial.name}</h4>
                                                <div className="flex gap-1">
                                                    {[...Array(testimonial.rating)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className="w-3 h-3 fill-yellow-500 text-yellow-500"
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-400 line-clamp-3">
                                            {testimonial.text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Skills Section with Animated Progress Bars */}
            <section className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {Object.entries(skills).map(([category, items]) => (
                        <div key={category} className="space-y-6">
                            <h2 className="text-2xl font-bold capitalize">
                                {category.replace(/([A-Z])/g, ' $1').trim()}
                            </h2>
                            <div className="space-y-4">
                                {items.map((skill, index) => (
                                    <div key={skill.name} className="space-y-2">
                                        <div className="flex justify-between">
                                            <span>{skill.name}</span>
                                            <span className="text-blue-400">
                                                {progressValues[category]?.[index] || 0}%
                                            </span>
                                        </div>
                                        <div className="w-full h-3 bg-gray-700 rounded-lg overflow-hidden">
                                            <AnimatedProgress value={skill.value} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonial Modal */}
            <Dialog open={selectedTestimonial !== null} onOpenChange={() => setSelectedTestimonial(null)}>
                <DialogContent className="max-w-2xl bg-black/90 border-white/10">
                    {selectedTestimonial !== null && (
                        <div className="relative p-6">
                            <button
                                onClick={() => setSelectedTestimonial(null)}
                                className="absolute top-2 right-2 p-2 rounded-full hover:bg-white/10 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <div className="flex items-center gap-4 mb-6">
                                <Image
                                    src={testimonials[selectedTestimonial].image}
                                    alt={testimonials[selectedTestimonial].name}
                                    width={100}
                                    height={100}
                                    className="rounded-full"
                                />
                                <div>
                                    <h3 className="text-2xl font-semibold">
                                        {testimonials[selectedTestimonial].name}
                                    </h3>
                                    <div className="flex gap-1">
                                        {[...Array(testimonials[selectedTestimonial].rating)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className="w-5 h-5 fill-yellow-500 text-yellow-500"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <p className="text-gray-300 leading-relaxed">
                                    {testimonials[selectedTestimonial].text}
                                </p>
                                <div className="pt-4 border-t border-white/10">
                                    <h4 className="font-semibold mb-2">Additional Information</h4>
                                    <ul className="text-gray-400 space-y-2">
                                        <li>Duriations: {testimonials[selectedTestimonial].additionalInfo.projectDuration}</li>
                                        <li>Status: {testimonials[selectedTestimonial].additionalInfo.servicesUsed}</li>
                                        <li>Complition Date: {testimonials[selectedTestimonial].additionalInfo.completionDate}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Blog Modal Button */}
            <div className="fixed bottom-4 right-4 z-50">
                <Button
                    onClick={() => setIsBlogModalOpen(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                    <Sparkles className="h-6 w-6" />
                </Button>
            </div>

            {/* Blog Modal */}
            <BlogModal
                isOpen={isBlogModalOpen}
                onClose={() => setIsBlogModalOpen(false)}
            />
        </main>
    );
}