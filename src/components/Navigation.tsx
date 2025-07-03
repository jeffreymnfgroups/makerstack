import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Search, Menu, X, Eye, EyeOff, Mail, Lock } from 'lucide-react';

interface NavigationProps {
  onSectionClick: (sectionId: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ onSectionClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  });

  const navigate = (path: string) => {
    console.log(`Navigating to: ${path}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  
  const navigationItems = [
    {
      name: 'Topics',
      id: 'topics',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Marketing', id: 'marketing', description: 'Growth strategies and campaigns' },
        { name: 'Product', id: 'product', description: 'Development and management' },
        { name: 'Sales', id: 'sales', description: 'Revenue and conversion tactics' },
        { name: 'Operations', id: 'operations', description: 'Efficiency and processes' },
      ],
    },
    { name: 'Playbooks', id: 'playbooks', hasDropdown: false },
    { name: 'Tools', id: 'tools', hasDropdown: false },
    { name: 'Resources / Advertise', id: 'resources', hasDropdown: false },
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

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign in data:', signInData);
    setIsSignInModalOpen(false);
    setSignInData({ email: '', password: '' });
  };

  const handleSignInInputChange = (field: string, value: string) => {
    setSignInData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50/30 via-white/20 to-purple-50/30 pointer-events-none" />
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? 'bg-white/20 backdrop-blur-2xl border-b border-white/30 shadow-2xl shadow-black/5'
            : 'bg-white/15 backdrop-blur-xl border-b border-white/20'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/5 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <div className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                MakerStick
              </div>
            </div>

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
                    className="flex items-center px-4 py-2 text-gray-800/90 hover:text-gray-900 transition-all duration-300 rounded-xl hover:bg-white/30 hover:backdrop-blur-md hover:shadow-lg hover:shadow-black/5 font-medium group"
                    aria-expanded={activeDropdown === item.name}
                    aria-haspopup={item.hasDropdown}
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <ChevronDown
                        className={`ml-1 h-4 w-4 transition-all duration-300 group-hover:text-gray-700 ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </button>

                  {item.hasDropdown && activeDropdown === item.name && (
                    <div className="absolute top-full left-0 mt-3 w-72 bg-white/95 backdrop-blur-2xl border border-white/40 rounded-2xl shadow-2xl shadow-black/20 py-3 animate-in fade-in-0 slide-in-from-top-2 duration-300">
                      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/20 to-white/10 rounded-2xl pointer-events-none" />
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-t-2xl" />
                      <div className="absolute inset-0 bg-white/80 rounded-2xl pointer-events-none" />

                      {item.dropdownItems?.map((dropdownItem) => (
                        <button
                          key={dropdownItem.name}
                          onClick={() => handleDropdownItemClick(dropdownItem.id)}
                          className="relative w-full text-left px-5 py-4 hover:bg-white/60 hover:backdrop-blur-md transition-all duration-200 group rounded-xl mx-2 my-1 border border-transparent hover:border-white/30"
                        >
                          <div className="font-semibold text-gray-900 group-hover:text-gray-800">
                            {dropdownItem.name}
                          </div>
                          <div className="text-sm text-gray-700 mt-1 group-hover:text-gray-600">
                            {dropdownItem.description}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                {!isSearchOpen ? (
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="p-2 text-gray-700/80 hover:text-gray-900 transition-all duration-300 rounded-xl hover:bg-white/30 hover:backdrop-blur-md hover:shadow-lg hover:shadow-black/5"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                ) : (
                  <div className="flex items-center bg-white/20 backdrop-blur-md rounded-xl border border-white/30 shadow-lg shadow-black/5 p-1">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="w-full px-3 py-2 bg-transparent text-gray-800 placeholder-gray-600/70 focus:outline-none rounded-lg"
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
                      className="p-2 text-gray-600/80 hover:text-gray-900 transition-all duration-200 rounded-lg hover:bg-white/20"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              <Button
                onClick={() => setIsSignInModalOpen(true)}
                variant="outline"
                className="relative bg-white/30 backdrop-blur-md border-white/40 text-gray-800 hover:bg-white/40 hover:text-gray-900 hover:border-white/50 px-4 py-2 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl pointer-events-none" />
                <span className="relative">Sign In</span>
              </Button>

              <Button
                onClick={() => onSectionClick('subscribe')}
                className="relative bg-gray-900/90 hover:bg-gray-800/90 text-white px-6 py-2 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20 backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-xl pointer-events-none" />
                <span className="relative">Subscribe</span>
              </Button>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-700/80 hover:text-gray-900 transition-all duration-300 rounded-xl hover:bg-white/30 hover:backdrop-blur-md hover:shadow-lg hover:shadow-black/5"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/90 backdrop-blur-2xl border-t border-white/40 shadow-2xl shadow-black/15">
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/30 to-white/20 pointer-events-none" />
            <div className="absolute inset-0 bg-white/70 pointer-events-none" />

            <div className="px-4 py-2 space-y-1 relative">
              <div className="py-2">
                <div className="flex items-center bg-white/40 backdrop-blur-md rounded-xl border border-white/40 shadow-lg shadow-black/5 p-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full px-3 py-2 bg-transparent text-gray-800 placeholder-gray-600/80 focus:outline-none rounded-lg"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSearchSubmit(e);
                      }
                    }}
                  />
                </div>
              </div>

              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    onSectionClick(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-gray-800 hover:text-gray-900 hover:bg-white/30 hover:backdrop-blur-md transition-all duration-200 rounded-xl font-medium"
                >
                  {item.name}
                </button>
              ))}

              <div className="pt-4 space-y-2">
                <Button
                  onClick={() => {
                    setIsSignInModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  variant="outline"
                  className="w-full bg-white/30 backdrop-blur-md border-white/40 text-gray-800 hover:bg-white/40 hover:text-gray-900 hover:border-white/50 py-2 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-black/5"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => {
                    onSectionClick('subscribe');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-gray-900/90 hover:bg-gray-800/90 text-white py-2 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-black/10 backdrop-blur-sm"
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {isSignInModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setIsSignInModalOpen(false)}
          />

          <div className="relative w-full max-w-md bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-black/20 overflow-hidden animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
            <div className="bg-white/20 backdrop-blur-xl px-8 py-6 relative border-b border-white/30">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-white/20 pointer-events-none" />
              <button
                onClick={() => setIsSignInModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-700/80 hover:text-gray-900 hover:bg-white/30 rounded-xl transition-all duration-200"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="text-center relative">
                <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
                <p className="text-gray-700 text-sm mt-1">Sign in to your MakerStick account</p>
              </div>
            </div>

            <div className="p-8 bg-white/90 backdrop-blur-md">
              <div className="space-y-8">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={signInData.email}
                      onChange={(e) => handleSignInInputChange('email', e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/40 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm backdrop-blur-md"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={signInData.password}
                      onChange={(e) => handleSignInInputChange('password', e.target.value)}
                      className="w-full pl-12 pr-14 py-3 bg-white/20 border border-white/40 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm backdrop-blur-md"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="ml-3 text-sm text-gray-600 font-medium">Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                  >
                    Forgot password?
                  </button>
                </div>

                <Button
                  onClick={handleSignInSubmit}
                  className="w-full bg-gray-900/90 hover:bg-gray-800/90 text-white py-3 rounded-xl font-semibold text-base transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-black/20 backdrop-blur-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-xl pointer-events-none" />
                  <span className="relative">Sign In</span>
                </Button>
              </div>

              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                  >
                    Sign up for free
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;