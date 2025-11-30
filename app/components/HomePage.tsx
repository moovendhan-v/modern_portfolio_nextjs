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
    Cloud,
    HardDrive,
    Workflow,
    Box,
    Sparkles,
    Clock,
    Calendar,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import type { Testimonial, Service } from '@/lib/types';
import { BlogModal } from '@/app/blogs/BlogModal';
import SkillsSection from './Skills';
import ServiceModal from './ServiceModal';

const ICONS = Object.freeze({
    Code: Code,
    Youtube: Youtube,
    Video: Video,
    Globe: Globe,
    Database: Database,
    Cpu: Cpu,
    Palette: Palette,
    Server: Server,
    Monitor: Monitor,
    Layers: Layers,
    Zap: Zap,
    Camera: Camera,
    Film: Film,
    Wand2: Wand2,
    Cloud: Cloud,
    HardDrive: HardDrive,
    Workflow: Workflow,
    Github: Github,
    FileCode: FileCode,
    Box: Box,
});

interface IconComponents {
    [key: string]: React.ComponentType;
}

const getIconComponent = (iconName: string, serviceTitle?: string): React.ComponentType<{ className?: string }> => {
    if (iconName && (ICONS as IconComponents)[iconName]) {
        return (ICONS as IconComponents)[iconName];
    }
    if (iconName) {
        const lowerIconName = iconName.toLowerCase();
        for (const [key, component] of Object.entries(ICONS)) {
            if (key.toLowerCase() === lowerIconName) {
                return component;
            }
        }
    }
    if (serviceTitle) {
        const lowerTitle = serviceTitle.toLowerCase();
        if (lowerTitle.includes('security') || lowerTitle.includes('🔐')) return Database;
        if (lowerTitle.includes('cloud') || lowerTitle.includes('☁️') || lowerTitle.includes('aws')) return Cloud;
        if (lowerTitle.includes('full-stack') || lowerTitle.includes('⚡') || lowerTitle.includes('development')) return Code;
        if (lowerTitle.includes('web')) return Globe;
        if (lowerTitle.includes('mobile')) return Monitor;
        if (lowerTitle.includes('database') || lowerTitle.includes('data')) return Database;
        if (lowerTitle.includes('design') || lowerTitle.includes('ui') || lowerTitle.includes('ux')) return Palette;
        if (lowerTitle.includes('video') || lowerTitle.includes('content')) return Video;
        if (lowerTitle.includes('consulting')) return Code;
    }
    return Code;
};

interface HomePageProps {
    testimonials: Testimonial[];
    services: Service[];
}

