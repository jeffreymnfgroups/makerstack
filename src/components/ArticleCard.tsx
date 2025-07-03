import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

interface ArticleCardProps {
  title: string;
  topic: string;
  date: string;
  image?: string;
  searchQuery?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  topic,
  date,
  image,
  searchQuery
}) => {
  return (
    <Card 
      className="bg-white border border-gray-200 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 cursor-pointer"
      role="article"
      tabIndex={0}
    >
      {image && (
        <div className="aspect-[16/9] overflow-hidden rounded-t-3xl">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      )}
      <CardContent className="p-6">
        <Badge className="w-fit mb-3 bg-gray-100 text-gray-700 border-gray-200 rounded-full px-3 py-1 text-xs">
          {topic}
        </Badge>
        <h3 className="text-lg font-semibold mb-3 group-hover:text-gray-600 transition-colors line-clamp-2 text-gray-900">
          {title}
        </h3>
        <div className="text-xs text-gray-500 mt-2">{date}</div>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;