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
    const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
    const [visibleSkills, setVisibleSkills] = useState<number>(0);
    const [isMusicPlayerOpen, setIsMusicPlayerOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);
    const [position, setPosition] = useState({ x: window.innerWidth - 280, y: window.innerHeight - 150 });
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
                                    return (
                                        <div
                                            key={index}
                                            className="flex-[0_0_100%] min-w-0 md:flex-[0_0_33.33%] px-4"
                                            onMouseEnter={() => setHoveredService(index)}
                                            onMouseLeave={() => setHoveredService(null)}
                                        >
                                            <div className="relative h-[400px] group overflow-hidden rounded-2xl transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-blue-500/20 group-hover:ring-2 group-hover:ring-blue-500/30">
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

            {/* Testimonials Section */}
            {testimonials.length > 0 && (
                <section className="py-20 bg-gradient-to-b from-blue-950 to-black">
                    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                        <h2 className="text-6xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                            What People Say About Us
                        </h2>
                        <p className="text-center text-gray-400 mb-16">
                            Trusted by clients worldwide, here's what they have to say.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="h-[500px]">
                                <div className="relative h-full">
                                    <div className="overflow-hidden h-full" ref={testimonialCarouselRef}>
                                        <div className="flex h-full">
                                            {testimonials.map((testimonial: Testimonial, index: number) => (
                                                <div key={testimonial.id} className="flex-[0_0_100%] min-w-0">
                                                    <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full flex flex-col">
                                                        <div className="flex items-center gap-4 mb-6">
                                                            <Image src={testimonial.image} alt={testimonial.name} width={80} height={80} className="rounded-full" />
                                                            <div>
                                                                <h3 className="text-2xl font-semibold">{testimonial.name}</h3>
                                                                <div className="flex gap-1">
                                                                    {[...Array(testimonial.rating)].map((_, i) => (
                                                                        <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p className="text-gray-400 italic flex-grow">{testimonial.text}</p>
                                                        <Button onClick={() => setSelectedTestimonial(index)} className="mt-4 bg-blue-600 hover:bg-blue-700">
                                                            View Full Details
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <button onClick={scrollPrevTestimonial} className="absolute left-4 top-1/2 -translate-y-1/2 bg-blue-500/20 hover:bg-blue-500/30 rounded-full p-2 backdrop-blur-sm transition-all">
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>
                                    <button onClick={scrollNextTestimonial} className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-500/20 hover:bg-blue-500/30 rounded-full p-2 backdrop-blur-sm transition-all">
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                                {[...testimonials, ...testimonials].map((testimonial: Testimonial, index) => (
                                    <div
                                        key={`${testimonial.id}-${index}`}
                                        className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-black/50 transition-colors cursor-pointer"
                                        onClick={() => setSelectedTestimonial(index % testimonials.length)}
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <Image src={testimonial.image} alt={testimonial.name} width={40} height={40} className="rounded-full" />
                                            <div>
                                                <h4 className="font-medium">{testimonial.name}</h4>
                                                <div className="flex gap-1">
                                                    {[...Array(testimonial.rating)].map((_, i) => (
                                                        <Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-400 line-clamp-3">{testimonial.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            <SkillsSection />

            {/* Testimonial Modal */}
            <Dialog open={selectedTestimonial !== null} onOpenChange={() => setSelectedTestimonial(null)}>
                <DialogContent className="max-w-2xl bg-black/90 border-white/10">
                    {selectedTestimonial !== null && (
                        <div className="relative p-6">
                            <button onClick={() => setSelectedTestimonial(null)} className="absolute top-2 right-2 p-2 rounded-full hover:bg-white/10 transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                            <div className="flex items-center gap-4 mb-6">
                                <Image src={testimonials[selectedTestimonial].image} alt={testimonials[selectedTestimonial].name} width={100} height={100} className="rounded-full" />
                                <div>
                                    <h3 className="text-2xl font-semibold">{testimonials[selectedTestimonial].name}</h3>
                                    <div className="flex gap-1">
                                        {[...Array(testimonials[selectedTestimonial].rating)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <p className="text-gray-300 leading-relaxed">{testimonials[selectedTestimonial].text}</p>
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
        </main>
    );
}