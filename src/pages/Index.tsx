
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Newspaper, Zap, Clock, BarChart, Search, Settings, Filter } from 'lucide-react';
import Navbar from "@/components/Navbar";
import NewsCard, { NewsCardProps } from "@/components/NewsCard";

// Mock news data
const MOCK_NEWS: NewsCardProps[] = [
  {
    id: '1',
    title: 'New AI Model Achieves Breakthrough in Medical Diagnosis Accuracy',
    description: 'Researchers at Stanford University have developed a new AI model that can predict certain diseases with unprecedented accuracy, marking a significant advancement in the field of medical diagnostics.',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    source: 'Tech Medical Journal',
    url: 'https://example.com/article',
    author: {
      id: 'author1',
      name: 'Dr. James Wilson',
      avatar: undefined,
    },
    createdAt: '2025-02-15T09:23:00Z',
    votes: 342,
    comments: 28,
    tags: ['Technology', 'Health', 'Science'],
    aiVerification: {
      status: 'verified',
      score: 0.89
    }
  },
  {
    id: '2',
    title: 'Global Climate Summit Reaches Historic Agreement on Emissions',
    description: 'World leaders at the 2025 Climate Summit have agreed to a landmark deal that aims to reduce global carbon emissions by 45% by 2035, with binding targets for both developed and developing nations.',
    imageUrl: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
    source: 'Global Environmental News',
    url: 'https://example.com/article2',
    author: {
      id: 'author2',
      name: 'Emma Rodriguez',
      avatar: undefined,
    },
    createdAt: '2025-02-14T16:45:00Z',
    votes: 287,
    comments: 42,
    tags: ['Environment', 'Politics', 'World'],
    aiVerification: {
      status: 'verified',
      score: 0.95
    }
  },
  {
    id: '3',
    title: 'Quantum Computing Reaches Commercial Viability Milestone',
    description: 'A major tech company has announced the development of a 500-qubit quantum computer that operates at room temperature, potentially making quantum computing commercially viable for the first time.',
    source: 'Tech Innovations Weekly',
    url: 'https://example.com/article3',
    author: {
      id: 'author3',
      name: 'Dr. Akira Tanaka',
      avatar: undefined,
    },
    createdAt: '2025-02-13T11:30:00Z',
    votes: 312,
    comments: 35,
    tags: ['Technology', 'Science', 'Business'],
    aiVerification: {
      status: 'warning',
      score: 0.65
    }
  },
  {
    id: '4',
    title: 'New Study Links Social Media Use to Improved Mental Health Outcomes',
    description: 'Contrary to previous research, a new longitudinal study suggests that certain types of social media engagement may actually improve mental health outcomes when used in moderation.',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    source: 'Psychology Today',
    url: 'https://example.com/article4',
    author: {
      id: 'author4',
      name: 'Dr. Sarah Chen',
      avatar: undefined,
    },
    createdAt: '2025-02-12T14:15:00Z',
    votes: 198,
    comments: 47,
    tags: ['Health', 'Technology', 'Science'],
    aiVerification: {
      status: 'warning',
      score: 0.62
    }
  },
  {
    id: '5',
    title: 'Global Chip Shortage Expected to Ease by Q3 2025, Industry Experts Say',
    description: 'After years of supply chain disruptions, semiconductor industry analysts predict improvements in chip availability starting mid-next year, potentially relieving pressure on electronics manufacturers.',
    source: 'Tech Industry News',
    url: 'https://example.com/article5',
    author: {
      id: 'author5',
      name: 'Michael Chang',
      avatar: undefined,
    },
    createdAt: '2025-02-11T09:45:00Z',
    votes: 217,
    comments: 19,
    tags: ['Technology', 'Business'],
    aiVerification: {
      status: 'verified',
      score: 0.92
    }
  }
];

const ALL_TAGS = ['Technology', 'Health', 'Science', 'Business', 'Politics', 'World', 'Environment', 'Education', 'Entertainment', 'Sports'];

