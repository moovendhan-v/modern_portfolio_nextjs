import './globals.css';
import type { Metadata } from 'next';
import Head from 'next/head'; // Import Head for metadata
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { PostHogProvider } from '@/app/provider';

export const metadata: Metadata = {
  title: 'Moovendhan V - The Cyber Tech Mind',
  authors: { url: 'https://profile.cybertechmind.com', name: 'Moovendhan V' },
  description:
    'Cloud developer and cybersecurity enthusiast. Helping readers stay safe online and simplifying tech concepts.',
  keywords: [
    'Freelance Cybersecurity Expert',
    'Freelance Cloud Developer',
    'Cybersecurity Consultant',
    'Cloud Security Specialist',
    'Freelance Ethical Hacker',
    'Penetration Testing Services',
    'Bug Bounty Expert',
    'Freelance DevOps Engineer',
    'Cloud Solutions Architect',
    'Next.js Developer for Hire',
    'Secure Web App Developer',
    'Linux Security Consultant',
    'Cyber Threat Intelligence',
    'SOC Analyst Freelancer',
    'Infosec Consultant',
    'Zero Trust Security Consultant',
    'AWS Security Freelancer',
    'Azure Security Engineer',
    'Google Cloud Security Expert',
    'Remote Cybersecurity Freelancer',
    'Freelance Web Security Auditor',
    'Smart Contract Security Auditor',
    'Red Teaming Services',
    'Blue Teaming Expert',
    'Cyber Risk Assessment',
    'Secure API Development',
    'MERN Stack Security Specialist',
    'Malware Analysis Expert',
    'Freelance SOC Analyst',
    'Freelance Network Security Engineer',
    'Cloud Infrastructure Security',
    'DevSecOps Specialist',
    'Cybersecurity Trainer',
    'Dark Web Intelligence Consultant',
    'Freelance Security Engineer',
    'Vulnerability Assessment Specialist',
    'Application Security Expert',
    'CISO as a Service',
    'Cybersecurity Researcher for Hire',
    'Freelance Blockchain Security Expert',
    'Secure Software Development',
    'Security Automation Consultant',
  ],
  // twitter: {
  //   card: 'summary_large_image',
  //   site: '@moovendhan_v',
  //   creator: '@moovendhan_v',
  //   title: 'Moovendhan V - The Cyber Tech Mind',
  //   description:
  //     'Cybersecurity, Cloud, and Web Development expert. Helping readers stay safe online and build secure applications.',
  //   images: ['https://profile.cybertechmind.com/og-image.jpg'],
  // },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Moovendhan V - The Cyber Tech Mind',
    description:
      'Cloud developer and cybersecurity enthusiast. Helping readers stay safe online and simplifying tech concepts.',
    url: 'https://profile.cybertechmind.com',
    type: 'website',
    images: [
      {
        url: '/images/profile-pic.jpg',
        width: 1200,
        height: 630,
        alt: 'Moovendhan V - The Cyber Tech Mind',
      },
    ],
  },
  other: {
    github: 'https://github.com/moovendhan-v',
    instagram: 'https://www.instagram.com/moovendhan_cybertechmind/',
    linkedin: 'https://www.linkedin.com/in/moovendhanv/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ JSON-LD Structured Data for Google Cards
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Moovendhan V",
    "alternateName": "Cyber Tech Mind",
    "description": "Cloud Developer & Cybersecurity Expert | Ethical Hacker | Secure Web Development.",
    "jobTitle": "Cybersecurity Consultant & Cloud Developer",
    "url": "https://profile.cybertechmind.com",
    "image": "https://profile.cybertechmind.com/profile.jpg",
    "sameAs": [
      "https://github.com/moovendhan-v",
      "https://www.linkedin.com/in/moovendhanv/",
      "https://www.instagram.com/moovendhan_cybertechmind/",
      "https://twitter.com/moovendhan_v"
    ],
    "knowsAbout": [
      "Cybersecurity",
      "Penetration Testing",
      "Cloud Security",
      "DevOps Security",
      "Ethical Hacking",
      "JavaScript Security",
      "Linux Security",
      "Zero Trust Security",
      "Secure Web Development"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "brand": {
      "@type": "Brand",
      "name": "Cyber Tech Mind"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Your University Name"
    },
    "offers": {
      "@type": "Service",
      "name": "Cybersecurity & Web Security Services",
      "description": "Providing cybersecurity consulting, penetration testing, and secure web development.",
      "serviceType": "Freelance Cybersecurity Consulting",
      "provider": {
        "@type": "Person",
        "name": "Moovendhan V"
      },
      "areaServed": "Worldwide"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "contact@cybertechmind.com",
      "url": "https://profile.cybertechmind.com/contact"
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        {/* ✅ Inject JSON-LD Structured Data for Google Cards */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <body className="bg-black text-white">
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Navbar />
          <PostHogProvider>
            {children}
          </PostHogProvider>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}