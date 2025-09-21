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

function BlogModal({ isOpen, onClose }: BlogModalProps) {
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
        message: 'Sorry, I encountered an error. Please try again.'
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
                     src="https://blogger.googleusercontent.com/img/a/AVvXsEhr_NlidocCkMrc26GYs86yIKArBF35_eEeNUUsuUZR6n05jvu8PL6jIGvyYLm1OgON1ZoT8oUkQu3BE9lkWj5dv6NnGxcSdd1FkHZS3xkiogFvY8TCEfMqGMMjkDFmzuNrLH2jW8yiMQssVU3H6Yrc1MwHafLEabPsy2_AwdwLGJL7u9D3H4Hs-MLxn7ib=s16000" />
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
            <div className="flex gap-2 mt-3 flex-wrap">
              {!selectedBlog ? (
                <>
                  <button 
                    onClick={() => handleSuggestedPrompt("What is you name")}
                    className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-full text-xs text-gray-300 border border-gray-700 hover:border-gray-600 transition-colors"
                    disabled={isLoading}
                  >
                    What is you name
                  </button>
                  <button 
                    onClick={() => handleSuggestedPrompt("How can i contact you ?")}
                    className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-full text-xs text-gray-300 border border-gray-700 hover:border-gray-600 transition-colors"
                    disabled={isLoading}
                  >
                    How can i contact you ?
                  </button>
                  <button 
                    onClick={() => handleSuggestedPrompt("What is your role ?")}
                    className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-full text-xs text-gray-300 border border-gray-700 hover:border-gray-600 transition-colors"
                    disabled={isLoading}
                  >
                    What is your role ?
                  </button>
                  <button 
                    onClick={() => handleSuggestedPrompt("You are expert in ?")}
                    className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-full text-xs text-gray-300 border border-gray-700 hover:border-gray-600 transition-colors"
                    disabled={isLoading}
                  >
                    You are expert in ?
                  </button>
                  <button 
                    onClick={() => handleSuggestedPrompt("You are interested in ?")}
                    className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-full text-xs text-gray-300 border border-gray-700 hover:border-gray-600 transition-colors"
                    disabled={isLoading}
                  >
                    You are interested in ?
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => handleSuggestedPrompt("How can AI automate this?")}
                    className="px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 rounded-full text-xs text-blue-300 border border-blue-600/30 hover:border-blue-600/50 transition-colors"
                    disabled={isLoading}
                  >
                    How can AI automate this?
                  </button>
                  <button 
                    onClick={() => handleSuggestedPrompt("AI tools for this topic")}
                    className="px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 rounded-full text-xs text-blue-300 border border-blue-600/30 hover:border-blue-600/50 transition-colors"
                    disabled={isLoading}
                  >
                    AI tools for this topic
                  </button>
                  <button 
                    onClick={() => handleSuggestedPrompt("Summarize key points")}
                    className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-full text-xs text-gray-300 border border-gray-700 hover:border-gray-600 transition-colors"
                    disabled={isLoading}
                  >
                    Summarize key points
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Export the BlogModal component
export { BlogModal };

// Example usage component for demonstration
export default function BlogModalExample() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-white mb-6">
          AI Blog Assistant Demo
        </h1>
        <p className="text-gray-400 mb-8">
          Click the button below to open the AI chat modal and try searching for blog posts!
        </p>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
        >
          <Sparkles className="h-5 w-5 mr-2" />
          Open AI Chat
        </Button>
      </div>
      
      <BlogModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}