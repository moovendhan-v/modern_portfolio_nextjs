'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Code,
    Database,
    Server,
    Globe,
    Monitor,
    Cloud,
    HardDrive,
    Workflow,
    Github,
    FileCode,
    Palette,
    Cpu,
    Layers,
    Zap,
    Film,
    Wand2,
    Terminal,
    Smartphone,
    Shield,
    Settings,
    Box,
    Network,
    Binary,
    PenTool,
    Image as ImageIcon,
    Gamepad2,
    Wrench,
    Activity,
    Briefcase,
    Coffee,
    Chrome,
    Flame,
    Hexagon,
    GitBranchPlusIcon
} from 'lucide-react';

// Enhanced skills array with more technologies and proper categorization
const skills = [
    // Frontend Technologies
    { 
        name: 'HTML5', 
        icon: FileCode, 
        color: 'from-orange-500 to-red-500',
        category: 'Frontend',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'
    },
    { 
        name: 'CSS3', 
        icon: Palette, 
        color: 'from-blue-500 to-cyan-500',
        category: 'Frontend',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'
    },
    { 
        name: 'JavaScript', 
        icon: Zap, 
        color: 'from-yellow-400 to-yellow-600',
        category: 'Frontend',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
    },
    { 
        name: 'TypeScript', 
        icon: FileCode, 
        color: 'from-blue-600 to-blue-800',
        category: 'Frontend',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'
    },
    { 
        name: 'React', 
        icon: Code, 
        color: 'from-blue-400 to-cyan-500',
        category: 'Frontend',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
    },
    { 
        name: 'Next.js', 
        icon: Globe, 
        color: 'from-gray-700 to-gray-900',
        category: 'Frontend',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg'
    },
    { 
        name: 'Tailwind CSS', 
        icon: Palette, 
        color: 'from-teal-400 to-blue-500',
        category: 'Frontend',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg'
    },
    { 
        name: 'Bootstrap', 
        icon: Layers, 
        color: 'from-purple-500 to-purple-700',
        category: 'Frontend',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg'
    },

    // Backend Technologies
    { 
        name: 'Node.js', 
        icon: Server, 
        color: 'from-green-500 to-emerald-500',
        category: 'Backend',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'
    },
    { 
        name: 'Nest js', 
        icon: Server, 
        color: 'from-green-500 to-emerald-500',
        category: 'Backend',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg'
    },
    { 
        name: 'Python', 
        icon: Cpu, 
        color: 'from-yellow-500 to-blue-600',
        category: 'Backend',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'
    },
    { 
        name: 'PHP', 
        icon: Code, 
        color: 'from-purple-500 to-indigo-600',
        category: 'Backend',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg'
    },
    { 
        name: 'Express.js', 
        icon: Server, 
        color: 'from-gray-600 to-gray-800',
        category: 'Backend',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg'
    },
    { 
        name: 'FastAPI', 
        icon: Zap, 
        color: 'from-teal-500 to-green-600',
        category: 'Backend',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg'
    },
    { 
        name: 'Laravel', 
        icon: Code, 
        color: 'from-red-500 to-orange-500',
        category: 'Backend',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg'
    },

    // Database Technologies
    { 
        name: 'MySQL', 
        icon: Database, 
        color: 'from-blue-600 to-blue-800',
        category: 'Database',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg'
    },
    { 
        name: 'PostgreSQL', 
        icon: Database, 
        color: 'from-blue-700 to-indigo-800',
        category: 'Database',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg'
    },
    { 
        name: 'MongoDB', 
        icon: Database, 
        color: 'from-green-600 to-green-800',
        category: 'Database',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg'
    },
    { 
        name: 'Redis', 
        icon: Server, 
        color: 'from-red-500 to-red-700',
        category: 'Database',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg'
    },
    { 
        name: 'SQLite', 
        icon: Database, 
        color: 'from-blue-500 to-blue-700',
        category: 'Database',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg'
    },

    // Cloud & DevOps
    { 
        name: 'AWS', 
        icon: Cloud, 
        color: 'from-orange-500 to-yellow-600',
        category: 'Cloud',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg'
    },

    { 
        name: 'Docker', 
        icon: Box, 
        color: 'from-blue-600 to-blue-800',
        category: 'DevOps',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg'
    },
    { 
        name: 'Kubernetes', 
        icon: Hexagon, 
        color: 'from-blue-500 to-purple-600',
        category: 'DevOps',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-original.svg'
    },
    { 
        name: 'Jenkins', 
        icon: Settings, 
        color: 'from-blue-700 to-gray-700',
        category: 'DevOps',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg'
    },
    { 
        name: 'GitHub Actions', 
        icon: Workflow, 
        color: 'from-gray-700 to-gray-900',
        category: 'DevOps',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg'
    },
    { 
        name: 'Terraform', 
        icon: Cloud, 
        color: 'from-purple-600 to-blue-700',
        category: 'DevOps',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg'
    },

    // Mobile Development
    { 
        name: 'Flutter', 
        icon: Smartphone, 
        color: 'from-blue-400 to-cyan-600',
        category: 'Mobile',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg'
    },

    // Tools & Others
    { 
        name: 'Git', 
        icon: Code, 
        color: 'from-orange-600 to-red-600',
        category: 'Tools',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg'
    },
    { 
        name: 'GitHub', 
        icon: GitBranchPlusIcon, 
        color: 'from-black-700 to-gray-900',
        category: 'Tools',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg'
    },
    { 
        name: 'VS Code', 
        icon: Code, 
        color: 'from-blue-600 to-blue-800',
        category: 'Tools',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg'
    },
    { 
        name: 'Webpack', 
        icon: Box, 
        color: 'from-blue-500 to-cyan-600',
        category: 'Tools',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg'
    },
    { 
        name: 'Vite', 
        icon: Zap, 
        color: 'from-yellow-400 to-purple-600',
        category: 'Tools',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg'
    },
    { 
        name: 'Figma', 
        icon: PenTool, 
        color: 'from-pink-500 to-purple-600',
        category: 'Design',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg'
    },
    { 
        name: 'Adobe XD', 
        icon: PenTool, 
        color: 'from-pink-500 to-purple-700',
        category: 'Design',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-original.svg'
    },
    { 
        name: 'Photoshop', 
        icon: ImageIcon, 
        color: 'from-blue-600 to-purple-600',
        category: 'Design',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg'
    },
    { 
        name: 'Premiere Pro', 
        icon: Film, 
        color: 'from-purple-600 to-pink-600',
        category: 'Design',
        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg'
    },
    { 
        name: 'After Effects', 
        icon: Wand2, 
        color: 'from-purple-700 to-blue-800',
        category: 'Design',
        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg'
    },

    // Additional Modern Technologies
    { 
        name: 'GraphQL', 
        icon: Network, 
        color: 'from-pink-500 to-purple-600',
        category: 'API',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg'
    },
    { 
        name: 'RestApi', 
        icon: Network, 
        color: 'from-pink-500 to-purple-600',
        category: 'API',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rest/rest-original.svg'
    },
    {   
        name: 'Firebase', 
        icon: Flame, 
        color: 'from-yellow-500 to-orange-600',
        category: 'Backend',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg'
    },
    { 
        name: 'Prisma', 
        icon: Database, 
        color: 'from-blue-600 to-purple-600',
        category: 'Database',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg'
    },
    { 
        name: 'Nginx', 
        icon: Server, 
        color: 'from-green-600 to-green-800',
        category: 'Server',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg'
    },
    { 
        name: 'Apache', 
        icon: Server, 
        color: 'from-red-600 to-red-800',
        category: 'Server',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg'
    },
    { 
        name: 'Linux', 
        icon: Terminal, 
        color: 'from-yellow-500 to-orange-600',
        category: 'OS',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg'
    },
    { 
        name: 'Ubuntu', 
        icon: Terminal, 
        color: 'from-orange-500 to-red-600',
        category: 'OS',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-original.svg'
    },
    { 
        name: 'Postman', 
        icon: Activity, 
        color: 'from-orange-500 to-orange-700',
        category: 'API',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg'
    },
    { 
        name: 'Slack', 
        icon: Briefcase, 
        color: 'from-purple-500 to-pink-600',
        category: 'Tools',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg'
    },
    { 
        name: 'Jira', 
        icon: Briefcase, 
        color: 'from-blue-600 to-blue-800',
        category: 'Tools',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg'
    }
];

