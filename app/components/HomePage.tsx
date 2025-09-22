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
    Database,
    Palette,
    Cpu,
    Globe,
    FileCode,
    Server,
    Monitor,
    Layers,
    Zap,
    Camera,
    Film,
    Wand2,
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
    webDevelopment: {
        title: 'Web Development',
        icon: Globe,
        color: 'from-blue-500 to-cyan-500',
        skills: [
            { name: 'HTML & CSS', value: 90, icon: FileCode },
            { name: 'JavaScript', value: 85, icon: Zap },
            { name: 'React/Next.js', value: 80, icon: Code },
            { name: 'Node.js', value: 75, icon: Server },
        ]
    },
    programming: {
        title: 'Programming',
        icon: Cpu,
        color: 'from-green-500 to-emerald-500',
        skills: [
            { name: 'PHP', value: 80, icon: Code },
            { name: 'Python', value: 60, icon: Cpu },
            { name: 'C/C++', value: 70, icon: Monitor },
            { name: 'TypeScript', value: 75, icon: FileCode },
        ]
    },
    database: {
        title: 'Database',
        icon: Database,
        color: 'from-purple-500 to-pink-500',
        skills: [
            { name: 'MySQL', value: 85, icon: Database },
            { name: 'MongoDB', value: 70, icon: Database },
            { name: 'PostgreSQL', value: 75, icon: Database },
            { name: 'Redis', value: 65, icon: Server },
        ]
    },
    design: {
        title: 'Design & Media',
        icon: Palette,
        color: 'from-orange-500 to-red-500',
        skills: [
            { name: 'Photoshop', value: 85, icon: Palette },
            { name: 'Premiere Pro', value: 80, icon: Film },
            { name: 'After Effects', value: 75, icon: Wand2 },
            { name: 'Figma/XD', value: 70, icon: Layers },
        ]
    },
};

interface HomePageProps {
    testimonials: Testimonial[];
    services: Service[];
}


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
            Object.entries(skills).map(([key, category]) => [
                key,
                category.skills.map(() => 0),
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
                    Object.entries(skills).map(([key, category]) => [
                        key,
                        category.skills.map((skill) => skill.value),
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
                                <Code className="mr-2 h-4 w-4" /> Software Engineer
                            </Button>
                            <Button variant="outline">
                                <Video className="mr-2 h-4 w-4" /> Content Creator
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
                        Expertise In
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
                            What People Say About Us
                        </h2>
                        <p className="text-center text-gray-400 mb-16">
                            Trusted by clients worldwide, here’s what they have to say.
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

            {/* Skills Section - MacBook Style */}
            <section className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                        Technical Skills
                    </h2>
                    <p className="text-gray-400 text-lg">
                        A comprehensive overview of my technical expertise and proficiency levels
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {Object.entries(skills).map(([categoryKey, category], categoryIndex) => {
                        const CategoryIcon = category.icon;
                        return (
                            <motion.div
                                key={categoryKey}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-gray-600/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
                                    {/* Category Header */}
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className={`p-4 rounded-xl bg-gradient-to-r ${category.color} shadow-lg`}>
                                            <CategoryIcon className="h-8 w-8 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                                            <p className="text-gray-400 text-sm">Professional proficiency levels</p>
                                        </div>
                                    </div>

                                    {/* Skills Grid */}
                                    <div className="space-y-6">
                                        {category.skills.map((skill, skillIndex) => {
                                            const SkillIcon = skill.icon;
                                            return (
                                                <motion.div
                                                    key={skill.name}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.5, delay: (categoryIndex * 0.2) + (skillIndex * 0.1) }}
                                                    viewport={{ once: true }}
                                                    className="group/skill"
                                                >
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="flex items-center gap-3">
                                                            <div className="p-2 bg-gray-800/50 rounded-lg group-hover/skill:bg-gray-700/50 transition-colors">
                                                                <SkillIcon className="h-4 w-4 text-gray-400 group-hover/skill:text-white transition-colors" />
                                                            </div>
                                                            <span className="font-medium text-gray-200 group-hover/skill:text-white transition-colors">
                                                                {skill.name}
                                                            </span>
                                                        </div>
                                                        <span className="text-sm font-semibold text-blue-400">
                                                            {progressValues[categoryKey]?.[skillIndex] || 0}%
                                                        </span>
                                                    </div>

                                                    {/* Progress Bar */}
                                                    <div className="relative">
                                                        <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                whileInView={{ width: `${skill.value}%` }}
                                                                transition={{
                                                                    duration: 2,
                                                                    delay: (categoryIndex * 0.2) + (skillIndex * 0.1) + 0.3,
                                                                    ease: 'easeInOut'
                                                                }}
                                                                viewport={{ once: true }}
                                                                className={`h-full bg-gradient-to-r ${category.color} rounded-full shadow-sm`}
                                                            />
                                                        </div>
                                                        {/* Glow effect */}
                                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300" />
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>

                                    {/* Category Stats */}
                                    <div className="mt-8 pt-6 border-t border-gray-700/30">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-400">Average Proficiency</span>
                                            <span className="font-semibold text-white">
                                                {Math.round(category.skills.reduce((acc, skill) => acc + skill.value, 0) / category.skills.length)}%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* MacBook-style Footer */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex items-center gap-4 bg-gradient-to-r from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-full px-8 py-4">
                        <div className="flex -space-x-2">
                            {Object.values(skills).slice(0, 4).map((category, index) => {
                                const Icon = category.icon;
                                return (
                                    <div
                                        key={index}
                                        className={`p-2 rounded-full bg-gradient-to-r ${category.color} shadow-lg`}
                                    >
                                        <Icon className="h-4 w-4 text-white" />
                                    </div>
                                );
                            })}
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-medium text-white">Always Learning</p>
                            <p className="text-xs text-gray-400">Continuous skill development</p>
                        </div>
                    </div>
                </motion.div>
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