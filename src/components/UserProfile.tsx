
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Edit, LogOut, Award, Clock, ThumbsUp, Settings } from 'lucide-react';
import NewsCard, { NewsCardProps } from './NewsCard';

// Mock user data
const MOCK_USER = {
  id: 'user1',
  name: 'Alex Johnson',
  bio: 'Tech journalist and data science enthusiast. I write about emerging technologies and their impact on society.',
  avatar: undefined,
  joinDate: '2024-08-15T10:00:00Z',
  reputation: 1842,
  posts: 47,
  followers: 128,
  following: 89,
  badges: [
    { id: 'b1', name: 'Top Contributor', icon: 'Award' },
    { id: 'b2', name: 'Tech Expert', icon: 'Cpu' },
    { id: 'b3', name: 'Fact Checker', icon: 'CheckSquare' }
  ]
};

// Mock news posts
const MOCK_POSTS: NewsCardProps[] = [
  {
    id: 'post1',
    title: 'New AI Model Achieves Breakthrough in Medical Diagnosis Accuracy',
    description: 'Researchers at Stanford University have developed a new AI model that can predict certain diseases with unprecedented accuracy, marking a significant advancement in the field of medical diagnostics.',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    source: 'Tech Medical Journal',
    url: 'https://example.com/article',
    author: {
      id: 'user1',
      name: 'Alex Johnson',
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
    id: 'post2',
    title: 'Global Chip Shortage Expected to Ease by Q3 2025, Industry Experts Say',
    description: 'After years of supply chain disruptions, semiconductor industry analysts predict improvements in chip availability starting mid-next year, potentially relieving pressure on electronics manufacturers.',
    source: 'Tech Industry News',
    url: 'https://example.com/article2',
    author: {
      id: 'user1',
      name: 'Alex Johnson',
    },
    createdAt: '2025-01-28T14:10:00Z',
    votes: 217,
    comments: 19,
    tags: ['Technology', 'Business'],
    aiVerification: {
      status: 'verified',
      score: 0.92
    }
  }
];

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const user = MOCK_USER;
  const userPosts = MOCK_POSTS;
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
              <p className="text-gray-600 mb-3">{user.bio}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                {user.badges.map((badge) => (
                  <Badge key={badge.id} variant="secondary" className="flex items-center gap-1">
                    <Award className="h-3 w-3" /> {badge.name}
                  </Badge>
                ))}
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  <span>{user.reputation} Reputation</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Joined {formatDate(user.joinDate)}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Edit className="h-4 w-4" /> Edit Profile
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Settings className="h-4 w-4" /> Settings
              </Button>
              <Button variant="ghost" className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50">
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{user.posts}</p>
            <p className="text-sm text-gray-500">Posts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{user.reputation}</p>
            <p className="text-sm text-gray-500">Reputation</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{user.followers}</p>
            <p className="text-sm text-gray-500">Followers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{user.following}</p>
            <p className="text-sm text-gray-500">Following</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full">
          <TabsTrigger value="posts" className="flex-1">Posts</TabsTrigger>
          <TabsTrigger value="comments" className="flex-1">Comments</TabsTrigger>
          <TabsTrigger value="saved" className="flex-1">Saved</TabsTrigger>
          <TabsTrigger value="upvoted" className="flex-1">Upvoted</TabsTrigger>
        </TabsList>
        
        <TabsContent value="posts" className="mt-6">
          {userPosts.length > 0 ? (
            <div className="space-y-4">
              {userPosts.map((post) => (
                <NewsCard key={post.id} {...post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No posts yet</p>
              <Button className="mt-4 bg-news-secondary hover:bg-news-tertiary">Create your first post</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="comments" className="mt-6">
          <div className="text-center py-8">
            <p className="text-gray-500">No comments yet</p>
          </div>
        </TabsContent>
        
        <TabsContent value="saved" className="mt-6">
          <div className="text-center py-8">
            <p className="text-gray-500">No saved posts yet</p>
          </div>
        </TabsContent>
        
        <TabsContent value="upvoted" className="mt-6">
          <div className="text-center py-8">
            <p className="text-gray-500">No upvoted posts yet</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;