// Clean and simple skills component
const SkillsSection = () => {
    return (
        <section className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                    Technologies I Master
                </h2>
                <p className="text-gray-400 text-lg">
                    A comprehensive showcase of modern technologies, frameworks, and tools I work with daily
                </p>
            </div>

            {/* Simple Grid Layout */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-8">
                {skills.map((skill, index) => (
                    <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: index * 0.05,
                            ease: "easeOut"
                        }}
                        viewport={{ once: true }}
                        className="group flex flex-col items-center space-y-3 p-4 rounded-xl hover:bg-gray-800/30 transition-colors duration-300"
                    >
                        {/* Icon Container */}
                        <div className="relative p-3 rounded-lg bg-gray-800/50 group-hover:bg-gray-700/50 transition-colors duration-300">
                            <img
                                src={skill.iconUrl}
                                alt={skill.name}
                                className="h-10 w-10 object-contain"
                                style={{
                                    filter: skill.name === 'Next.js' || skill.name === 'GitHub' || skill.name === 'GitHub Actions'
                                        ? 'invert(1)'
                                        : 'none'
                                }}
                                onError={(e) => {
                                    // Fallback to Lucide icon if image fails to load
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                }}
                            />
                            {/* Fallback Lucide icon */}
                            <skill.icon className="h-10 w-10 text-gray-400 hidden" />
                        </div>

                        {/* Skill Name */}
                        <h4 className="font-medium text-white text-sm text-center group-hover:text-blue-400 transition-colors duration-300">
                            {skill.name}
                        </h4>
                    </motion.div>
                ))}
            </div>

            {/* Simple Stats Footer */}
            <div className="mt-20 text-center">
                <div className="inline-flex items-center gap-8 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-full px-8 py-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-white">
                            {skills.length} Technologies
                        </span>
                    </div>

                    <div className="w-px h-6 bg-gray-600" />

                    <div className="text-sm font-medium text-white">
                        Full-Stack Developer
                    </div>

                    <div className="w-px h-6 bg-gray-600" />

                    <div className="text-sm font-medium text-white">
                        Always Learning
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;

