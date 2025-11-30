'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';
import { Service } from '@/lib/types';
import { Button } from '@/components/ui/button';

interface ServiceModalProps {
    service: Service | null;
    isOpen: boolean;
    onClose: () => void;
    getIconComponent: (iconName: string) => React.ComponentType<{ className?: string }>;
}

export default function ServiceModal({ service, isOpen, onClose, getIconComponent }: ServiceModalProps) {
    if (!service) return null;

    const Icon = getIconComponent(service.icon as unknown as string);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />
                    <motion.div
                        layoutId={`service-${service.title}`}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300, duration: 0.5 }}
                        className="relative w-full max-w-5xl h-[85vh] bg-gradient-to-br from-slate-900 to-black border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors border border-white/10"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Image Section */}
                        <div className="relative w-full md:w-1/2 h-64 md:h-full">
                            <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent md:bg-gradient-to-r" />
                        </div>

                        {/* Content Section */}
                        <div className="flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="inline-flex p-3 bg-blue-500/20 rounded-xl mb-6">
                                    <Icon className="w-8 h-8 text-blue-400" />
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                    {service.title}
                                </h2>
                                <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                                    <p>{service.description}</p>
                                    
                                    {/* Additional Mock Details since Service type is limited */}
                                    <div className="pt-8 border-t border-white/10">
                                        <h3 className="text-xl font-semibold text-white mb-4">What We Deliver</h3>
                                        <ul className="space-y-3">
                                            <li className="flex items-start gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5" />
                                                <span>Customized solutions tailored to your specific business needs and goals.</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5" />
                                                <span>Implementation of industry best practices and cutting-edge technologies.</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5" />
                                                <span>Comprehensive support and maintenance to ensure long-term success.</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5" />
                                                <span>Scalable architecture designed to grow with your business.</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="pt-8">
                                        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl w-full md:w-auto">
                                            Get Started with {service.title}
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
