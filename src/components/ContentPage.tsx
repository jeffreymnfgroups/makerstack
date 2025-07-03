import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Share2, Bookmark } from 'lucide-react';
import Navigation from '@/components/Navigation';
import BentoGrid, { BentoCardProps } from '@/components/BentoGrid';

interface ContentPageProps {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  type: 'article' | 'tool' | 'playbook' | 'featured';
  image?: string;
  onBack: () => void;
}

const ContentPage: React.FC<ContentPageProps> = ({
  title,
  content,
  author,
  date,
  readTime,
  image,
  onBack,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isTocOpen, setIsTocOpen] = useState(false);

  // Sample table of contents (parsed from content or predefined)
  const tocItems = content
    .split('\n\n')
    .filter((p) => p.startsWith('## '))
    .map((p, index) => ({
      id: `section-${index}`,
      title: p.replace('## ', ''),
    }));

  // Sample related content
  const relatedContent: BentoCardProps[] = [
    {
      id: '1',
      title: 'Building Scalable SaaS Architecture',
      description: 'Master scalable application design.',
      size: 'medium',
      type: 'article',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
      onClick: () => {},
    },
    {
      id: '2',
      title: 'Product-Led Growth',
      description: 'Build products that sell themselves.',
      size: 'medium',
      type: 'article',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      onClick: () => {},
    },
  ];

  // Reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-inter">
      <Navigation onSectionClick={onBack} />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {image && (
          <div className="mb-8">
            <img
              src={image}
              alt={title}
              className="w-full h-64 object-cover rounded-xl"
            />
          </div>
        )}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-light tracking-tight mb-4 text-gray-900">
            {title}
          </h1>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span>{author}</span>
              <span>{date}</span>
              <span>{readTime}</span>
            </div>
            <div className="relative">
              <Button
                variant="outline"
                className="border-gray-200 text-gray-700 hover:bg-gray-100 font-light rounded-lg"
                onClick={() => setIsTocOpen(!isTocOpen)}
              >
                Table of Contents <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
              {isTocOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-100 rounded-xl shadow-lg p-4">
                  {tocItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block py-2 text-gray-700 hover:text-gray-900 font-light"
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>
        <div className="prose prose-lg prose-gray max-w-none">
          {content.split('\n\n').map((paragraph, index) => (
            <p key={index} id={`section-${index}`} className="mb-6 text-gray-700">
              {paragraph.replace(/^## /, '')}
            </p>
          ))}
        </div>
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Related Content</h2>
          <BentoGrid
            cards={relatedContent}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          />
        </section>
      </article>
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 p-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="text-gray-900 font-semibold">MakerStack</div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-700 hover:bg-gray-100 rounded-lg">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" className="text-gray-700 hover:bg-gray-100 rounded-lg">
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
          <div className="w-1/3 bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-gray-900 h-1.5 rounded-full"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>
      </div>
      <footer className="bg-gray-50 py-12">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-900">MakerStack</h4>
              <p className="text-sm text-gray-600">
                Empowering makers with insights and tools.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-900">Links</h4>
              <div className="space-y-2">
                {['Topics', 'Playbooks', 'Tools', 'Resources'].map((item) => (
                  <button
                    key={item}
                    onClick={() => onSectionClick(item.toLowerCase())}
                    className="block text-sm text-gray-600 hover:text-gray-900"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-900">Socials</h4>
              <div className="space-y-2">
                {['Twitter', 'Discord', 'GitHub'].map((item) => (
                  <a key={item} href="#" className="block text-sm text-gray-600 hover:text-gray-900">
                    {item}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-900">Company</h4>
              <div className="space-y-2">
                {['About', 'Privacy', 'Terms', 'Contact'].map((item) => (
                  <a key={item} href="#" className="block text-sm text-gray-600 hover:text-gray-900">
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-500">
            © 2025 MakerStack. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContentPage;