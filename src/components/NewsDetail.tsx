
import { useParams } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ArrowUp, ArrowDown, Share, Bookmark, ExternalLink, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import AIAnalysis from './AIAnalysis';
import CommentSection, { CommentProps } from './CommentSection';
import { useState } from 'react';

// Mock data for the article
const MOCK_ARTICLE = {
  id: '1',
  title: 'New AI Model Achieves Breakthrough in Medical Diagnosis Accuracy',
  description: 'Researchers at Stanford University have developed a new AI model that can predict certain diseases with unprecedented accuracy, marking a significant advancement in the field of medical diagnostics.',
  content: `
    <p>In a groundbreaking development for medical AI, researchers at Stanford University have unveiled a new artificial intelligence system that demonstrates unprecedented accuracy in diagnosing a range of medical conditions from imaging data.</p>
    
    <p>The model, named MediScan-AI, was trained on over 1.2 million anonymized patient scans and has shown a 97.8% accuracy rate in identifying early signs of lung cancer, surpassing the 92% average accuracy of experienced radiologists.</p>
    
    <p>"What makes this system unique is its ability to explain its reasoning process," says Dr. Elena Patel, lead researcher on the project. "It doesn't just provide a diagnosis but highlights the specific visual patterns that led to its conclusion, making it a collaborative tool for healthcare professionals rather than a black box."</p>
    
    <p>The development comes at a critical time when healthcare systems worldwide are facing increased pressure and staffing challenges. The AI system could help prioritize urgent cases and reduce the workload on specialists.</p>
    
    <p>Clinical trials conducted across five major hospitals showed that integration of the AI system reduced diagnostic time by 60% and cut false positives by nearly half. The technology is now pending FDA approval and could be deployed in hospitals as early as next year.</p>
    
    <p>However, medical ethicists caution that while the technology shows promise, it raises important questions about the role of human judgment in healthcare. "We must ensure these systems enhance rather than replace the critical thinking of healthcare professionals," noted Dr. Marcus Lee, a bioethicist not involved in the research.</p>
  `,
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
  tags: ['Technology', 'Health', 'Science'],
  aiVerification: {
    status: 'verified',
    credibilityScore: 0.89,
    biasLevel: 0.15,
    sentimentScore: 0.65,
    toxicityScore: 0.03,
    feedback: [
      "Article cites specific research sources that can be verified.",
      "Claims are supported by quantitative data and expert quotes.",
      "Presents balanced perspectives including potential concerns."
    ]
  }
};

// Mock comments
const MOCK_COMMENTS: CommentProps[] = [
  {
    id: 'c1',
    text: "This is really promising technology. I wonder how it handles edge cases and rare conditions that might not have been well-represented in the training data.",
    author: { id: 'u1', name: 'TechEnthusiast' },
    createdAt: '2025-02-15T10:30:00Z',
    votes: 24,
    replies: [
      {
        id: 'c1r1',
        text: "Great point. The paper actually addresses this - they supplemented their training with synthetic data for rare conditions, though they acknowledge this remains a challenge area.",
        author: { id: 'u2', name: 'AI_Researcher' },
        createdAt: '2025-02-15T11:15:00Z',
        votes: 18
      }
    ]
  },
  {
    id: 'c2',
    text: "I'm concerned about the ethical implications. Will doctors start relying too heavily on AI and miss things that algorithms aren't designed to catch?",
    author: { id: 'u3', name: 'EthicsFirst' },
    createdAt: '2025-02-15T14:22:00Z',
    votes: 31,
    replies: [
      {
        id: 'c2r1',
        text: "That's always a risk with assistive technologies. The key is proper training for medical professionals on how to use these tools as supplements, not replacements for clinical judgment.",
        author: { id: 'u4', name: 'MedStudent' },
        createdAt: '2025-02-15T15:03:00Z',
        votes: 14
      }
    ]
  },
  {
    id: 'c3',
    text: "As someone working in healthcare, I can't wait for tools like this. We're drowning in imaging work and anything that helps us prioritize urgent cases would be a lifesaver.",
    author: { id: 'u5', name: 'Radiologist_Jane' },
    createdAt: '2025-02-16T08:17:00Z',
    votes: 42
  }
];

const NewsDetail = () => {
  const { id } = useParams();
  const [voteCount, setVoteCount] = useState(MOCK_ARTICLE.votes);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // In a real app, you would fetch the article based on the ID
  const article = MOCK_ARTICLE;

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex gap-4">
        {/* Left sidebar with voting */}
        <div className="hidden sm:flex flex-col items-center pt-1 sticky top-20 self-start">
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn("h-10 w-10", userVote === 'up' && "text-news-secondary")} 
            onClick={() => handleVote('up')}
          >
            <ArrowUp className="h-6 w-6" />
          </Button>
          <span className="text-lg font-semibold my-1">{voteCount}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn("h-10 w-10", userVote === 'down' && "text-news-danger")} 
            onClick={() => handleVote('down')}
          >
            <ArrowDown className="h-6 w-6" />
          </Button>
          <Separator className="my-4" />
          <Button 
            variant="ghost" 
            size="icon"
            className={cn("h-10 w-10", isBookmarked && "text-news-secondary")}
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark className={cn("h-5 w-5", isBookmarked && "fill-news-secondary")} />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Share className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Main content */}
        <div className="flex-1">
          <article>
            <header className="mb-6">
              <div className="flex flex-wrap gap-2 mb-3">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src={article.author.avatar} alt={article.author.name} />
                    <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{article.author.name}</span>
                </div>
                <span>•</span>
                <span>{formatDate(article.createdAt)}</span>
                <span>•</span>
                <span>Source: {article.source}</span>
                {article.url && (
                  <>
                    <span>•</span>
                    <a 
                      href={article.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center text-news-secondary hover:text-news-tertiary"
                    >
                      Original Article <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </>
                )}
              </div>
              
              {/* Mobile voting bar */}
              <div className="sm:hidden flex items-center justify-start gap-4 my-4">
                <div className="flex items-center">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={cn("h-9 w-9", userVote === 'up' && "text-news-secondary")} 
                    onClick={() => handleVote('up')}
                  >
                    <ArrowUp className="h-5 w-5" />
                  </Button>
                  <span className="text-base font-medium mx-1">{voteCount}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={cn("h-9 w-9", userVote === 'down' && "text-news-danger")} 
                    onClick={() => handleVote('down')}
                  >
                    <ArrowDown className="h-5 w-5" />
                  </Button>
                </div>
                <Separator orientation="vertical" className="h-8" />
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={cn("h-9 w-9", isBookmarked && "text-news-secondary")}
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  <Bookmark className={cn("h-5 w-5", isBookmarked && "fill-news-secondary")} />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Share className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <MessageSquare className="h-5 w-5" />
                </Button>
              </div>
            </header>
            
            {article.imageUrl && (
              <div className="mb-6">
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="w-full rounded-md h-72 object-cover"
                />
              </div>
            )}
            
            <div className="prose prose-lg max-w-none mb-8" dangerouslySetInnerHTML={{ __html: article.content }} />
            
            <div className="my-8">
              <AIAnalysis 
                credibilityScore={article.aiVerification.credibilityScore}
                biasLevel={article.aiVerification.biasLevel}
                sentimentScore={article.aiVerification.sentimentScore}
                toxicityScore={article.aiVerification.toxicityScore}
                status={article.aiVerification.status}
                feedback={article.aiVerification.feedback}
              />
            </div>
            
            <Separator className="my-8" />
            
            <CommentSection comments={MOCK_COMMENTS} />
          </article>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
