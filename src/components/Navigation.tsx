import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface NavigationProps {
  onSectionClick: (sectionId: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ onSectionClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    {
      name: 'Featured',
      id: 'featured',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Latest Articles', id: 'featured', description: 'Most recent insights and tutorials' },
        { name: 'Editor\'s Picks', id: 'featured', description: 'Handpicked content by our team' },
        { name: 'Trending Now', id: 'featured', description: 'Popular content this week' },
        { name: 'Deep Dives', id: 'featured', description: 'Comprehensive technical guides' }
      ]
    },
    {
      name: 'Playbooks',
      id: 'playbooks',
      hasDropdown: true,
      dropdownItems: [
        { name: 'SaaS Launch Guide', id: 'playbooks', description: 'Complete launch strategy framework' },
        { name: 'Product Hunt Kit', id: 'playbooks', description: 'Everything for a successful PH launch' },
        { name: 'No-Code MVP Builder', id: 'playbooks', description: 'Build without coding knowledge' },
        { name: 'Growth Marketing', id: 'playbooks', description: 'Proven growth tactics and strategies' },
        { name: 'Fundraising Toolkit', id: 'playbooks', description: 'Pitch decks and investor guides' }
      ]
    },
    {
      name: 'Tools',
      id: 'tools',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Stack Builder', id: 'tools', description: 'Choose the perfect tech stack' },
        { name: 'Analytics Dashboard', id: 'tools', description: 'Track your key metrics' },
        { name: 'Market Validator', id: 'tools', description: 'Validate your product ideas' },
        { name: 'API Explorer', id: 'tools', description: 'Discover and test APIs' },
        { name: 'Design System Generator', id: 'tools', description: 'Create consistent design languages' },
        { name: 'Automation Builder', id: 'tools', description: 'Build workflows without code' }
      ]
    },
    {
      name: 'Reports',
      id: 'reports',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Growth Metrics', id: 'reports', description: 'Community and revenue insights' },
        { name: 'Industry Trends', id: 'reports', description: 'Market analysis and forecasts' },
        { name: 'Maker Insights', id: 'reports', description: 'Creator economy statistics' },
        { name: 'Tool Reviews', id: 'reports', description: 'Comprehensive tool comparisons' }
      ]
    }
  ];

  const handleMouseEnter = (itemName: string) => {
    setActiveDropdown(itemName);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const handleDropdownItemClick = (id: string) => {
    setActiveDropdown(null);
    onSectionClick(id);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm' 
        : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <div className="container-premium flex items-center justify-between h-16">
        <div className="text-xl font-semibold tracking-tight text-gray-900">MakerStack</div>
        
        <div className="hidden md:flex items-center space-x-1">
          {navigationItems.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.name)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => onSectionClick(item.id)}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 rounded-lg hover:bg-gray-100"
                aria-expanded={activeDropdown === item.name}
                aria-haspopup={item.hasDropdown}
              >
                {item.name}
                {item.hasDropdown && (
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                    activeDropdown === item.name ? 'rotate-180' : ''
                  }`} />
                )}
              </button>
              
              {item.hasDropdown && activeDropdown === item.name && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl py-2 animate-in fade-in-0 slide-in-from-top-2 duration-200">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  </div>
                  {item.dropdownItems?.map((dropdownItem) => (
                    <button
                      key={dropdownItem.name}
                      onClick={() => handleDropdownItemClick(dropdownItem.id)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-150 group"
                    >
                      <div className="font-medium text-gray-900 group-hover:text-gray-700">
                        {dropdownItem.name}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {dropdownItem.description}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <Button 
          onClick={() => onSectionClick('subscribe')}
          className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
        >
          Subscribe
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;