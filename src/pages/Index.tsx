import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ArrowDown, FileText, BarChart3, TrendingUp, Users, Download, Zap, Code, Layers, Palette, Rocket, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Components
import Navigation from '@/components/Navigation';
import SearchBar from '@/components/SearchBar';
import ArticleCard from '@/components/ArticleCard';
import NewsletterSignup from '@/components/NewsletterSignup';
import BentoGrid, { BentoCardProps } from '@/components/BentoGrid';
import ContentPage from '@/components/ContentPage';

// Assets
import author1 from '@/assets/author-1.jpg';
import author2 from '@/assets/author-2.jpg';
import playbookCover from '@/assets/playbook-1.jpg';

// Define types for articles and content
interface Article {
  id: number;
  title: string;
  excerpt: string;
  fullContent: string;
  author: string;
  date: string;
  topic: string;
  readTime: string;
  image: string;
}

interface Content {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  type: 'article' | 'tool';
  image: string;
}

const Index = () => {
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [currentView, setCurrentView] = useState<'grid' | 'content'>('grid');
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Content data
  const contentData = {
    '1': {
      id: '1',
      title: 'Building Scalable SaaS Architecture',
      content: `Building a scalable SaaS architecture is one of the most critical decisions you'll make as a founder. The choices you make early on will determine whether your application can handle 10 users or 10 million users.

In this comprehensive guide, we'll explore the fundamental principles that separate successful SaaS platforms from those that crumble under growth. From microservices architecture to database sharding strategies, we'll cover everything you need to know.

The first principle is designing for horizontal scalability from day one. This means building your application in a way that allows you to add more servers rather than upgrading existing ones. This approach is not only more cost-effective but also provides better fault tolerance.

Database design is another crucial aspect. We'll explore how companies like Stripe and Shopify handle millions of transactions by implementing proper indexing, read replicas, and eventual consistency patterns.

Caching strategies can make or break your application's performance. We'll dive deep into Redis implementations, CDN strategies, and application-level caching that can reduce your database load by 90%.

Finally, we'll cover monitoring and observability. You can't scale what you can't measure. We'll show you how to implement proper logging, metrics, and alerting systems that will help you identify bottlenecks before they become problems.`,
      author: 'Marcus Johnson',
      date: 'Dec 12, 2024',
      readTime: '12 min read',
      type: 'article' as const,
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop'
    },
    '2': {
      id: '2',
      title: 'Product-Led Growth Strategies',
      content: `Product-led growth (PLG) has become the dominant go-to-market strategy for the world's fastest-growing SaaS companies. Unlike traditional sales-led approaches, PLG puts the product at the center of customer acquisition, activation, and expansion.

The core principle of PLG is simple: create a product so good that it sells itself. But executing this strategy requires careful planning and deep understanding of user psychology and behavior.

First, you need to identify your product's "aha moment" - the point where users realize the value of your product. For Slack, it's when a team sends 2,000 messages. For Dropbox, it's when a user puts files in one folder and sees them appear on another device.

The onboarding experience is crucial. You have minutes, not hours, to demonstrate value. We'll explore how companies like Notion and Figma design their onboarding flows to get users to their aha moment as quickly as possible.

Freemium models are often central to PLG strategies, but they must be carefully designed. The free tier should provide real value while creating natural upgrade paths. We'll analyze successful freemium models and common pitfalls to avoid.

Viral loops and network effects can accelerate growth exponentially. We'll examine how products like Loom and Calendly built sharing mechanisms directly into their core workflows, turning every user into a potential acquisition channel.`,
      author: 'Elena Rodriguez',
      date: 'Dec 10, 2024',
      readTime: '15 min read',
      type: 'article' as const,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop'
    },
    '3': {
      id: '3',
      title: 'Stack Builder Tool',
      content: `The Stack Builder is an intelligent tool designed to help developers and founders choose the perfect technology stack for their projects. Making the right technology choices early can save months of development time and prevent costly rewrites down the road.

Our tool analyzes your project requirements, team expertise, scalability needs, and budget constraints to recommend the optimal combination of technologies. Whether you're building a simple MVP or a complex enterprise application, Stack Builder provides personalized recommendations.

The tool covers frontend frameworks (React, Vue, Angular), backend technologies (Node.js, Python, Go), databases (PostgreSQL, MongoDB, Redis), cloud providers (AWS, GCP, Azure), and deployment strategies (Docker, Kubernetes, serverless).

Each recommendation comes with detailed explanations, pros and cons, learning resources, and real-world examples of companies using similar stacks. You'll also get cost estimates and performance benchmarks to help make informed decisions.

The Stack Builder integrates with popular development tools and can generate starter templates, configuration files, and deployment scripts based on your chosen stack. This eliminates the tedious setup work and gets you coding faster.

Advanced features include team collaboration, stack comparison matrices, and integration with project management tools. You can save multiple stack configurations, share them with your team, and track decisions over time.`,
      author: 'Alex Chen',
      date: 'Dec 14, 2024',
      readTime: '8 min read',
      type: 'tool' as const,
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=1200&h=600&fit=crop'
    }
  };

  const bentoCards: BentoCardProps[] = [
    {
      id: '1',
      title: 'Building Scalable SaaS Architecture',
      description: 'Master the art of building applications that can handle millions of users while maintaining performance and reliability.',
      size: 'large',
      type: 'featured',
      author: 'Marcus Johnson',
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
      author: 'Elena Rodriguez',
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
      icon: <Code className="h-6 w-6 text-gray-600" />,
      onClick: handleCardClick
    },
    {
      id: '4',
      title: 'Design Systems',
      description: 'Create consistent, scalable design languages.',
      size: 'medium',
      type: 'article',
      icon: <Palette className="h-5 w-5 text-gray-600" />,
      onClick: handleCardClick
    },
    {
      id: '5',
      title: 'Launch Playbook',
      description: 'Step-by-step guide to launching your SaaS.',
      size: 'medium',
      type: 'playbook',
      icon: <Rocket className="h-5 w-5 text-gray-600" />,
      onClick: handleCardClick
    },
    {
      id: '6',
      title: 'Growth Analytics',
      description: 'Track and optimize your key metrics.',
      size: 'medium',
      type: 'tool',
      icon: <BarChart3 className="h-5 w-5 text-gray-600" />,
      onClick: handleCardClick
    },
    {
      id: '7',
      title: 'User Research Guide',
      description: 'Learn how to conduct effective user interviews and surveys.',
      size: 'medium',
      type: 'article',
      author: 'Sarah Kim',
      readTime: '10 min read',
      date: 'Dec 8, 2024',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
      onClick: handleCardClick
    },
    {
      id: '8',
      title: 'Pricing Strategy',
      description: 'Optimize your pricing for maximum growth.',
      size: 'medium',
      type: 'article',
      icon: <Target className="h-5 w-5 text-gray-600" />,
      onClick: handleCardClick
    }
  ];

  const allArticles = [
    {
      id: 1,
      title: "Building Scalable SaaS Architecture",
      excerpt: "Modern patterns for building resilient, scalable applications",
      fullContent: "In this comprehensive guide, we'll explore the fundamental principles of building scalable SaaS architecture...",
      author: "Marcus Johnson",
      date: "Dec 12, 2024",
      topic: "Development",
      readTime: "8 min",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop"
    },
    {
      id: 2,
      title: "Product-Led Growth Strategies",
      excerpt: "How to build products that sell themselves through user experience",
      fullContent: "Product-led growth is revolutionizing how companies acquire, activate, and retain customers...",
      author: "Elena Rodriguez", 
      date: "Dec 10, 2024",
      topic: "Product",
      readTime: "12 min",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop"
    },
    {
      id: 3,
      title: "Design Systems at Scale",
      excerpt: "Creating consistent, maintainable design languages for growing teams",
      fullContent: "As your team grows, maintaining design consistency becomes increasingly challenging...",
      author: "Sarah Chen",
      date: "Dec 8, 2024",
      topic: "Design",
      readTime: "10 min",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=450&fit=crop"
    }
  ];

  const topics = [
    { name: "All", count: 541 },
    { name: "Development", count: 142 },
    { name: "Design", count: 98 },
    { name: "Product", count: 76 },
    { name: "Growth", count: 54 },
    { name: "Analytics", count: 89 },
    { name: "Strategy", count: 67 },
    { name: "Marketing", count: 43 },
    { name: "Startup", count: 32 }
  ];

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

  const handleBackToGrid = () => {
    setCurrentView('grid');
    setSelectedContent(null);
  };

  useEffect(() => {
    let filtered = allArticles;

    if (selectedTopic !== 'All') {
      filtered = filtered.filter(article => article.topic === selectedTopic);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredArticles(filtered);
  }, [selectedTopic, searchQuery]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleArticleClick = (articleId: number) => {
    const article = allArticles.find(a => a.id === articleId);
    if (article) {
      setSelectedContent({
        id: String(article.id),
        title: article.title,
        content: article.fullContent,
        author: article.author,
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

  // Show content page if selected
  if (currentView === 'content' && selectedContent) {
    return (
      <ContentPage
        {...selectedContent}
        onBack={handleBackToGrid}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Navigation */}
      <Navigation onSectionClick={scrollToSection} />

      {/* Hero Section */}
      <section className="relative flex items-center justify-center pt-32 pb-20 bg-gradient-to-br from-gray-50 to-gray-200">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-extralight tracking-tight leading-tight mb-6 text-gray-900">
            MakerStack
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto font-light">
            Premium insights, tools, and frameworks to empower makers building the future
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button 
              onClick={() => scrollToSection('featured')}
              variant="default"
              className="px-10 py-4 rounded-full text-lg font-medium bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300 shadow-lg"
            >
              Explore Content
            </Button>
            <Button
              onClick={() => navigate('/articledetail')}
              variant="outline"
              className="px-10 py-4 rounded-full text-lg font-medium border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
            >
              View Article Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Bento Grid Section */}
      <section id="featured" className="py-20 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-gray-900">Featured Content</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
              Curated resources and insights for ambitious makers
            </p>
          </div>
          {/* Topic Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {topics.slice(0, 6).map((topic) => (
              <button
                key={topic.name}
                onClick={() => setSelectedTopic(topic.name)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedTopic === topic.name
                    ? 'bg-gray-900 text-white shadow-md'
                    : 'bg-white hover:bg-gray-100 text-gray-700 hover:text-gray-900 border border-gray-200'
                }`}
                aria-pressed={selectedTopic === topic.name}
              >
                {topic.name} ({topic.count})
              </button>
            ))}
          </div>
          {/* Bento Grid */}
          <BentoGrid 
            cards={bentoCards} 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px] md:auto-rows-[300px]"
          />
        </div>
      </section>

      {/* Playbooks Section */}
      <section id="playbooks" className="py-20 bg-white">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-gray-900">Maker Playbooks</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
              Comprehensive guides and frameworks from successful makers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[200px] md:auto-rows-[250px]">
            {/* Main Playbook Card */}
            <div className="lg:col-span-2 lg:row-span-2">
              <Card className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 group overflow-hidden hover:-translate-y-2 cursor-pointer h-full flex flex-col">
                <div className="aspect-[16/9] overflow-hidden relative">
                  <img 
                    src={playbookCover} 
                    alt="SaaS Launch Playbook"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-gray-900">
                    Premium
                  </div>
                </div>
                <CardContent className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-semibold mb-4 group-hover:text-gray-700 transition-colors text-gray-900">
                    The Complete SaaS Launch Playbook
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed flex-1">
                    From idea validation to first paying customers. A comprehensive guide covering market research, MVP development, pricing strategy, and growth tactics.
                  </p>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm text-gray-500">4.2k downloads</span>
                    <Badge className="bg-gray-100 text-gray-800 border-gray-200">142 pages</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* Sub-cards */}
            {[
              { title: "Product Hunt Launch Guide", downloads: "1.8k", pages: "24" },
              { title: "No-Code MVP Builder", downloads: "2.1k", pages: "36" },
              { title: "Maker Marketing Toolkit", downloads: "1.5k", pages: "28" }
            ].map((item, index) => (
              <div key={index} className="lg:col-span-1 lg:row-span-1">
                <Card className="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 cursor-pointer h-full flex flex-col">
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="bg-gray-100 rounded-xl w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-gray-200 transition-colors duration-300">
                      <FileText className="h-6 w-6 text-gray-600" />
                    </div>
                    <h4 className="font-semibold mb-2 group-hover:text-gray-700 transition-colors text-gray-900">{item.title}</h4>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{item.downloads} downloads</span>
                      <span>{item.pages} pages</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
            {/* Trending Topics */}
            <div className="lg:col-span-1 lg:row-span-3">
              <Card className="bg-white border border-gray-200 rounded-3xl shadow-lg sticky top-24 h-full flex flex-col">
                <CardContent className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold mb-6 text-gray-900">Trending Maker Topics</h3>
                  <div className="space-y-6 flex-1">
                    {[
                      { topic: "SaaS Development", engagement: 94 },
                      { topic: "Indie Maker Trends", engagement: 87 },
                      { topic: "No-Code Solutions", engagement: 82 },
                      { topic: "Growth Hacking", engagement: 79 },
                      { topic: "Pricing Strategies", engagement: 76 }
                    ].map((item, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedTopic(item.topic)}
                        className="w-full flex flex-col p-3 rounded-xl hover:bg-gray-50 transition-colors duration-300 cursor-pointer group text-left"
                        aria-label={`View ${item.topic} articles`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium group-hover:text-gray-700 transition-colors text-gray-900">{item.topic}</p>
                          <TrendingUp className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="text-sm text-gray-500 mb-1">{item.engagement}% engagement</div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${item.engagement}%` }} />
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-20 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-gray-900">Maker Tools</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
              Streamline your building process with powerful utilities
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Layers className="h-10 w-10" />,
                title: "Stack Builder",
                description: "Curate and compare tech stacks for your next project",
                status: "New"
              },
              {
                icon: <BarChart3 className="h-10 w-10" />,
                title: "Analytics Dashboard",
                description: "Track your product metrics and user engagement",
                status: "Popular"
              },
              {
                icon: <Code className="h-10 w-10" />,
                title: "API Explorer",
                description: "Discover and test APIs for your applications",
                status: "Featured"
              },
              {
                icon: <Zap className="h-10 w-10" />,
                title: "Automation Builder",
                description: "Create workflows without writing code",
                status: "Premium"
              },
              {
                icon: <FileText className="h-10 w-10" />,
                title: "Documentation Generator",
                description: "Auto-generate docs from your codebase",
                status: "Beta"
              },
              {
                icon: <Users className="h-10 w-10" />,
                title: "Team Collaboration Hub",
                description: "Coordinate projects with your team members",
                status: "Coming Soon"
              }
            ].map((tool, index) => (
              <Card key={index} className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 group text-center hover:-translate-y-1 cursor-pointer">
                <CardContent className="p-8">
                  <div className="relative">
                    <div className="bg-gray-100 rounded-3xl w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-200 group-hover:scale-105 transition-all duration-300">
                      <div className="text-gray-600">
                        {tool.icon}
                      </div>
                    </div>
                    <Badge className="absolute -top-2 -right-2 bg-gray-100 text-gray-800 border-gray-200 rounded-full text-xs">
                      {tool.status}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-gray-700 transition-colors text-gray-900">{tool.title}</h3>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    {tool.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Income Reports Section */}
      <section id="income-reports" className="py-20 bg-white">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-gray-900">Income Reports</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
              Transparent financial insights from the maker community
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                label: 'Indie SaaS (example.com)',
                value: '$12,400/mo',
                source: 'Public Revenue',
                trend: '+8.2%',
                icon: <BarChart3 className="h-6 w-6 text-green-600" />,
              },
              {
                label: 'YouTube Channel (TechGuru)',
                value: '$3,200/mo',
                source: 'Social Blade',
                trend: '+3.1%',
                icon: <TrendingUp className="h-6 w-6 text-blue-600" />,
              },
              {
                label: 'Newsletter (GrowthDaily)',
                value: '$1,800/mo',
                source: 'Self-Reported',
                trend: '+5.7%',
                icon: <Users className="h-6 w-6 text-purple-600" />,
              },
              {
                label: 'E-commerce (Shoply)',
                value: '$22,900/mo',
                source: 'BuiltWith',
                trend: '+12.4%',
                icon: <Rocket className="h-6 w-6 text-pink-600" />,
              },
            ].map((stat, idx) => (
              <Card key={idx} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4">{stat.icon}</div>
                  <div className="text-lg font-semibold mb-1 text-gray-900">{stat.label}</div>
                  <div className="text-3xl font-light mb-2 text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-500 mb-1">{stat.source}</div>
                  <div className="text-sm flex items-center justify-center text-green-600 font-medium">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {stat.trend}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-20 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-gray-900">Latest Articles</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
              Fresh insights and tutorials from the maker community
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <div key={article.id} onClick={() => handleArticleClick(article.id)} style={{ cursor: 'pointer' }}>
                <ArticleCard
                  title={article.title}
                  topic={article.topic}
                  date={article.date}
                  image={article.image}
                  searchQuery={searchQuery}
                />
              </div>
            ))}
          </div>
          {filteredArticles.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No articles found matching "{searchQuery}"
              </p>
              <Button 
                onClick={handleClearSearch}
                variant="outline"
                className="mt-4 border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Subscription Section */}
      <section id="subscribe" className="py-20 bg-white">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-gray-900">Join the Community</h2>
            <p className="text-xl text-gray-600 mb-8 font-light">
              Get weekly insights, tools, and resources delivered to your inbox
            </p>
            <NewsletterSignup variant="footer" className="max-w-md mx-auto" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-xl font-semibold mb-4 text-gray-900">MakerStack</div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Empowering makers with premium insights, tools, and community.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Content</h4>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('featured')} className="block text-gray-600 hover:text-gray-900 transition-colors text-sm">Articles</button>
                <button onClick={() => scrollToSection('playbooks')} className="block text-gray-600 hover:text-gray-900 transition-colors text-sm">Playbooks</button>
                <button onClick={() => scrollToSection('tools')} className="block text-gray-600 hover:text-gray-900 transition-colors text-sm">Tools</button>
                <button onClick={() => scrollToSection('income-reports')} className="block text-gray-600 hover:text-gray-900 transition-colors text-sm">Reports</button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Community</h4>
              <div className="space-y-2">
                <button className="block text-gray-600 hover:text-gray-900 transition-colors text-sm">Discord</button>
                <button className="block text-gray-600 hover:text-gray-900 transition-colors text-sm">Twitter</button>
                <button className="block text-gray-600 hover:text-gray-900 transition-colors text-sm">GitHub</button>
                <button className="block text-gray-600 hover:text-gray-900 transition-colors text-sm">Newsletter</button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Company</h4>
              <div className="space-y-2">
                <button className="block text-gray-600 hover:text-gray-900 transition-colors text-sm">About</button>
                <button className="block text-gray-600 hover:text-gray-900 transition-colors text-sm">Privacy</button>
                <button className="block text-gray-600 hover:text-gray-900 transition-colors text-sm">Terms</button>
                <button className="block text-gray-600 hover:text-gray-900 transition-colors text-sm">Contact</button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © 2025 MakerStack. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;