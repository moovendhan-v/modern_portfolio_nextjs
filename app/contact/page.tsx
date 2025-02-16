'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen pt-20 pb-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-950 to-black py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a question or want to work together? Id love to hear from you.
            Fill out the form below and Ill get back to you as soon as possible.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 -mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="text-blue-500 h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Location</h3>
              <p className="text-gray-400">Kalthirampet, Tamil Nadu, India</p>
            </div>

            <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Mail className="text-blue-500 h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Email</h3>
              <p className="text-gray-400">vmoovendhan3@gmail.com</p>
            </div>

            <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Phone className="text-blue-500 h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Phone</h3>
              <p className="text-gray-400">+91 9750639894</p>
            </div>

            <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Clock className="text-blue-500 h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Working Hours</h3>
              <p className="text-gray-400">N/A</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input
                    placeholder="John Doe"
                    className="bg-white/5 border-white/10"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    className="bg-white/5 border-white/10"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <Input
                    placeholder="How can I help you?"
                    className="bg-white/5 border-white/10"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    placeholder="Your message..."
                    className="bg-white/5 border-white/10 min-h-[200px]"
                    required
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" /> Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