export default function HomePage({ testimonials, services }: HomePageProps) {
    const [testimonialCarouselRef, testimonialApi] = useEmblaCarousel();
    const [servicesCarouselRef, servicesApi] = useEmblaCarousel({ loop: true, dragFree: true });
    const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
    const [currentServicesIndex, setCurrentServicesIndex] = useState(0);
    const [hoveredService, setHoveredService] = useState<number | null>(null);
    const [selectedTestimonial, setSelectedTestimonial] = useState<number | null>(null);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
    const [visibleSkills, setVisibleSkills] = useState<number>(0);
    const [visibleTestimonials, setVisibleTestimonials] = useState<number>(6);
    const [isMusicPlayerOpen, setIsMusicPlayerOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);
    const [position, setPosition] = useState({ x: 20, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    const scrollPrevTestimonial = useCallback(() => testimonialApi?.scrollPrev(), [testimonialApi]);
    const scrollNextTestimonial = useCallback(() => testimonialApi?.scrollNext(), [testimonialApi]);
    const scrollPrevServices = useCallback(() => servicesApi?.scrollPrev(), [servicesApi]);
    const scrollNextServices = useCallback(() => servicesApi?.scrollNext(), [servicesApi]);

    useEffect(() => {
        if (!testimonialApi || !servicesApi) return;
        testimonialApi.on('select', () => setCurrentTestimonialIndex(testimonialApi.selectedScrollSnap()));
        servicesApi.on('select', () => setCurrentServicesIndex(servicesApi.selectedScrollSnap()));
    }, [testimonialApi, servicesApi]);

    // Set initial position for music player (bottom-left)
    useEffect(() => {
        setPosition({ x: 20, y: window.innerHeight - 150 });
    }, []);

    useEffect(() => {
        const audio = new Audio();
        // No need for crossOrigin with local files
        
        // If file is in: public/be333d4c-f4f2-4245-a9ee-5d6ff1f083b3.mp3
        audio.src = '/cybertechmind.mp3';
        
        // If file is in: public/audio/be333d4c-f4f2-4245-a9ee-5d6ff1f083b3.mp3
        // audio.src = '/audio/be333d4c-f4f2-4245-a9ee-5d6ff1f083b3.mp3';
        
        audio.preload = 'auto';
        setAudioRef(audio);
        
        audio.addEventListener('loadedmetadata', () => {
            setDuration(audio.duration);
        });
        
        audio.addEventListener('canplaythrough', () => {
            console.log('Audio is ready to play');
        });
        
        audio.addEventListener('timeupdate', () => {
            setCurrentTime(audio.currentTime);
        });
        
        audio.addEventListener('ended', () => {
            setIsPlaying(false);
        });

        audio.addEventListener('error', (e) => {
            console.error('Audio loading error:', e);
            console.error('Audio error code:', audio.error?.code);
            console.error('Audio error message:', audio.error?.message);
        });

        return () => {
            audio.pause();
            audio.src = '';
        };
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMusicPlayerOpen(true);
            if (audioRef) {
                // Try autoplay with proper error handling
                const playPromise = audioRef.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            setIsPlaying(true);
                            console.log('Autoplay started successfully');
                        })
                        .catch(error => {
                            console.warn('Autoplay was prevented:', error);
                            // Autoplay blocked - user needs to click play
                            setIsPlaying(false);
                        });
                }
            }
        }, 5000);
        return () => clearTimeout(timer);
    }, [audioRef]);

    const togglePlayPause = () => {
        if (audioRef) {
            if (isPlaying) {
                audioRef.pause();
                setIsPlaying(false);
            } else {
                audioRef.play().catch(error => {
                    console.error('Playback failed:', error);
                    setIsPlaying(false);
                });
                setIsPlaying(true);
            }
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = parseFloat(e.target.value);
        if (audioRef) {
            audioRef.currentTime = time;
            setCurrentTime(time);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - dragOffset.x,
                y: e.clientY - dragOffset.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragOffset]);

    // Update position on window resize to keep it in bottom-left
    useEffect(() => {
        const handleResize = () => {
            if (!isDragging) {
                setPosition(prev => ({
                    x: Math.min(prev.x, window.innerWidth - 280),
                    y: Math.min(prev.y, window.innerHeight - 150)
                }));
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isDragging]);

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
                            I'm <strong>Moovendhan</strong>, a passionate web engineer with a strong focus on
                            <strong> Cybersecurity, AWS Cloud Development, and building scalable, high-performance applications</strong>.
                            <br />
                            At <a href="https://cybertechmind.com" className="text-blue-500 font-medium hover:underline" target="_blank" rel="noopener noreferrer">
                                CyberTechMind
                            </a>, I explore secure cloud architectures, simplify complex tech concepts, and share real-world solutions to enhance
                            <strong> online security, cloud best practices, and practical development insights</strong>.
                            My mission is to empower tech enthusiasts and innovators with
                            <strong> actionable guidance and honest recommendations</strong>.
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
                                src="/images/profile-pic.jpg"
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
                                    return (
                                        <div
                                            key={index}
                                            className="flex-[0_0_100%] min-w-0 md:flex-[0_0_33.33%] px-4"
                                            onMouseEnter={() => setHoveredService(index)}
                                            onMouseLeave={() => setHoveredService(null)}
                                            onClick={() => setSelectedService(service)}
                                        >
                                            <div className="relative h-[400px] group overflow-hidden rounded-2xl transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-blue-500/20 group-hover:ring-2 group-hover:ring-blue-500/30 cursor-pointer">
                                                <Image
                                                    src={service.image}
                                                    alt={service.title}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-all duration-300 group-hover:from-black/60 group-hover:via-black/30" />
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
                        <button onClick={scrollPrevServices} className="absolute left-4 top-1/2 -translate-y-1/2 bg-blue-500/20 hover:bg-blue-500/30 rounded-full p-2 backdrop-blur-sm transition-all">
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button onClick={scrollNextServices} className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-500/20 hover:bg-blue-500/30 rounded-full p-2 backdrop-blur-sm transition-all">
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="flex justify-center gap-2 mt-8">
                        {services.map((_, index) => (
                            <button
                                key={index}
                                className={`w-3 h-3 rounded-full transition-all ${index === currentServicesIndex ? 'bg-blue-500 w-6' : 'bg-gray-600 hover:bg-gray-500'}`}
                                onClick={() => servicesApi?.scrollTo(index)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section - Bento Grid Style */}
            {testimonials.length > 0 && (
                <section className="py-20 bg-gradient-to-b from-blue-950 to-black relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 mb-4">
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                <span className="text-sm text-gray-300 font-medium">Testimonials</span>
                            </div>
                            <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                                Client Success Stories
                            </h2>
                            <p className="text-gray-400 max-w-2xl mx-auto">
                                Real feedback from real clients who trusted us with their projects
                            </p>
                        </motion.div>

                        {/* Bento Grid Layout */}
                        <div className="relative">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
                                {testimonials.slice(0, visibleTestimonials).map((testimonial: Testimonial, index: number) => {
                                    // Create varied card sizes for bento grid effect
                                    const isLarge = index % 5 === 0;
                                    const isMedium = index % 3 === 0 && !isLarge;
                                
                                return (
                                    <motion.div
                                        key={testimonial.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1, duration: 0.5 }}
                                        viewport={{ once: true }}
                                        whileHover={{ y: -8, scale: 1.02 }}
                                        className={`
                                            group relative bg-gradient-to-br from-gray-900/90 to-gray-900/50 backdrop-blur-xl 
                                            border border-white/10 rounded-3xl p-6 cursor-pointer overflow-hidden
                                            hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500
                                            ${isLarge ? 'md:col-span-2 md:row-span-2' : isMedium ? 'md:col-span-2' : ''}
                                        `}
                                        onClick={() => setSelectedTestimonial(index)}
                                    >
                                        {/* Animated gradient background */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-700" />
                                        
                                        {/* Quote decoration */}
                                        <div className="absolute top-4 right-4 text-blue-500/5 group-hover:text-blue-500/10 transition-colors">
                                            <svg className={`${isLarge ? 'w-24 h-24' : 'w-16 h-16'}`} fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                                            </svg>
                                        </div>

                                        <div className="relative z-10 flex flex-col h-full">
                                            {/* Header */}
                                            <div className="flex items-start gap-4 mb-4">
                                                <div className="relative flex-shrink-0">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                                                    <Image
                                                        src={testimonial.image}
                                                        alt={testimonial.name}
                                                        width={isLarge ? 64 : 48}
                                                        height={isLarge ? 64 : 48}
                                                        className="rounded-full relative z-10 ring-2 ring-white/20"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className={`font-bold text-white mb-1 group-hover:text-blue-400 transition-colors ${isLarge ? 'text-xl' : 'text-lg'}`}>
                                                        {testimonial.name}
                                                    </h3>
                                                    <div className="flex gap-1 mb-1">
                                                        {[...Array(testimonial.rating)].map((_, i) => (
                                                            <Star key={i} className={`fill-yellow-500 text-yellow-500 ${isLarge ? 'w-4 h-4' : 'w-3 h-3'}`} />
                                                        ))}
                                                    </div>
                                                    <p className="text-xs text-gray-500">Verified Client</p>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <p className={`text-gray-300 leading-relaxed flex-grow ${isLarge ? 'text-base line-clamp-6' : 'text-sm line-clamp-4'}`}>
                                                "{testimonial.text}"
                                            </p>

                                            {/* Footer */}
                                            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                                                <span className="text-xs text-gray-500">
                                                    {testimonial.additionalInfo?.completionDate || 'Recent'}
                                                </span>
                                                <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </div>

                                        {/* Hover shine effect */}
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                        </div>
                                    </motion.div>
                                );
                                })}
                            </div>
                            
                            {/* Scroll indicator */}
                            {visibleTestimonials >= 6 && (
                                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none flex items-end justify-center pb-4">
                                    <motion.div
                                        animate={{ y: [0, 8, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        className="text-gray-500 text-sm flex items-center gap-2"
                                    >
                                        <span>Scroll for more</span>
                                        <ChevronRight className="w-4 h-4 rotate-90" />
                                    </motion.div>
                                </div>
                            )}
                        </div>

                        {/* Load More / View All Button */}
                        {visibleTestimonials < testimonials.length && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                viewport={{ once: true }}
                                className="text-center mt-12"
                            >
                                <Button
                                    onClick={() => {
                                        setVisibleTestimonials(prev => Math.min(prev + 6, testimonials.length));
                                    }}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-6 text-lg rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 group relative overflow-hidden"
                                >
                                    {/* Animated background */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                    <span className="relative z-10">Load More ({testimonials.length - visibleTestimonials} remaining)</span>
                                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform inline-block relative z-10" />
                                </Button>
                            </motion.div>
                        )}
                        
                        {/* Show Less Button when all are visible */}
                        {visibleTestimonials >= testimonials.length && testimonials.length > 6 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-center mt-12"
                            >
                                <Button
                                    onClick={() => {
                                        setVisibleTestimonials(6);
                                        // Smooth scroll to testimonials section
                                        document.querySelector('section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    }}
                                    variant="outline"
                                    className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 px-8 py-6 text-lg rounded-2xl transition-all duration-300 group"
                                >
                                    <ChevronLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform inline-block" />
                                    <span>Show Less</span>
                                </Button>
                            </motion.div>
                        )}
                    </div>
                </section>
            )}

            <SkillsSection />

            {/* Testimonial Modal */}
            <Dialog open={selectedTestimonial !== null} onOpenChange={() => setSelectedTestimonial(null)}>
                <DialogContent className="max-w-3xl bg-gradient-to-br from-gray-950 via-gray-900 to-black border border-white/10 p-0 overflow-hidden">
                    {selectedTestimonial !== null && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="relative"
                        >
                            {/* Animated background gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
                            <motion.div
                                animate={{
                                    opacity: [0.3, 0.5, 0.3],
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
                            />

                            {/* Close button */}
                            <button
                                onClick={() => setSelectedTestimonial(null)}
                                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 group"
                            >
                                <X className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                            </button>

                            <div className="relative z-10 p-8">
                                {/* Header with profile */}
                                <div className="flex items-start gap-6 mb-8">
                                    <div className="relative flex-shrink-0">
                                        {/* Animated ring */}
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-lg opacity-50"
                                        />
                                        <div className="relative">
                                            <Image
                                                src={testimonials[selectedTestimonial].image}
                                                alt={testimonials[selectedTestimonial].name}
                                                width={100}
                                                height={100}
                                                className="rounded-full ring-4 ring-white/10 relative z-10"
                                            />
                                            {/* Verified badge */}
                                            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-2 ring-4 ring-gray-900">
                                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-3xl font-bold text-white mb-2">
                                            {testimonials[selectedTestimonial].name}
                                        </h3>
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="flex gap-1">
                                                {[...Array(testimonials[selectedTestimonial].rating)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ scale: 0, rotate: -180 }}
                                                        animate={{ scale: 1, rotate: 0 }}
                                                        transition={{ delay: i * 0.1, type: "spring" }}
                                                    >
                                                        <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                                                    </motion.div>
                                                ))}
                                            </div>
                                            <span className="text-yellow-500 font-semibold">
                                                {testimonials[selectedTestimonial].rating}.0
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                            <div className="flex items-center gap-1">
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                                <span>Verified Client</span>
                                            </div>
                                            <span>•</span>
                                            <span>{testimonials[selectedTestimonial].additionalInfo?.completionDate || 'Recent'}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Quote decoration */}
                                <div className="relative mb-6">
                                    <div className="absolute -left-2 -top-2 text-blue-500/20">
                                        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-200 text-lg leading-relaxed pl-10 italic">
                                        {testimonials[selectedTestimonial].text}
                                    </p>
                                </div>

                                {/* Additional Information Cards */}
                                <div className="grid grid-cols-3 gap-4 mt-8">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-4"
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="p-2 bg-blue-500/20 rounded-lg">
                                                <Clock className="w-4 h-4 text-blue-400" />
                                            </div>
                                            <span className="text-xs text-gray-400 font-medium">Duration</span>
                                        </div>
                                        <p className="text-white font-semibold">
                                            {testimonials[selectedTestimonial].additionalInfo?.projectDuration || 'N/A'}
                                        </p>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-4"
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="p-2 bg-purple-500/20 rounded-lg">
                                                <Code className="w-4 h-4 text-purple-400" />
                                            </div>
                                            <span className="text-xs text-gray-400 font-medium">Services</span>
                                        </div>
                                        <p className="text-white font-semibold text-sm">
                                            {testimonials[selectedTestimonial].additionalInfo?.servicesUsed || 'N/A'}
                                        </p>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="bg-gradient-to-br from-pink-500/10 to-pink-500/5 backdrop-blur-sm border border-pink-500/20 rounded-2xl p-4"
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="p-2 bg-pink-500/20 rounded-lg">
                                                <Calendar className="w-4 h-4 text-pink-400" />
                                            </div>
                                            <span className="text-xs text-gray-400 font-medium">Completed</span>
                                        </div>
                                        <p className="text-white font-semibold">
                                            {testimonials[selectedTestimonial].additionalInfo?.completionDate || 'N/A'}
                                        </p>
                                    </motion.div>
                                </div>

                                {/* Navigation buttons */}
                                <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                                    <Button
                                        onClick={() => {
                                            const prevIndex = selectedTestimonial > 0 ? selectedTestimonial - 1 : testimonials.length - 1;
                                            setSelectedTestimonial(prevIndex);
                                        }}
                                        variant="outline"
                                        className="border-white/10 hover:bg-white/5 text-gray-300 hover:text-white transition-all group"
                                    >
                                        <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                                        Previous
                                    </Button>

                                    <span className="text-sm text-gray-500">
                                        {selectedTestimonial + 1} of {testimonials.length}
                                    </span>

                                    <Button
                                        onClick={() => {
                                            const nextIndex = selectedTestimonial < testimonials.length - 1 ? selectedTestimonial + 1 : 0;
                                            setSelectedTestimonial(nextIndex);
                                        }}
                                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all group"
                                    >
                                        Next
                                        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Blog Modal Button */}
            <div className="fixed bottom-4 right-4 z-50">
                <Button onClick={() => setIsBlogModalOpen(true)} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-200">
                    <Sparkles className="h-6 w-6" />
                </Button>
            </div>

            {/* Compact Draggable Music Player */}
            {isMusicPlayerOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", duration: 0.4 }}
                    style={{
                        position: 'fixed',
                        left: position.x,
                        top: position.y,
                        cursor: isDragging ? 'grabbing' : 'grab'
                    }}
                    className="z-50"
                >
                    <div 
                        className="bg-gradient-to-r from-slate-900/95 to-black/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 p-3 w-64"
                        onMouseDown={handleMouseDown}
                    >
                        <div className="flex items-center gap-3">
                            {/* Album Art Thumbnail */}
                            <motion.div
                                animate={{ rotate: isPlaying ? 360 : 0 }}
                                transition={{ duration: 10, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
                                className="w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex-shrink-0"
                            >
                                <div className="w-full h-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
                                    <Film className="w-6 h-6 text-white/80" />
                                </div>
                            </motion.div>

                            {/* Song Info & Controls */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-xs font-semibold text-white truncate">My Track</h4>
                                        <p className="text-[10px] text-gray-400 truncate">Moovendhan V</p>
                                    </div>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsMusicPlayerOpen(false);
                                        }} 
                                        className="p-1 rounded-full hover:bg-white/10 transition-colors flex-shrink-0 ml-2"
                                    >
                                        <X className="w-3 h-3 text-gray-400" />
                                    </button>
                                </div>

                                {/* Progress Bar */}
                                <input
                                    type="range"
                                    min="0"
                                    max={duration || 0}
                                    value={currentTime}
                                    onChange={handleSeek}
                                    onClick={(e) => e.stopPropagation()}
                                    onMouseDown={(e) => e.stopPropagation()}
                                    className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer mb-1"
                                />

                                {/* Time & Controls */}
                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] text-gray-500">{formatTime(currentTime)}</span>
                                    
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                togglePlayPause();
                                            }}
                                            className="p-1.5 rounded-full bg-white text-black hover:scale-110 transition-transform"
                                        >
                                            {isPlaying ? (
                                                <div className="flex gap-0.5">
                                                    <div className="w-0.5 h-3 bg-black rounded-full"></div>
                                                    <div className="w-0.5 h-3 bg-black rounded-full"></div>
                                                </div>
                                            ) : (
                                                <div className="w-0 h-0 border-l-[8px] border-l-black border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent ml-0.5"></div>
                                            )}
                                        </button>
                                    </div>

                                    <span className="text-[9px] text-gray-500">{formatTime(duration)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Audio Visualizer */}
                        <div className="flex items-center justify-center gap-0.5 mt-2">
                            {[...Array(8)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ height: isPlaying ? [3, 8, 3] : 3 }}
                                    transition={{ duration: 0.5, repeat: isPlaying ? Infinity : 0, delay: i * 0.1 }}
                                    className="w-0.5 bg-blue-500 rounded-full"
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}

            <BlogModal isOpen={isBlogModalOpen} onClose={() => setIsBlogModalOpen(false)} />
            
            <ServiceModal 
                service={selectedService} 
                isOpen={!!selectedService} 
                onClose={() => setSelectedService(null)} 
                getIconComponent={getIconComponent}
            />
        </main>
    );
}