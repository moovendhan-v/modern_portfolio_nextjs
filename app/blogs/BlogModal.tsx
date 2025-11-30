'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send, User, Calendar, Clock, ArrowLeft, Sparkles, Paperclip } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  url: string;
  published: string;
  updated?: string;
  labels: string[];
  thumbnail: string;
  readTime?: number;
  author: {
    name: string;
    image: string | null;
  };
}

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  blogPosts?: BlogPost[];
}

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BlogModal({ isOpen, onClose }: BlogModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [currentTypingMessage, setCurrentTypingMessage] = useState<Message | null>(null);
  const [typingText, setTypingText] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (currentTypingMessage && typingIndex < currentTypingMessage.content.length) {
      const timer = setTimeout(() => {
        setTypingText(prev => prev + currentTypingMessage.content[typingIndex]);
        setTypingIndex(prev => prev + 1);
        scrollToBottom();
      }, 30);
      return () => clearTimeout(timer);
    } else if (currentTypingMessage && typingIndex >= currentTypingMessage.content.length) {
      setMessages(prev => [...prev, { ...currentTypingMessage, content: typingText }]);
      setCurrentTypingMessage(null);
      setTypingText('');
      setTypingIndex(0);
      setIsLoading(false);
    }
  }, [currentTypingMessage, typingIndex, typingText]);

  // API call to send chat message
  const sendChatMessage = async (message: string, action?: string, blogId?: string) => {
    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          action,
          blogId,
          selectedBlog
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending chat message:', error);
      return {
        type: 'error',
        message: `Sorry, I encountered an error. Please try again.`
      };
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputValue;
    setInputValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    setIsLoading(true);

    try {
      // Determine the action based on message content
      let action = '';
      if (currentMessage.toLowerCase().includes('list blogs') || currentMessage.toLowerCase().includes('show blogs')) {
        action = 'list_blogs';
      }

      // Send message to API
      const response = await sendChatMessage(currentMessage, action);
      
      // Create assistant response based on API response
      const assistantResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.message || 'I received your message.',
        timestamp: new Date(),
        blogPosts: response.blogPosts || undefined
      };

      // Handle blog selection from API response
      if (response.type === 'blog_selected' && response.selectedBlog) {
        setSelectedBlog(response.selectedBlog);
      }

      setCurrentTypingMessage(assistantResponse);
      setTypingText('');
      setTypingIndex(0);
      setIsLoading(false);
    } catch (error) {
      // Fallback error message
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
      setIsLoading(false);
    }
  };

  const handleSelectBlog = async (blog: BlogPost) => {
    setIsLoading(true);
    
    try {
      // Send blog selection to API
      const response = await sendChatMessage('', 'select_blog', blog.id);
      
      // Update selected blog state
      setSelectedBlog(blog);
      
      // Add assistant response
      const selectionMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content: response.message || `Great choice! I've loaded "${blog.title}" for our AI-focused discussion. What would you like to know?`,
        timestamp: new Date()
      };

      setCurrentTypingMessage(selectionMessage);
      setTypingText('');
      setTypingIndex(0);
      setIsLoading(false);
    } catch (error) {
      console.error('Error selecting blog:', error);
      // Fallback to local selection
      setSelectedBlog(blog);
      const selectionMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content: `Great choice! I've loaded "${blog.title}" for our AI-focused discussion. What would you like to know?`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, selectionMessage]);
      setIsLoading(false);
    }
  };

  const handleBackToSearch = () => {
    setSelectedBlog(null);
    const backMessage: Message = {
      id: Date.now().toString(),
      type: 'assistant',
      content: '✨ Back to blog discovery mode! Ready to explore more posts and find AI integration opportunities. What topics would you like to explore next?',
      timestamp: new Date()
    };
    setCurrentTypingMessage(backMessage);
    setTypingText('');
    setTypingIndex(0);
    setIsLoading(false);
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setInputValue(prompt);
  };

  const formatReadTime = (readTime?: number) => {
    if (!readTime) return 'Quick read';
    return `${readTime} min`;
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return 'Recent';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-gray-950 border-gray-800">
        <div className="flex flex-col h-[80vh]">
          {/* Header */}
          <DialogHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-md">
                  {/* <Sparkles className="h-4 w-4 text-white" /> */}
                  <Avatar>
                    <AvatarImage
                    className="h-[30px] w-[30px] text-white"
                     src="/images/profile-pic.jpg" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <DialogTitle className="text-lg font-semibold text-white">
                    Hi I am AI Assistant for Moovendhan v
                  </DialogTitle>
                  <p className="text-gray-400 text-xs">
                    {selectedBlog 
                      ? `🔒 Discussing with AI: ${selectedBlog.title.substring(0, 40)}${selectedBlog.title.length > 40 ? '...' : ''}` 
                      : 'You can ask me anything about Me'
                    }
                  </p>
                </div>
              </div>
              {selectedBlog && (
                <Button
                  onClick={handleBackToSearch}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white hover:bg-gray-800"
                >
                  <ArrowLeft className="h-3 w-3 mr-1" />
                  Exit & Browse More
                </Button>
              )}
            </div>
          </DialogHeader>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="space-y-3">
                <div
                  className={`flex gap-3 ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.type === 'assistant' && (
                    <div className="p-1.5 bg-blue-600 rounded-md self-start">
                      <Sparkles className="h-3 w-3 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-3 py-2 rounded-lg text-sm ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'bg-gray-800 text-gray-100 rounded-bl-sm'
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  </div>
                  {message.type === 'user' && (
                    <div className="p-1.5 bg-gray-800 rounded-md self-start">
                      <User className="h-3 w-3 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Blog Posts Display */}
                {message.blogPosts && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3 mx-12">
                    {message.blogPosts.map((post) => (
                      <Card
                        key={post.id}
                        className="bg-gray-900/50 border-gray-700 hover:bg-gray-900/70 transition-all duration-200 hover:border-gray-600"
                      >
                        <div className="aspect-[16/9] relative">
                          <img
                            src={post.thumbnail}
                            alt={post.title}
                            className="w-full h-full object-cover rounded-t-lg"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://avatars.githubusercontent.com/u/96030910?s=400&u=9e85c0b451a4d7b141357a646877f30b1cbf7e11&v=4';
                            }}
                          />
                        </div>
                        <div className="p-3 space-y-2">
                          <h3 className="font-medium text-white text-sm line-clamp-2 leading-snug">
                            {post.title}
                          </h3>
                          <div className="flex flex-wrap gap-1">
                            {post.labels.map((label) => (
                              <Badge
                                key={label}
                                variant="secondary"
                                className="bg-blue-600/20 text-blue-300 text-xs px-2 py-0.5"
                              >
                                {label}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                            {post.content.substring(0, 80)}...
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatDate(post.published)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {formatReadTime(post.readTime)}
                              </span>
                            </div>
                          </div>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectBlog(post);
                            }}
                            size="sm"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 mt-2"
                            disabled={isLoading}
                          >
                            <Sparkles className="h-3 w-3 mr-1" />
                            Ask AI
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {currentTypingMessage && (
              <div className="space-y-3">
                <div className="flex gap-3 justify-start">
                  <div className="p-1.5 bg-blue-600 rounded-md self-start">
                    <Sparkles className="h-3 w-3 text-white" />
                  </div>
                  <div className="max-w-[75%] px-3 py-2 rounded-lg text-sm bg-gray-800 text-gray-100 rounded-bl-sm">
                    <p className="whitespace-pre-wrap leading-relaxed">{typingText}</p>
                  </div>
                </div>
                {currentTypingMessage.blogPosts && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3 mx-12">
                    {currentTypingMessage.blogPosts.map((post) => (
                      <Card
                        key={post.id}
                        className="bg-gray-900/50 border-gray-700 hover:bg-gray-900/70 transition-all duration-200 hover:border-gray-600"
                      >
                        <div className="aspect-[16/9] relative">
                          <img
                            src={post.thumbnail}
                            alt={post.title}
                            className="w-full h-full object-cover rounded-t-lg"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://avatars.githubusercontent.com/u/96030910?s=400&u=9e85c0b451a4d7b141357a646877f30b1cbf7e11&v=4';
                            }}
                          />
                        </div>
                        <div className="p-3 space-y-2">
                          <h3 className="font-medium text-white text-sm line-clamp-2 leading-snug">
                            {post.title}
                          </h3>
                          <div className="flex flex-wrap gap-1">
                            {post.labels.map((label) => (
                              <Badge
                                key={label}
                                variant="secondary"
                                className="bg-blue-600/20 text-blue-300 text-xs px-2 py-0.5"
                              >
                                {label}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                            {post.content.substring(0, 80)}...
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatDate(post.published)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {formatReadTime(post.readTime)}
                              </span>
                            </div>
                          </div>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectBlog(post);
                            }}
                            size="sm"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 mt-2"
                            disabled={isLoading}
                          >
                            <Sparkles className="h-3 w-3 mr-1" />
                            Ask AI
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {isLoading && !currentTypingMessage && (
              <div className="flex gap-3">
                <div className="p-1.5 bg-blue-600 rounded-md">
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
                <div className="bg-gray-800 px-3 py-2 rounded-lg rounded-bl-sm">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-800">
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  adjustTextareaHeight();
                }}
                placeholder="Send a message..."
                className="w-full min-h-[80px] max-h-[200px] bg-gray-900 border border-gray-700 text-white placeholder-gray-500 text-sm rounded-lg px-4 py-4 pr-12 focus:border-gray-600 focus:outline-none resize-none overflow-y-auto"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={isLoading}
                rows={1}
              />
              <Button
                ref={buttonRef}
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                size="sm"
                className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-2"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Suggested prompts */}
            <div className="space-y-2 mt-4">
              {(() => {
                const allSuggestions = !selectedBlog ? [
                  { text: "What is your name?", gradient: "from-blue-600/20 to-purple-600/20", hoverGradient: "from-blue-600/30 to-purple-600/30", border: "border-blue-500/30", hoverBorder: "border-blue-500/50", shadow: "shadow-blue-500/20" },
                  { text: "How can I contact you?", gradient: "from-gray-800 to-gray-700", hoverGradient: "from-gray-700 to-gray-600", border: "border-gray-600/50", hoverBorder: "border-gray-500/50", shadow: "" },
                  { text: "What is your role?", gradient: "from-emerald-600/20 to-teal-600/20", hoverGradient: "from-emerald-600/30 to-teal-600/30", border: "border-emerald-500/30", hoverBorder: "border-emerald-500/50", shadow: "shadow-emerald-500/20" },
                  { text: "What are you expert in?", gradient: "from-violet-600/20 to-purple-600/20", hoverGradient: "from-violet-600/30 to-purple-600/30", border: "border-violet-500/30", hoverBorder: "border-violet-500/50", shadow: "shadow-violet-500/20" },
                  { text: "What are you interested in?", gradient: "from-pink-600/20 to-rose-600/20", hoverGradient: "from-pink-600/30 to-rose-600/30", border: "border-pink-500/30", hoverBorder: "border-pink-500/50", shadow: "shadow-pink-500/20" },
                  { text: "Tell me about your experience", gradient: "from-orange-600/20 to-amber-600/20", hoverGradient: "from-orange-600/30 to-amber-600/30", border: "border-orange-500/30", hoverBorder: "border-orange-500/50", shadow: "shadow-orange-500/20" },
                  { text: "What projects have you worked on?", gradient: "from-cyan-600/20 to-blue-600/20", hoverGradient: "from-cyan-600/30 to-blue-600/30", border: "border-cyan-500/30", hoverBorder: "border-cyan-500/50", shadow: "shadow-cyan-500/20" },
                  { text: "What technologies do you use?", gradient: "from-indigo-600/20 to-blue-600/20", hoverGradient: "from-indigo-600/30 to-blue-600/30", border: "border-indigo-500/30", hoverBorder: "border-indigo-500/50", shadow: "shadow-indigo-500/20" },
                  { text: "Do you offer consulting services?", gradient: "from-fuchsia-600/20 to-pink-600/20", hoverGradient: "from-fuchsia-600/30 to-pink-600/30", border: "border-fuchsia-500/30", hoverBorder: "border-fuchsia-500/50", shadow: "shadow-fuchsia-500/20" },
                  { text: "What is your GitHub profile?", gradient: "from-slate-700/50 to-gray-700/50", hoverGradient: "from-slate-600/50 to-gray-600/50", border: "border-slate-500/30", hoverBorder: "border-slate-400/50", shadow: "" },
                  { text: "What certifications do you have?", gradient: "from-lime-600/20 to-green-600/20", hoverGradient: "from-lime-600/30 to-green-600/30", border: "border-lime-500/30", hoverBorder: "border-lime-500/50", shadow: "shadow-lime-500/20" },
                  { text: "Can you help with my project?", gradient: "from-red-600/20 to-orange-600/20", hoverGradient: "from-red-600/30 to-orange-600/30", border: "border-red-500/30", hoverBorder: "border-red-500/50", shadow: "shadow-red-500/20" },
                ] : [
                  { text: "How can AI automate this?", gradient: "from-blue-600/30 to-cyan-600/30", hoverGradient: "from-blue-600/40 to-cyan-600/40", border: "border-blue-500/40", hoverBorder: "border-blue-400/60", shadow: "shadow-blue-500/30" },
                  { text: "AI tools for this topic", gradient: "from-purple-600/30 to-pink-600/30", hoverGradient: "from-purple-600/40 to-pink-600/40", border: "border-purple-500/40", hoverBorder: "border-purple-400/60", shadow: "shadow-purple-500/30" },
                  { text: "Summarize key points", gradient: "from-emerald-600/30 to-teal-600/30", hoverGradient: "from-emerald-600/40 to-teal-600/40", border: "border-emerald-500/40", hoverBorder: "border-emerald-400/60", shadow: "shadow-emerald-500/30" },
                  { text: "What are the main takeaways?", gradient: "from-indigo-600/30 to-violet-600/30", hoverGradient: "from-indigo-600/40 to-violet-600/40", border: "border-indigo-500/40", hoverBorder: "border-indigo-400/60", shadow: "shadow-indigo-500/30" },
                  { text: "Explain this in simple terms", gradient: "from-orange-600/30 to-amber-600/30", hoverGradient: "from-orange-600/40 to-amber-600/40", border: "border-orange-500/40", hoverBorder: "border-orange-400/60", shadow: "shadow-orange-500/30" },
                  { text: "Related blog posts?", gradient: "from-rose-600/30 to-pink-600/30", hoverGradient: "from-rose-600/40 to-pink-600/40", border: "border-rose-500/40", hoverBorder: "border-rose-400/60", shadow: "shadow-rose-500/30" },
                ];

                // Filter suggestions based on input value
                const filteredSuggestions = inputValue.trim()
                  ? allSuggestions.filter(s => 
                      s.text.toLowerCase().includes(inputValue.toLowerCase())
                    )
                  : allSuggestions;

                // Show 3 suggestions initially, or all if expanded or filtering
                const displayLimit = (showAllSuggestions || inputValue.trim()) ? filteredSuggestions.length : 3;
                const suggestionsToShow = filteredSuggestions.slice(0, displayLimit);
                const hasMore = filteredSuggestions.length > 3;

                return (
                  <>
                    {filteredSuggestions.length > 0 ? (
                      <>
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-xs font-medium text-gray-400">
                            {inputValue.trim() ? `💡 Suggestions (${filteredSuggestions.length})` : '✨ Quick Questions'}
                          </div>
                          {hasMore && !inputValue.trim() && (
                            <button
                              onClick={() => setShowAllSuggestions(!showAllSuggestions)}
                              className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                              disabled={isLoading}
                            >
                              {showAllSuggestions ? (
                                <>
                                  <span>Show less</span>
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                  </svg>
                                </>
                              ) : (
                                <>
                                  <span>Show {filteredSuggestions.length - 3} more</span>
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          {suggestionsToShow.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestedPrompt(suggestion.text)}
                              className={`px-4 py-2 bg-gradient-to-r ${suggestion.gradient} hover:${suggestion.hoverGradient} rounded-full text-xs font-medium text-white border ${suggestion.border} hover:${suggestion.hoverBorder} transition-all duration-200 hover:shadow-lg ${suggestion.shadow ? `hover:${suggestion.shadow}` : ''} hover:scale-105 animate-in fade-in slide-in-from-bottom-2 duration-300`}
                              style={{ animationDelay: `${index * 50}ms` }}
                              disabled={isLoading}
                            >
                              {suggestion.text}
                            </button>
                          ))}
                        </div>
                      </>
                    ) : inputValue.trim() ? (
                      <div className="text-xs text-gray-500 italic py-2">
                        No matching suggestions found. Press Enter to send your message.
                      </div>
                    ) : null}
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}