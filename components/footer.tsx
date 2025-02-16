"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubscribe = async () => {
    if (!email.trim()) {
      setMessage("Please enter a valid email.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Subscription successful!");
        setEmail("");
      } else {
        setMessage(data.error || "Subscription failed. Try again.");
      }
    } catch (error) {
      setMessage("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
          <div>
            <h4 className="text-lg font-semibold mb-4">About</h4>
            <p className="text-gray-400">
              Professional web developer and video editor with a passion for creating engaging digital experiences.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about" className="hover:text-blue-500">About</Link></li>
              <li><Link href="/projects" className="hover:text-blue-500">Projects</Link></li>
              <li><Link href="/blogs" className="hover:text-blue-500">Blog</Link></li>
              <li><Link href="/youtube" className="hover:text-blue-500">YouTube</Link></li>
              <li><Link href="/contact" className="hover:text-blue-500">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Web Development</li>
              <li>Video Editing</li>
              <li>Content Creation</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">Subscribe to stay updated with latest projects and blogs.</p>
            <div className="flex gap-2">
              <Input
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-white/10"
              />
              <Button onClick={handleSubscribe} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                {loading ? "Subscribing..." : "Subscribe"}
              </Button>
            </div>
            {message && <p className="text-sm text-gray-300 mt-2">{message}</p>}
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link href="https://github.com/moovendhan-v" target="_blank">
                <Button variant="ghost" size="icon" className="hover:text-blue-500">
                  <Github className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://linkedin.com/in/moovendhan-v" target="_blank">
                <Button variant="ghost" size="icon" className="hover:text-blue-500">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://www.instagram.com/moovendhan_cybertechmind/?hl=en" target="_blank">
                <Button variant="ghost" size="icon" className="hover:text-blue-500">
                  <Instagram className="h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="text-gray-400">
              © {new Date().getFullYear()} Moovendhan V. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
