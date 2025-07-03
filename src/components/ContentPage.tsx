import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, User, Share2, Bookmark, Download } from 'lucide-react';

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
  type,
  image,
  onBack
}) => {
  const typeColors = {
    article: 'bg-gray-100 text-gray-800 border-gray-200',
    tool: 'bg-gray-900 text-white border-gray-800',
    playbook: 'bg-white text-gray-900 border-gray-300',
    featured: 'bg-black text-white border-gray-900'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to MakerStack</span>
            </Button>
            
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="rounded-full hover:bg-gray-100">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full hover:bg-gray-100">
                <Bookmark className="h-4 w-4" />
              </Button>
              {type === 'playbook' && (
                <Button size="sm" className="rounded-full bg-gray-900 hover:bg-gray-800 text-white">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-6 py-4">
        <nav className="flex items-center space-x-2 text-sm text-gray-500">
          <button onClick={onBack} className="hover:text-gray-700 transition-colors">Home</button>
          <span>/</span>
          <span className="text-gray-900 capitalize">{type}</span>
        </nav>
      </div>

      {/* Hero Image */}
      {image && (
        <div className="max-w-4xl mx-auto px-6 mb-8">
          <div className="aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <article className="max-w-4xl mx-auto px-6 pb-16">
        <header className="mb-8">
          <Badge className={`${typeColors[type]} rounded-full px-4 py-2 text-sm font-medium mb-4`}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Badge>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight mb-6 text-gray-900">
            {title}
          </h1>
          
          <div className="flex items-center space-x-6 text-gray-600">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{author}</p>
                <p className="text-sm">{date}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{readTime}</span>
            </div>
          </div>
        </header>

        <div className="prose prose-lg prose-gray max-w-none">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200">
            {content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-6 leading-relaxed text-gray-700 text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Related Actions */}
        <div className="mt-12 p-8 bg-white rounded-3xl shadow-xl border border-gray-200">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">What's next?</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="rounded-full border-gray-300 text-gray-700 hover:bg-gray-100">
              Share this {type}
            </Button>
            <Button variant="outline" className="rounded-full border-gray-300 text-gray-700 hover:bg-gray-100">
              Save for later
            </Button>
            <Button variant="outline" className="rounded-full border-gray-300 text-gray-700 hover:bg-gray-100">
              View similar content
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ContentPage;