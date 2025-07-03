import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { ArrowDown, FileText, BarChart3, TrendingUp, Users, Zap, Code, Layers, Palette, Rocket, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Navigation from '@/components/Navigation';
import SearchBar from '@/components/SearchBar';
import ArticleCard from '@/components/ArticleCard';
import NewsletterSignup from '@/components/NewsletterSignup';
import BentoGrid, { BentoCardProps } from '@/components/BentoGrid';
import ContentPage from '@/components/ContentPage';

// Assets
import playbookCover from '@/assets/playbook-1.jpg';

// Define types for articles and content
interface Article {
  id: number;
  title: string;
  excerpt: string;
  fullContent: string;
  date: string;
  topic: string;
  readTime: string;
  image: string;
}

interface Content {
  id: string;
  title: string;
  content: string;
  date: string;
  readTime: string;
  type: 'article' | 'tool' | 'playbook' | 'featured';
  image: string;
}

// Animation variants for sections
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  hover: { scale: 1.02, boxShadow: '0 8px 24px rgba(0,0,0,0.1)', transition: { duration: 0.3 } }
};

const Index = () => {
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [currentView, setCurrentView] = useState<'grid' | 'content'>('grid');
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Sample content data (expanded for richer UI)
  const contentData: { [key: string]: Content } = {
    '1': {
      id: '1',
      title: 'Building Scalable SaaS Architecture',
      content: `
        ## Introduction
        Building a scalable SaaS architecture is one of the most critical decisions you'll make as a founder. The choices you make early on will determine whether your application can handle 10 users or 10 million users.

        ## Principles
        In this comprehensive guide, we'll explore the fundamental principles that separate successful SaaS platforms from those that crumble under growth. From microservices architecture to database sharding strategies, we'll cover everything you need to know.

        ## Horizontal Scalability
        The first principle is designing for horizontal scalability from day one. This means building your application in a way that allows you to add more servers rather than upgrading existing ones. This approach is not only more cost-effective but also provides better fault tolerance.

        ## Database Design
        Database design is another crucial aspect. We'll explore how companies like Stripe and Shopify handle millions of transactions by implementing proper indexing, read replicas, and eventual consistency patterns.

        ## Caching Strategies
        Caching strategies can make or break your application's performance. We'll dive deep into Redis implementations, CDN strategies, and application-level caching that can reduce your database load by 90%.

        ## Monitoring
        Finally, we'll cover monitoring and observability. You can't scale what you can't measure. We'll show you how to implement proper logging, metrics, and alerting systems that will help you identify bottlenecks before they become problems.
      `,
      date: 'Dec 12, 2024',
      readTime: '12 min read',
      type: 'article',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop'
    },
    '2': {
      id: '2',
      title: 'Product-Led Growth Strategies',
      content: `
        ## Product-Led Growth
        Product-led growth (PLG) has become the dominant go-to-market strategy for the world's fastest-growing SaaS companies. Unlike traditional sales-led approaches, PLG puts the product at the center of customer acquisition, activation, and expansion.

        ## Aha Moment
        The core principle of PLG is simple: create a product so good that it sells itself. But executing this strategy requires careful planning and deep understanding of user psychology and behavior.

        ## Onboarding
        The onboarding experience is crucial. You have minutes, not hours, to demonstrate value. We'll explore how companies like Notion and Figma design their onboarding flows to get users to their aha moment as quickly as possible.

        ## Freemium Models
        Freemium models are often central to PLG strategies, but they must be carefully designed. The free tier should provide real value while creating natural upgrade paths. We'll analyze successful freemium models and common pitfalls to avoid.

        ## Viral Loops
        Viral loops and network effects can accelerate growth exponentially. We'll examine how products like Loom and Calendly built sharing mechanisms directly into their core workflows, turning every user into a potential acquisition channel.
      `,
      date: 'Dec 10, 2024',
      readTime: '15 min read',
      type: 'article',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop'
    },
    '3': {
      id: '3',
      title: 'Stack Builder Tool',
      content: `
        ## Stack Builder
        The Stack Builder is an intelligent tool designed to help developers and founders choose the perfect technology stack for their projects. Making the right technology choices early can save months of development time and prevent costly rewrites down the road.

        ## Recommendations
        Our tool analyzes your project requirements, team expertise, scalability needs, and budget constraints to recommend the optimal combination of technologies. Whether you're building a simple MVP or a complex enterprise application, Stack Builder provides personalized recommendations.

        ## Features
        The tool covers frontend frameworks (React, Vue, Angular), backend technologies (Node.js, Python, Go), databases (PostgreSQL, MongoDB, Redis), cloud providers (AWS, GCP, Azure), and deployment strategies (Docker, Kubernetes, serverless).

        ## Collaboration
        Advanced features include team collaboration, stack comparison matrices, and integration with project management tools. You can save multiple stack configurations, share them with your team, and track decisions over time.
      `,
      date: 'Dec 14, 2024',
      readTime: '8 min read',
      type: 'tool',
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=1200&h=600&fit=crop'
    },
    '4': {
      id: '4',
      title: 'Design Systems at Scale',
      content: `
        ## Design Systems
        Creating consistent, maintainable design languages for growing teams is a challenge. This guide covers the best practices for building and scaling design systems in modern product teams.

        ## Consistency
        As your team grows, maintaining design consistency becomes increasingly challenging. We'll show you how to create a single source of truth for your UI components and patterns.

        ## Tooling
        Explore the best tools for design system management, from Figma to Storybook, and how to integrate them into your workflow.
      `,
      date: 'Dec 8, 2024',
      readTime: '10 min read',
      type: 'article',
      image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=600&fit=crop'
    },
    '5': {
      id: '5',
      title: 'No-Code MVP Builder',
      content: `## No-Code MVP Builder\nLaunch your MVP in days, not weeks, using the latest no-code tools.\n\n### Why No-Code?\nNo-code platforms empower founders to validate ideas quickly without engineering resources.\n\n### Top Tools\n- Webflow\n- Bubble\n- Glide\n- Softr\n\n### Case Study\nSee how IndieApp launched in 2 weeks and got 1,000 users.`,
      date: 'Dec 5, 2024',
      readTime: '8 min read',
      type: 'playbook',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=600&fit=crop'
    },
    '6': {
      id: '6',
      title: 'Maker Marketing Toolkit',
      content: `## Maker Marketing Toolkit\nEssential marketing tools for indie makers.\n\n### What's Inside\n- Email marketing\n- Landing page builders\n- Analytics\n- Social media automation\n\n### Success Story\nHow MakerStack grew to 10,000 subscribers in 6 months.`,
      date: 'Dec 2, 2024',
      readTime: '7 min read',
      type: 'tool',
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=1200&h=600&fit=crop'
    },
    '7': {
      id: '7',
      title: "The Indie Founder's Mindset",
      content: `## The Indie Founder's Mindset\nHow to stay resilient, creative, and focused as a solo founder.\n\n### Key Lessons\n- Embrace failure\n- Build in public\n- Community over competition\n\n### Quotes\n> "The journey is the reward."`,
      date: 'Nov 28, 2024',
      readTime: '6 min read',
      type: 'featured',
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=1200&h=600&fit=crop'
    },
    '8': {
      id: '8',
      title: 'Ultimate SaaS Pricing Guide',
      content: `## Ultimate SaaS Pricing Guide\nFind the perfect pricing model for your SaaS.\n\n### Models\n- Freemium\n- Tiered\n- Usage-based\n\n### Real-World Examples\nHow top SaaS companies price for growth.`,
      date: 'Nov 20, 2024',
      readTime: '9 min read',
      type: 'playbook',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=600&fit=crop'
    }
  };

  // Enhanced bentoCards for Apple-style bento layout
  const bentoCards: BentoCardProps[] = [
    {
      id: '1',
      title: 'Building Scalable SaaS Architecture',
      description: 'Master the art of building applications that can handle millions of users.',
      size: 'large',
      type: 'featured',
      readTime: '12 min read',
      date: 'Dec 12, 2024',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
      onClick: handleCardClick
    },
    {
      id: '2',
      title: 'Product-Led Growth',
      description: 'How to build products that sell themselves through exceptional user experience.',
      size: 'medium',
      type: 'article',
      readTime: '15 min read',
      date: 'Dec 10, 2024',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      onClick: handleCardClick
    },
    {
      id: '3',
      title: 'Stack Builder',
      description: 'Choose the perfect tech stack for your project with AI-powered recommendations.',
      size: 'medium',
      type: 'tool',
      readTime: '8 min read',
      date: 'Dec 14, 2024',
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=600&fit=crop',
      onClick: handleCardClick
    },
    {
      id: '4',
      title: 'Design Systems at Scale',
      description: 'Creating consistent, maintainable design languages for growing teams.',
      size: 'medium',
      type: 'article',
      readTime: '10 min read',
      date: 'Dec 8, 2024',
      image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop',
      onClick: handleCardClick
    },
    {
      id: '5',
      title: 'No-Code MVP Builder',
      description: 'Build and launch MVPs without writing code.',
      size: 'medium',
      type: 'playbook',
      readTime: '8 min read',
      date: 'Dec 5, 2024',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop',
      onClick: handleCardClick
    },
    {
      id: '6',
      title: 'Maker Marketing Toolkit',
      description: 'Essential marketing tools for indie makers.',
      size: 'medium',
      type: 'tool',
      readTime: '7 min read',
      date: 'Dec 2, 2024',
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&h=600&fit=crop',
      onClick: handleCardClick
    },
    {
      id: '7',
      title: "The Indie Founder's Mindset",
      description: 'How to stay resilient, creative, and focused as a solo founder.',
      size: 'large',
      type: 'featured',
      readTime: '6 min read',
      date: 'Nov 28, 2024',
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800&h=600&fit=crop',
      onClick: handleCardClick
    },
    {
      id: '8',
      title: 'Ultimate SaaS Pricing Guide',
      description: 'Find the perfect pricing model for your SaaS.',
      size: 'medium',
      type: 'playbook',
      readTime: '9 min read',
      date: 'Nov 20, 2024',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop',
      onClick: handleCardClick
    }
  ];

  // All articles for latest content (expanded)
  const allArticles: Article[] = [
    {
      id: 1,
      title: "Building Scalable SaaS Architecture",
      excerpt: "Modern patterns for building resilient, scalable applications",
      fullContent: "In this comprehensive guide, we'll explore the fundamental principles...",
      date: "Dec 12, 2024",
      topic: "Development",
      readTime: "12 min",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop"
    },
    {
      id: 2,
      title: "Product-Led Growth Strategies",
      excerpt: "How to build products that sell themselves through user experience",
      fullContent: "Product-led growth is revolutionizing how companies acquire...",
      date: "Dec 10, 2024",
      topic: "Product",
      readTime: "15 min",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop"
    },
    {
      id: 3,
      title: "Design Systems at Scale",
      excerpt: "Creating consistent, maintainable design languages for growing teams",
      fullContent: "As your team grows, maintaining design consistency becomes increasingly challenging...",
      date: "Dec 8, 2024",
      topic: "Design",
      readTime: "10 min",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=450&fit=crop"
    },
    {
      id: 4,
      title: "No-Code MVP Builder",
      excerpt: "Build and launch MVPs without writing code.",
      fullContent: "No-code tools are changing the way founders launch products...",
      date: "Dec 5, 2024",
      topic: "No-Code",
      readTime: "8 min",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=450&fit=crop"
    },
    {
      id: 5,
      title: "Maker Marketing Toolkit",
      excerpt: "Essential marketing tools for indie makers.",
      fullContent: "Marketing is the lifeblood of any indie project...",
      date: "Dec 2, 2024",
      topic: "Marketing",
      readTime: "7 min",
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&h=450&fit=crop"
    }
  ];

  // Trending topics
  const topics = [
    { name: "SaaS Development", engagement: 94 },
    { name: "Indie Maker Trends", engagement: 87 },
    { name: "No-Code Solutions", engagement: 82 },
    { name: "Growth Hacking", engagement: 79 },
    { name: "Pricing Strategies", engagement: 76 }
  ];

  // Handle card click for navigation to content page
  function handleCardClick(id: string) {
    const content = contentData[id as keyof typeof contentData];
    if (content) {
      setSelectedContent(content);
      setCurrentView('content');
    } else {
      toast({
        title: "Content coming soon",
        description: "This content is being prepared and will be available soon.",
      });
    }
  }

  // Handle back to grid view
  const handleBackToGrid = () => {
    setCurrentView('grid');
    setSelectedContent(null);
  };

  // Filter articles based on topic and search query
  useEffect(() => {
    let filtered = allArticles;

    if (selectedTopic !== 'All') {
      filtered = filtered.filter(article => article.topic === selectedTopic);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.topic.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredArticles(filtered);
  }, [selectedTopic, searchQuery]);

  // Scroll to section smoothly
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle search input
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Clear search query
  const handleClearSearch = () => {
    setSearchQuery('');
  };

  // Handle article click
  const handleArticleClick = (articleId: number) => {
    const article = allArticles.find(a => a.id === articleId);
    if (article) {
      setSelectedContent({
        id: String(article.id),
        title: article.title,
        content: article.fullContent,
        date: article.date,
        readTime: article.readTime,
        type: 'article',
        image: article.image,
      });
      setCurrentView('content');
    } else {
      toast({
        title: "Article not found",
        description: "Sorry, this article could not be found.",
      });
    }
  };

  // Render content page if selected
  if (currentView === 'content' && selectedContent) {
    return (
      <ContentPage
        {...selectedContent}
        onBack={handleBackToGrid}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100"
      >
        <Navigation onSectionClick={scrollToSection} />
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        id="hero"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="relative flex items-center justify-center py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50 border-b border-gray-100"
      >
        <div className="container max-w-3xl mx-auto px-4 text-center">
          <motion.h1
            variants={sectionVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight mb-2 text-gray-900 font-sans"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            MakerStack
          </motion.h1>
          <motion.p
            variants={sectionVariants}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-gray-600 mb-6 max-w-xl mx-auto font-light"
          >
            Premium insights, tools, and frameworks to empower makers building the future
          </motion.p>
          <motion.div
            variants={sectionVariants}
            transition={{ delay: 0.4 }}
            className="max-w-md mx-auto"
          >
            <NewsletterSignup variant="hero" className="w-full" />
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Section */}
      <motion.section
        id="featured"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-10 sm:py-14 md:py-18 bg-white border-b border-gray-100"
      >
        <div className="container max-w-5xl mx-auto px-4">
          <motion.div variants={sectionVariants} className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-2 text-gray-900 font-sans">Featured</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto font-light">
              Curated resources and insights for ambitious makers
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {bentoCards.slice(0, 3).map((card, index) => (
              <motion.div
                key={card.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  onClick={() => card.onClick?.(card.id)}
                  className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden group flex flex-col h-full"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <CardContent className="p-5 flex-1 flex flex-col justify-between">
                    <h3 className="text-lg sm:text-xl font-medium mb-2 text-gray-900 group-hover:text-gray-700 transition-colors font-sans">
                      {card.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-0 line-clamp-2 font-light">{card.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400 mt-4">
                      <span>{card.date}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Playbooks Section - Bento Layout */}
      <motion.section
        id="playbooks"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-10 sm:py-14 md:py-18 bg-gray-50 border-b border-gray-100"
      >
        <div className="container max-w-5xl mx-auto px-4">
          <motion.div variants={sectionVariants} className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-2 text-gray-900 font-sans">Playbooks</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto font-light">
              Comprehensive guides and frameworks for makers
            </p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            {/* Main Playbook */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              className="lg:col-span-3"
            >
              <Card className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer h-full flex flex-col">
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={playbookCover}
                    alt="SaaS Launch Playbook"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-6 flex-1 flex flex-col justify-between">
                  <h3 className="text-lg sm:text-xl font-medium mb-2 text-gray-900 group-hover:text-gray-700 transition-colors font-sans">
                    The Complete SaaS Launch Playbook
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-0 line-clamp-3 font-light">
                    From idea validation to first paying customers. A comprehensive guide covering market research, MVP development, pricing strategy, and growth tactics.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            {/* Sub Playbooks and Trending Topics */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              <div className="flex flex-col gap-4">
                {[{ title: "Product Hunt Launch Guide", pages: "24" }, { title: "No-Code MVP Builder", pages: "36" }, { title: "Maker Marketing Toolkit", pages: "28" }].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer">
                      <CardContent className="p-4 flex items-center space-x-4">
                        <div className="bg-gray-100 rounded-xl w-10 h-10 flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300">
                          <FileText className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="text-sm sm:text-base font-medium text-gray-900 group-hover:text-gray-700 transition-colors font-sans">
                            {item.title}
                          </h4>
                          <p className="text-xs text-gray-500">{item.pages} pages</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                transition={{ delay: 0.3 }}
              >
                <Card className="bg-white border border-gray-100 rounded-xl shadow-sm p-4">
                  <h3 className="text-base sm:text-lg font-medium mb-3 text-gray-900 font-sans">Trending Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {topics.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedTopic(item.name)}
                        className="px-3 py-1 rounded-full bg-gray-50 hover:bg-gray-100 text-xs font-medium text-gray-800 border border-gray-200 transition-colors duration-200"
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Tools Section - Bento Layout */}
      <motion.section
        id="tools"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-10 sm:py-14 md:py-18 bg-white border-b border-gray-100"
      >
        <div className="container max-w-5xl mx-auto px-4">
          <motion.div variants={sectionVariants} className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-2 text-gray-900 font-sans">Curated Tools</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto font-light">
              Streamline your building process with powerful utilities
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Stack Builder", description: "Curate and compare tech stacks for your next project", category: "Development" },
              { title: "Analytics Dashboard", description: "Track your product metrics and user engagement", category: "Analytics" },
              { title: "API Explorer", description: "Discover and test APIs for your applications", category: "Development" }
            ].map((tool, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer h-full flex flex-col">
                  <CardContent className="p-6 flex-1 flex flex-col justify-between">
                    <h3 className="text-base sm:text-lg font-medium mb-2 text-gray-900 group-hover:text-gray-700 transition-colors font-sans">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 font-light">{tool.description}</p>
                    <span className="inline-block bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-full px-3 py-1 font-medium self-start">{tool.category}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Income Reports Section - Bento Layout */}
      <motion.section
        id="income-reports"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-10 sm:py-14 md:py-18 bg-gray-50 border-b border-gray-100"
      >
        <div className="container max-w-5xl mx-auto px-4">
          <motion.div variants={sectionVariants} className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-2 text-gray-900 font-sans">Income Reports</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto font-light">
              Transparent financial insights from the maker community
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { label: 'Indie SaaS (example.com)', value: '$12,400/mo', source: 'Public Revenue' },
              { label: 'YouTube Channel (TechGuru)', value: '$3,200/mo', source: 'Social Blade' },
              { label: 'Newsletter (GrowthDaily)', value: '$1,800/mo', source: 'Self-Reported' },
              { label: 'E-commerce (Shoply)', value: '$22,900/mo', source: 'BuiltWith' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer h-full flex flex-col">
                  <CardContent className="p-6 text-center flex-1 flex flex-col justify-center">
                    <div className="text-base sm:text-lg font-medium mb-2 text-gray-900 font-sans">{stat.label}</div>
                    <div className="text-xl sm:text-2xl font-light mb-2 text-gray-900">{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.source}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Latest Articles - Bento Layout */}
      <motion.section
        id="latest"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-10 sm:py-14 md:py-18 bg-white"
      >
        <div className="container max-w-5xl mx-auto px-4">
          <motion.div variants={sectionVariants} className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-2 text-gray-900 font-sans">Latest Content</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto font-light">
              Fresh insights and tutorials from the maker community
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                transition={{ delay: index * 0.1 }}
                onClick={() => handleArticleClick(article.id)}
                className="cursor-pointer"
              >
                <Card className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group h-full flex flex-col">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <CardContent className="p-5 flex-1 flex flex-col justify-between">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-block bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-full px-3 py-1 font-medium">{article.topic}</span>
                      <span className="text-xs text-gray-400">{article.date}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-medium mb-2 text-gray-900 group-hover:text-gray-700 transition-colors font-sans">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 font-light line-clamp-2 mb-0">{article.excerpt}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          {filteredArticles.length === 0 && searchQuery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-base sm:text-lg text-gray-600">No articles found matching "{searchQuery}"</p>
              <Button
                onClick={handleClearSearch}
                variant="outline"
                className="mt-4 border-gray-300 text-gray-700 hover:bg-gray-100 rounded-full text-sm"
              >
                Clear Search
              </Button>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Newsletter Subscription Section */}
      <motion.section
        id="subscribe"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16 sm:py-20 md:py-24 bg-gray-50"
      >
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div variants={sectionVariants} className="max-w-md mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight mb-4 text-gray-900">
              Join the Community
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-8 font-light">
              Get weekly insights, tools, and resources delivered to your inbox
            </p>
            <NewsletterSignup variant="footer" className="w-full" />
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h4 className="text-base sm:text-lg font-medium mb-4 text-gray-900">MakerStack</h4>
              <p className="text-xs sm:text-sm text-gray-600">
                Empowering makers with premium insights, tools, and community.
              </p>
            </motion.div>
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h4 className="text-base sm:text-lg font-medium mb-4 text-gray-900">Content</h4>
              <div className="space-y-2">
                <a href="#featured" className="block text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Featured
                </a>
                <a href="#playbooks" className="block text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Playbooks
                </a>
                <a href="#tools" className="block text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Tools
                </a>
                <a
                  href="#income-reports"
                  className="block text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Income Reports
                </a>
              </div>
            </motion.div>
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h4 className="text-base sm:text-lg font-medium mb-4 text-gray-900">Community</h4>
              <div className="space-y-2">
                <a href="#" className="block text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Discord
                </a>
                <a href="#" className="block text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Twitter
                </a>
                <a href="#" className="block text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  GitHub
                </a>
                <a href="#" className="block text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Newsletter
                </a>
              </div>
            </motion.div>
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h4 className="text-base sm:text-lg font-medium mb-4 text-gray-900">Company</h4>
              <div className="space-y-2">
                <a href="#" className="block text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  About
                </a>
                <a href="#" className="block text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Privacy
                </a>
                <a href="#" className="block text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Terms
                </a>
                <a href="#" className="block text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Contact
                </a>
              </div>
            </motion.div>
          </div>
          <div className="border-t border-gray-100 pt-8 text-center">
            <p className="text-xs sm:text-sm text-gray-500">© 2025 MakerStack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;