import React, { useRef, useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Share2, Bookmark, ChevronDown, ChevronUp } from 'lucide-react';
import author1 from '@/assets/author-1.jpg';

// Dummy data for demonstration
const article = {
  title: "The Future of SaaS: Building for Scale",
  subtitle: "How to architect products that last a decade",
  heroImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop",
  author: {
    name: "Marcus Johnson",
    photo: author1,
  },
  date: "Dec 12, 2024",
  readTime: "15 min read",
  content: `## Introduction\n\nBuilding scalable SaaS is more than just picking the right stack...\n\n## Why Scalability Matters\n\nAs your user base grows...\n\n## Key Architectural Patterns\n\n- Microservices\n- Event-driven design\n\n## Database Strategies\n\nSharding, replication, and more...\n\n## Caching & Performance\n\nHow to use Redis, CDNs, etc.\n\n## Monitoring & Observability\n\nYou can't scale what you can't measure.\n\n## Conclusion\n\nStart with scale in mind...`,
  toc: [
    { id: "introduction", label: "Introduction" },
    { id: "why-scalability-matters", label: "Why Scalability Matters" },
    { id: "key-architectural-patterns", label: "Key Architectural Patterns" },
    { id: "database-strategies", label: "Database Strategies" },
    { id: "caching-performance", label: "Caching & Performance" },
    { id: "monitoring-observability", label: "Monitoring & Observability" },
    { id: "conclusion", label: "Conclusion" },
  ],
  related: [
    {
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      title: "Product-Led Growth Strategies",
      snippet: "How to build products that sell themselves through user experience."
    },
    {
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop",
      title: "Stack Builder Tool",
      snippet: "Choose the perfect tech stack for your project with AI-powered recommendations."
    }
  ]
};

const ArticleDetail = () => {
  const [progress, setProgress] = useState(0);
  const [showBottomBar, setShowBottomBar] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      const winHeight = window.innerHeight;
      const contentTop = contentRef.current.offsetTop;
      const contentHeight = contentRef.current.offsetHeight;
      const scrollY = window.scrollY;
      const scrolled = Math.min(
        1,
        Math.max(0, (scrollY - contentTop) / (contentHeight - winHeight))
      );
      setProgress(scrolled * 100);
      setShowBottomBar(scrollY > contentTop + 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Navbar */}
      <Navigation onSectionClick={scrollToSection} />

      {/* Hero Section */}
      <section className="relative w-full h-[50vh] md:h-[70vh] flex items-end overflow-hidden">
        <img
          src={article.heroImage}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight drop-shadow-xl">{article.title}</h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light">{article.subtitle}</p>
          <div className="flex items-center space-x-6">
            <img src={article.author.photo} alt={article.author.name} className="w-14 h-14 rounded-full border-2 border-white shadow-lg transform transition-transform hover:scale-110" />
            <div>
              <div className="text-white font-semibold text-lg">{article.author.name}</div>
              <div className="text-gray-300 text-sm">{article.date} • {article.readTime}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <aside className="hidden lg:block fixed top-24 left-8 w-72">
        <div className="bg-white/95 rounded-xl shadow-xl border border-gray-100 p-6 backdrop-blur-sm">
          <div className="font-semibold text-gray-900 text-lg mb-4">On this page</div>
          <ul className="space-y-1">
            {article.toc.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 text-sm font-medium"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Mobile TOC */}
      <div className="lg:hidden sticky top-0 z-30 bg-white/95 px-6 py-3 border-b border-gray-200 backdrop-blur-sm">
        <button
          onClick={() => setTocOpen(!tocOpen)}
          className="flex items-center justify-between w-full text-gray-800 font-semibold text-lg"
        >
          <span>Table of Contents</span>
          {tocOpen ? <ChevronUp className="h-5 w-5 text-gray-600" /> : <ChevronDown className="h-5 w-5 text-gray-600" />}
        </button>
        {tocOpen && (
          <ul className="mt-3 space-y-1 bg-gray-50 p-4 rounded-lg">
            {article.toc.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    scrollToSection(item.id);
                    setTocOpen(false);
                  }}
                  className="block w-full text-left py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-all duration-200 text-sm font-medium"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-20" ref={contentRef}>
        <article className="prose prose-lg prose-gray max-w-none">
          {article.content.split('\n').map((line, idx) => {
            if (line.startsWith('## ')) {
              const id = line
                .replace(/^## /, '')
                .toLowerCase()
                .replace(/[^\w]+/g, '-');
              return (
                <h2 key={id} id={id} className="scroll-mt-32 fade-in text-3xl font-bold text-gray-900 mt-12 mb-6">{line.replace(/^## /, '')}</h2>
              );
            }
            if (line.trim() === '') return <br key={idx} />;
            return <p key={idx} className="fade-in text-gray-700 leading-relaxed">{line}</p>;
          })}
        </article>
      </main>

      {/* Floating Bottom Popup Bar */}
      {showBottomBar && (
        <div className="fixed bottom-0 left-0 w-full z-50 bg-white/95 border-t border-gray-200 shadow-2xl transition-all duration-300">
          <div className="max-w-4xl mx-auto flex items-center justify-between px-6 py-4">
            <div className="font-semibold text-gray-900 text-lg truncate">{article.title}</div>
            <div className="flex items-center space-x-4">
              <div className="w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors">
                <Share2 className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors">
                <Bookmark className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Related Content */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {article.related.map((rel, idx) => (
              <div key={idx} className="bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group p-5 flex items-center space-x-4 cursor-pointer">
                <img src={rel.image} alt={rel.title} className="w-20 h-20 rounded-lg object-cover transform transition-transform group-hover:scale-105" />
                <div>
                  <div className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">{rel.title}</div>
                  <div className="text-gray-600 text-sm mt-1">{rel.snippet}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-100">
        <div className="max-w-4xl mx-auto py-16 px-6 text-center">
          <div className="text-2xl font-bold text-gray-900 mb-3">MakerStack</div>
          <p className="text-gray-600 text-base mb-6">Empowering makers with premium insights, tools, and community.</p>
          <div className="flex justify-center space-x-6 mb-6">
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Twitter</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">GitHub</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Newsletter</a>
          </div>
          <p className="text-gray-500 text-sm">© 2024 MakerStack. All rights reserved.</p>
        </div>
      </footer>

      {/* Enhanced Animation Styles */}
      <style>{`
        .fade-in {
          opacity: 0;
          transform: translateY(24px);
          animation: fadeInUp 0.7s cubic-bezier(.4,0,.2,1) forwards;
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: none;
          }
        }
        .prose h2 {
          background: linear-gradient(to right, #3b82f6, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .prose p {
          line-height: 1.75;
          color: #374151;
        }
        .group:hover .group-hover\\:text-blue-600 {
          transition:triad: all 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default ArticleDetail;