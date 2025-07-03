import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Search, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NavigationProps {
  onSectionClick: (sectionId: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ onSectionClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    {
      name: 'Articles',
      id: 'articles',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Latest Stories', id: 'articles', description: 'Recent insights and analysis' },
        { name: 'Deep Dives', id: 'articles', description: 'Comprehensive research reports' },
        { name: 'Quick Reads', id: 'articles', description: 'Bite-sized insights' }
      ]
    },
    {
      name: 'Research',
      id: 'research',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Industry Reports', id: 'research', description: 'Market trends and analysis' },
        { name: 'Case Studies', id: 'research', description: 'Real-world examples' },
        { name: 'Data Insights', id: 'research', description: 'Numbers that matter' }
      ]
    },
    {
      name: 'Events',
      id: 'events',
      hasDropdown: false
    },
    {
      name: 'About',
      id: 'about',
      hasDropdown: false
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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm' 
        : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="text-2xl font-bold text-gray-900">MakerStick</div>
          </div>
          
          {/* Desktop Navigation */}
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
                  className="flex items-center px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors duration-200 rounded-lg hover:bg-gray-100 font-medium"
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
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-xl py-2 animate-in fade-in-0 slide-in-from-top-2 duration-200">
                    {item.dropdownItems?.map((dropdownItem) => (
                      <button
                        key={dropdownItem.name}
                        onClick={() => handleDropdownItemClick(dropdownItem.id)}
                        className="w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors duration-150 group"
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
          
          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              {!isSearchOpen ? (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 rounded-lg hover:bg-gray-100"
                >
                  <Search className="h-5 w-5" />
                </button>
              ) : (
                <div className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSearchSubmit(e);
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="ml-2 p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 rounded-lg hover:bg-gray-100"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
            
            {/* Sign In Button */}
            <Button 
              onClick={() => navigate('/signin')}
              variant="outline"
              className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white hover:border-gray-900 px-4 py-2 rounded-lg font-medium transition-all duration-200"
            >
              Sign In
            </Button>
            
            {/* Subscribe Button */}
            <Button 
              onClick={() => onSectionClick('subscribe')}
              className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Subscribe
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 rounded-lg hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-2 space-y-1">
            {/* Mobile Search */}
            <div className="py-2">
              <div className="flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearchSubmit(e);
                    }
                  }}
                />
              </div>
            </div>
            
            {/* Mobile Navigation Items */}
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  onSectionClick(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200 rounded-lg font-medium"
              >
                {item.name}
              </button>
            ))}
            
            {/* Mobile Action Buttons */}
            <div className="pt-4 space-y-2">
              <Button 
                onClick={() => {
                  navigate('/signin');
                  setIsMobileMenuOpen(false);
                }}
                variant="outline"
                className="w-full border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white hover:border-gray-900 py-2 rounded-lg font-medium transition-all duration-200"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => {
                  onSectionClick('subscribe');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 rounded-lg font-medium transition-all duration-200"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;