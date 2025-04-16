
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUp, ArrowDown, MessageSquare, ExternalLink, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NewsCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  source: string;
  url: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  votes: number;
  comments: number;
  tags: string[];
  aiVerification?: {
    status: 'verified' | 'warning' | 'unverified' | 'unreliable';
    score: number;
  };
}

const NewsCard = ({ 
  id, 
  title, 
  description, 
  imageUrl, 
  source, 
  url, 
  author, 
  createdAt, 
  votes, 
  comments, 
  tags,
  aiVerification = { status: 'unverified', score: 0.5 }
}: NewsCardProps) => {
  const [voteCount, setVoteCount] = useState(votes);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);

  const handleVote = (direction: 'up' | 'down') => {
    if (userVote === direction) {
      // User is un-voting
      setUserVote(null);
      setVoteCount(direction === 'up' ? voteCount - 1 : voteCount + 1);
    } else if (userVote === null) {
      // User is voting for the first time
      setUserVote(direction);
      setVoteCount(direction === 'up' ? voteCount + 1 : voteCount - 1);
    } else {
      // User is changing vote
      setUserVote(direction);
      setVoteCount(direction === 'up' ? voteCount + 2 : voteCount - 2);
    }
  };

  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const renderVerificationBadge = () => {
    switch (aiVerification.status) {
      case 'verified':
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3" /> Verified
          </Badge>
        );
      case 'warning':
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-yellow-50 text-yellow-700 border-yellow-200">
            <AlertTriangle className="h-3 w-3" /> Needs Review
          </Badge>
        );
      case 'unreliable':
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-red-50 text-red-700 border-red-200">
            <AlertCircle className="h-3 w-3" /> Questionable
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-gray-50 text-gray-500 border-gray-200">
            <AlertCircle className="h-3 w-3" /> Unverified
          </Badge>
        );
    }
  };

  return (
    <Card className="mb-4 overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row">
        {imageUrl && (
          <div className="md:w-1/4 h-48 md:h-auto relative">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover" 
            />
          </div>
        )}
        <div className={imageUrl ? "md:w-3/4" : "w-full"}>
          <CardHeader className="flex flex-row items-start gap-4 pb-2">
            <div className="flex flex-col items-center pt-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn("h-8 w-8", userVote === 'up' && "text-news-secondary")} 
                onClick={() => handleVote('up')}
              >
                <ArrowUp className="h-5 w-5" />
              </Button>
              <span className="text-sm font-medium">{voteCount}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn("h-8 w-8", userVote === 'down' && "text-news-danger")} 
                onClick={() => handleVote('down')}
              >
                <ArrowDown className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex-1 space-y-1 pt-1">
              <div className="flex justify-between items-start gap-2">
                <Link to={`/news/${id}`} className="text-lg font-semibold hover:text-news-secondary transition-colors">
                  {title}
                </Link>
                {renderVerificationBadge()}
              </div>
              <div className="flex flex-wrap gap-1">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center text-sm text-gray-500 gap-2">
                <span>from {source}</span>
                <span>•</span>
                <span>{formattedDate}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-gray-600 line-clamp-3">{description}</p>
          </CardContent>
          <CardFooter className="flex items-center justify-between pt-0">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={author.avatar} alt={author.name} />
                  <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-600">{author.name}</span>
              </div>
              <Link to={`/news/${id}`} className="flex items-center text-gray-500 hover:text-news-secondary">
                <MessageSquare className="h-4 w-4 mr-1" />
                <span className="text-sm">{comments}</span>
              </Link>
            </div>
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-news-secondary hover:text-news-tertiary text-sm"
            >
              Read Original
              <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default NewsCard;