const Index = () => {
  const [activeTab, setActiveTab] = useState('trending');
  const [sortOption, setSortOption] = useState('votes');
  const [timeFilter, setTimeFilter] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  // Filter news based on selected tags and search query
  const filteredNews = MOCK_NEWS.filter(news => {
    const matchesTags = selectedTags.length === 0 || 
      news.tags.some(tag => selectedTags.includes(tag));
    
    const matchesSearch = !searchQuery || 
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      news.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTags && matchesSearch;
  });
  
  // Sort filtered news
  const sortedNews = [...filteredNews].sort((a, b) => {
    if (sortOption === 'votes') {
      return b.votes - a.votes;
    } else if (sortOption === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortOption === 'credibility') {
      return (b.aiVerification?.score || 0) - (a.aiVerification?.score || 0);
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="lg:flex-1">
            <div className="mb-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="trending" className="flex-1">
                    <Zap className="h-4 w-4 mr-2" /> Trending
                  </TabsTrigger>
                  <TabsTrigger value="recent" className="flex-1">
                    <Clock className="h-4 w-4 mr-2" /> Recent
                  </TabsTrigger>
                  <TabsTrigger value="verified" className="flex-1">
                    <BarChart className="h-4 w-4 mr-2" /> Most Reliable
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <div className="relative w-full sm:w-auto flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search news..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="votes">Most Upvoted</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="credibility">Highest Credibility</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={timeFilter} onValueChange={setTimeFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="all">All Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {selectedTags.length > 0 && (
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="text-sm text-gray-500">Filtered by:</span>
                {selectedTags.map(tag => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-1 p-0"
                      onClick={() => toggleTag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs h-7"
                  onClick={() => setSelectedTags([])}
                >
                  Clear all
                </Button>
              </div>
            )}
            
            {sortedNews.length > 0 ? (
              <div className="space-y-4">
                {sortedNews.map((news) => (
                  <NewsCard key={news.id} {...news} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border border-dashed rounded-md">
                <Newspaper className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                <h3 className="text-xl font-semibold text-gray-500 mb-2">No news found</h3>
                <p className="text-gray-500 mb-4">Try changing your search criteria or filters</p>
                <Button onClick={() => {
                  setSelectedTags([]);
                  setSearchQuery('');
                }}>
                  Reset filters
                </Button>
              </div>
            )}
            
            {sortedNews.length > 0 && (
              <div className="mt-8 flex justify-center">
                <Button variant="outline" className="mx-auto">Load More</Button>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-72 space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="font-medium mb-3 flex items-center">
                <Filter className="h-4 w-4 mr-2" /> Filter by Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {ALL_TAGS.map(tag => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className={`cursor-pointer ${
                      selectedTags.includes(tag) 
                        ? "bg-news-secondary hover:bg-news-tertiary" 
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="font-medium mb-3">Top Contributors</h3>
              <ul className="space-y-3">
                <li className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-news-secondary text-white flex items-center justify-center text-sm font-medium">
                      E
                    </div>
                    <span className="ml-2 text-sm">Emma Rodriguez</span>
                  </div>
                  <Badge variant="outline" className="text-xs">2.4k</Badge>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-news-primary text-white flex items-center justify-center text-sm font-medium">
                      J
                    </div>
                    <span className="ml-2 text-sm">James Wilson</span>
                  </div>
                  <Badge variant="outline" className="text-xs">1.8k</Badge>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-news-tertiary text-white flex items-center justify-center text-sm font-medium">
                      A
                    </div>
                    <span className="ml-2 text-sm">Akira Tanaka</span>
                  </div>
                  <Badge variant="outline" className="text-xs">1.5k</Badge>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-news-secondary/90 to-news-tertiary p-5 rounded-lg text-white">
              <h3 className="font-medium mb-3">Become a Contributor</h3>
              <p className="text-sm mb-4 text-white/90">Share news, gain reputation, and help keep the community informed with verified content.</p>
              <Button variant="secondary" className="w-full bg-white text-news-secondary hover:bg-gray-100">
                Start Contributing
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
