import './globals.css';
import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

import { PostHogProvider } from '@/app/provider'

// import localFont from 'next/font/local'

// const inter = localFont({
//   src: '../public/fonts/Inter-Variable.ttf',
//   variable: '--font-inter'
// })

// const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Moovendhan V - The Cyber Tech Mind',
  description:
    'Cloud developer and cybersecurity enthusiast. Simplifying complex tech concepts, helping readers stay safe online, and providing real-world solutions to everyday challenges.',
  keywords: [
    'Cybersecurity',
    'Cloud Development',
    'Tech Enthusiast',
    'Web Security',
    'Software Development',
  ],
  openGraph: {
    title: 'Moovendhan V - The Cyber Tech Mind',
    description:
      'Cloud developer and cybersecurity enthusiast. Helping readers stay safe online and simplifying tech concepts.',
    url: 'https://profile.cybertechmind.com',
    type: 'website',
    images: [
      {
        url: 'https://blogger.googleusercontent.com/img/a/AVvXsEhr_NlidocCkMrc26GYs86yIKArBF35_eEeNUUsuUZR6n05jvu8PL6jIGvyYLm1OgON1ZoT8oUkQu3BE9lkWj5dv6NnGxcSdd1FkHZS3xkiogFvY8TCEfMqGMMjkDFmzuNrLH2jW8yiMQssVU3H6Yrc1MwHafLEabPsy2_AwdwLGJL7u9D3H4Hs-MLxn7ib=s16000',
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
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <body className={`${inter.className} bg-black text-white`}> */}
      <body className={` bg-black text-white`}>
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