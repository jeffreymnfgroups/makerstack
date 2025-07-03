import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onClear: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onClear }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery.trim()) {
        onSearch(searchQuery);
      } else {
        onClear();
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, onSearch, onClear]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    onClear();
    setIsActive(false);
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
      <div className={`relative transition-all duration-300 ${
        isActive ? 'scale-105' : ''
      }`}>
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search articles, playbooks, and tools..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
          className="pl-12 pr-20 py-6 text-lg rounded-2xl border-gray-300 bg-white shadow-lg focus:shadow-xl transition-all duration-300"
          aria-label="Search content"
        />
        {searchQuery && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-12 top-1/2 transform -translate-y-1/2 rounded-full hover:bg-gray-100"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        <Button 
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-xl bg-gray-900 hover:bg-gray-800"
          size="sm"
          disabled={!searchQuery.trim()}
        >
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;