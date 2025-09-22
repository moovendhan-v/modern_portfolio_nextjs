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
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg'
    },
    { 
        name: 'Photoshop', 
        icon: ImageIcon, 
        color: 'from-blue-600 to-purple-600',
        category: 'Design',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg'
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
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rest/rest-plain.svg'
    },
    {   
        name: 'Firebase', 
        icon: Flame, 
        color: 'from-yellow-500 to-orange-600',
        category: 'Backend',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg'
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
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-plain.svg'
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

// Enhanced skills component with real logos and better organization
const SkillsSection = () => {
    const [visibleSkills, setVisibleSkills] = useState(0);

    useEffect(() => {
        // Animate skills visibility with staggered effect
        const timer = setTimeout(() => {
            setVisibleSkills(skills.length);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    // Group skills by category
    const skillsByCategory = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {} as Record<string, typeof skills>);

    const categories = Object.keys(skillsByCategory);

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

            {/* Category-wise Skills Display */}
            <div className="space-y-16">
                {categories.map((category, categoryIndex) => (
                    <div key={category} className="space-y-8">
                        <div className="text-center">
                            <h3 className="text-3xl font-bold text-white mb-2">{category}</h3>
                            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
                            {skillsByCategory[category].map((skill, index) => (
                                <motion.div
                                    key={skill.name}
                                    initial={{
                                        opacity: 0,
                                        scale: 0.5,
                                        rotateY: -90,
                                        y: 50
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        scale: 1,
                                        rotateY: 0,
                                        y: 0
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        delay: (categoryIndex * 0.2) + (index * 0.1),
                                        ease: [0.25, 0.46, 0.45, 0.94],
                                        type: "spring",
                                        stiffness: 100
                                    }}
                                    viewport={{ once: true }}
                                    className="group relative"
                                >
                                    <motion.div
                                        animate={{
                                            y: [0, -10, 0],
                                        }}
                                        transition={{
                                            duration: 3 + (index * 0.5),
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: index * 0.2
                                        }}
                                        className="relative"
                                    >
                                        <div className="relative bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-sm border border-gray-700/60 rounded-2xl p-6 hover:border-gray-600/70 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-3 overflow-hidden group">
                                            {/* Background Pattern */}
                                            <div className="absolute inset-0 opacity-10">
                                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-white/5 to-transparent transform rotate-12 scale-150" />
                                            </div>

                                            {/* Logo/Icon Container */}
                                            <div className="flex flex-col items-center space-y-4 relative z-10">
                                                <motion.div
                                                    className="relative p-4 rounded-xl bg-white shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:scale-125 group-hover:rotate-6"
                                                    whileHover={{
                                                        rotate: [0, -10, 10, 0],
                                                        transition: { duration: 0.5 }
                                                    }}
                                                >
                                                    {/* Real logo image */}
                                                    <img 
                                                        src={skill.iconUrl} 
                                                        alt={skill.name}
                                                        className="h-8 w-8 object-contain"
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
                                                    <skill.icon className="h-8 w-8 text-gray-800 hidden" />
                                                </motion.div>

                                                {/* Skill Name */}
                                                <div className="text-center">
                                                    <motion.h4
                                                        className="font-semibold text-white text-sm group-hover:text-blue-400 transition-colors duration-300"
                                                        initial={{ opacity: 0 }}
                                                        whileInView={{ opacity: 1 }}
                                                        transition={{ delay: (categoryIndex * 0.2) + (index * 0.1) + 0.5 }}
                                                        viewport={{ once: true }}
                                                    >
                                                        {skill.name}
                                                    </motion.h4>
                                                </div>
                                            </div>

                                            {/* Enhanced Hover Glow Effect */}
                                            <motion.div
                                                className={`absolute inset-0 bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                                            />

                                            {/* Particle Effect on Hover */}
                                            <motion.div
                                                className="absolute inset-0 pointer-events-none"
                                                initial={{ opacity: 0 }}
                                                whileHover={{ opacity: 1 }}
                                            >
                                                {[...Array(6)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        className="absolute w-1 h-1 bg-blue-400 rounded-full"
                                                        initial={{
                                                            opacity: 0,
                                                            scale: 0,
                                                            x: "50%",
                                                            y: "50%"
                                                        }}
                                                        animate={{
                                                            opacity: [0, 1, 0],
                                                            scale: [0, 1, 0],
                                                            x: ["50%", `${30 + Math.random() * 40}%`],
                                                            y: ["50%", `${30 + Math.random() * 40}%`],
                                                        }}
                                                        transition={{
                                                            duration: 2,
                                                            repeat: Infinity,
                                                            delay: i * 0.2,
                                                            ease: "easeOut"
                                                        }}
                                                    />
                                                ))}
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Enhanced Stats Footer */}
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                    duration: 1,
                    delay: 0.6,
                    type: "spring",
                    stiffness: 100
                }}
                viewport={{ once: true }}
                className="mt-20 text-center"
            >
                <motion.div
                    className="inline-flex items-center gap-8 bg-gradient-to-r from-gray-900/60 to-gray-800/40 backdrop-blur-sm border border-gray-700/60 rounded-full px-10 py-6 shadow-2xl"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <div className="flex items-center gap-3">
                        <motion.div
                            className="w-3 h-3 bg-green-500 rounded-full"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [1, 0.7, 1]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        <span className="text-sm font-medium text-white">
                            {skills.length}+ Technologies
                        </span>
                    </div>

                    <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-500 to-transparent" />

                    <div className="text-left">
                        <p className="text-sm font-medium text-white">
                            {categories.length} Categories
                        </p>
                        <p className="text-xs text-gray-400">
                            Full-stack expertise
                        </p>
                    </div>

                    <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-500 to-transparent" />

                    <div className="text-left">
                        <motion.p
                            className="text-sm font-medium text-white"
                            whileHover={{ color: "#60a5fa" }}
                            transition={{ duration: 0.2 }}
                        >
                            Always Learning
                        </motion.p>
                        <p className="text-xs text-gray-400">
                            New technologies every day
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default SkillsSection;
