import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Download,
  Mail,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
} from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  const experiences = [
    {
      title: 'Senior Web Developer',
      company: 'Tech Solutions Inc',
      period: '2022 - Present',
      location: 'Remote',
      description:
        'Leading web development projects using Next.js, React, and Node.js. Managing team of 5 developers.',
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Innovations',
      period: '2020 - 2022',
      location: 'Chennai, India',
      description:
        'Developed and maintained multiple web applications using MERN stack and PHP.',
    },
  ];

  const education = [
    {
      degree: 'Bachelor of Engineering in Computer Science',
      institution: 'Anna University',
      period: '2016 - 2020',
      location: 'Chennai, India',
      description:
        'Specialized in web technologies and software development. CGPA: 8.5/10',
    },
  ];

  const certifications = [
    {
      name: 'AWS Certified Developer',
      issuer: 'Amazon Web Services',
      year: '2023',
    },
    {
      name: 'Meta Frontend Developer',
      issuer: 'Meta',
      year: '2022',
    },
  ];

  return (
    <main className="min-h-screen pt-20 pb-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold">About Me</h1>
            <p className="text-gray-400 text-lg">
              Hi, Im Moovendhan V, a passionate web developer and creative
              content creator. With over 4 years of experience in web
              development and 2 years in content creation, I specialize in
              building modern web applications and creating engaging digital
              content.
            </p>
            <div className="flex gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Mail className="mr-2 h-4 w-4" /> Contact Me
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" /> Download CV
              </Button>
            </div>
          </div>
          <div className="relative aspect-square max-w-md mx-auto">
            <Image
              src="https://blogger.googleusercontent.com/img/a/AVvXsEhr_NlidocCkMrc26GYs86yIKArBF35_eEeNUUsuUZR6n05jvu8PL6jIGvyYLm1OgON1ZoT8oUkQu3BE9lkWj5dv6NnGxcSdd1FkHZS3xkiogFvY8TCEfMqGMMjkDFmzuNrLH2jW8yiMQssVU3H6Yrc1MwHafLEabPsy2_AwdwLGJL7u9D3H4Hs-MLxn7ib=s16000"
              alt="Moovendhan V"
              fill
              className="object-cover rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Experience</h2>
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <Card key={index} className="p-6 bg-black/50 border-gray-800">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{exp.title}</h3>
                  <p className="text-blue-500">{exp.company}</p>
                </div>
                <div className="flex items-center gap-4 text-gray-400 mt-2 md:mt-0">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> {exp.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> {exp.location}
                  </span>
                </div>
              </div>
              <p className="text-gray-400">{exp.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Education</h2>
        <div className="space-y-6">
          {education.map((edu, index) => (
            <Card key={index} className="p-6 bg-black/50 border-gray-800">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{edu.degree}</h3>
                  <p className="text-blue-500">{edu.institution}</p>
                </div>
                <div className="flex items-center gap-4 text-gray-400 mt-2 md:mt-0">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> {edu.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> {edu.location}
                  </span>
                </div>
              </div>
              <p className="text-gray-400">{edu.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Certifications Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8">Certifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <Card key={index} className="p-6 bg-black/50 border-gray-800">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <GraduationCap className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold">{cert.name}</h3>
                  <p className="text-gray-400">
                    {cert.issuer} • {cert.year}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
