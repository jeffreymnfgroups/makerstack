import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, User } from 'lucide-react';

interface BentoCardProps {
  id: string;
  title: string;
  description: string;
  image?: string;
  icon?: React.ReactNode;
  size: 'small' | 'medium' | 'large';
  type: 'article' | 'tool' | 'playbook' | 'featured';
  author?: string;
  readTime?: string;
  date?: string;
  onClick: (id: string) => void;
}

interface BentoGridProps {
  cards: BentoCardProps[];
  className?: string;
}

const BentoCard: React.FC<BentoCardProps> = ({
  id,
  title,
  description,
  image,
  icon,
  size,
  type,
  author,
  readTime,
  date,
  onClick
}) => {
  const sizeClasses = {
    small: 'col-span-1 row-span-1',
    medium: 'col-span-1 md:col-span-2 row-span-1',
    large: 'col-span-1 md:col-span-2 lg:col-span-3 row-span-2'
  };

  const typeColors = {
    article: 'bg-gray-100 text-gray-800 border-gray-200',
    tool: 'bg-gray-900 text-white border-gray-800',
    playbook: 'bg-white text-gray-900 border-gray-300',
    featured: 'bg-black text-white border-gray-900'
  };

  return (
    <Card 
      className={`
        ${sizeClasses[size]} 
        group cursor-pointer overflow-hidden
        bg-white border border-gray-200
        hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]
        transition-all duration-500 ease-out
        rounded-3xl
      `}
      onClick={() => onClick(id)}
    >
      <div className="h-full flex flex-col">
        {/* Image Section */}
        {image && (
          <div className="aspect-video overflow-hidden relative">
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        )}

        <CardContent className="p-6 flex-1 flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <Badge className={`${typeColors[type]} rounded-full px-3 py-1 text-xs font-medium`}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Badge>
              {icon && !image && (
                <div className="p-2 bg-gray-100 rounded-xl">
                  {icon}
                </div>
              )}
            </div>

            {/* Title */}
            <h3 className={`
              font-semibold mb-3 line-clamp-2 group-hover:text-gray-600 transition-colors text-gray-900
              ${size === 'large' ? 'text-2xl md:text-3xl' : size === 'medium' ? 'text-xl' : 'text-lg'}
            `}>
              {title}
            </h3>

            {/* Description */}
            <p className={`
              leading-relaxed mb-6 line-clamp-3 text-gray-600
              ${size === 'large' ? 'text-base' : 'text-sm'}
            `}>
              {description}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {author && (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {author}
                    </p>
                    {date && readTime && (
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>{date}</span>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{readTime}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="rounded-full p-2 text-gray-600 hover:bg-gray-900 hover:text-white transition-all duration-300 hover:scale-110"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

const BentoGrid: React.FC<BentoGridProps> = ({ cards, className = '' }) => {
  return (
    <div className={`
      grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6
      gap-6 auto-rows-[200px]
      ${className}
    `}>
      {cards.map((card) => (
        <BentoCard key={card.id} {...card} />
      ))}
    </div>
  );
};

export default BentoGrid;
export type { BentoCardProps };