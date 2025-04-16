
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Newspaper, Search, User, Menu, X, LogIn } from 'lucide-react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would be replaced with actual auth state

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Newspaper className="h-8 w-8 text-news-secondary" />
              <span className="ml-2 text-xl font-bold text-news-primary">NewsNexus</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="border-transparent text-gray-500 hover:border-news-secondary hover:text-news-secondary px-1 pt-1 font-medium border-b-2 transition-colors">Home</Link>
              <Link to="/trending" className="border-transparent text-gray-500 hover:border-news-secondary hover:text-news-secondary px-1 pt-1 font-medium border-b-2 transition-colors">Trending</Link>
              <Link to="/recent" className="border-transparent text-gray-500 hover:border-news-secondary hover:text-news-secondary px-1 pt-1 font-medium border-b-2 transition-colors">Recent</Link>
              <Link to="/submit" className="border-transparent text-gray-500 hover:border-news-secondary hover:text-news-secondary px-1 pt-1 font-medium border-b-2 transition-colors">Submit News</Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <div className="relative w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input 
                type="text" 
                placeholder="Search news..." 
                className="pl-10 w-full"
              />
            </div>
            {isLoggedIn ? (
              <Link to="/profile">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5 text-news-primary" />
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button variant="outline" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" /> Login
                </Button>
              </Link>
            )}
            <Link to="/signup">
              <Button className="bg-news-secondary hover:bg-news-tertiary text-white">Sign Up</Button>
            </Link>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {menuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1 px-4">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-news-primary hover:bg-gray-50">Home</Link>
            <Link to="/trending" className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-50">Trending</Link>
            <Link to="/recent" className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-50">Recent</Link>
            <Link to="/submit" className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-50">Submit News</Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="relative w-full mb-3">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input 
                  type="text" 
                  placeholder="Search news..." 
                  className="pl-10 w-full"
                />
              </div>
            </div>
            <div className="px-4 space-y-2">
              {isLoggedIn ? (
                <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-50">Profile</Link>
              ) : (
                <Link to="/login" className="block w-full">
                  <Button variant="outline" className="w-full justify-start">
                    <LogIn className="h-4 w-4 mr-2" /> Login
                  </Button>
                </Link>
              )}
              <Link to="/signup" className="block w-full">
                <Button className="w-full bg-news-secondary hover:bg-news-tertiary text-white">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
