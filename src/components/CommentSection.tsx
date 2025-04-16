
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUp, ArrowDown, Reply } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CommentProps {
  id: string;
  text: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  votes: number;
  replies?: CommentProps[];
}

const Comment = ({ id, text, author, createdAt, votes, replies = [] }: CommentProps) => {
  const [expanded, setExpanded] = useState(false);
  const [voteCount, setVoteCount] = useState(votes);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleVote = (direction: 'up' | 'down') => {
    if (userVote === direction) {
      setUserVote(null);
      setVoteCount(direction === 'up' ? voteCount - 1 : voteCount + 1);
    } else if (userVote === null) {
      setUserVote(direction);
      setVoteCount(direction === 'up' ? voteCount + 1 : voteCount - 1);
    } else {
      setUserVote(direction);
      setVoteCount(direction === 'up' ? voteCount + 2 : voteCount - 2);
    }
  };

  const toggleReplying = () => {
    setIsReplying(!isReplying);
  };

  const handleReply = () => {
    // In a real app, this would send the reply to the server
    if (replyText.trim()) {
      console.log('Reply submitted:', replyText);
      setReplyText('');
      setIsReplying(false);
    }
  };

  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="mb-4">
      <div className="flex gap-3">
        <div className="flex flex-col items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn("h-7 w-7", userVote === 'up' && "text-news-secondary")} 
            onClick={() => handleVote('up')}
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
          <span className="text-xs font-medium">{voteCount}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn("h-7 w-7", userVote === 'down' && "text-news-danger")} 
            onClick={() => handleVote('down')}
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1">
          <div className="flex items-center mb-1">
            <Avatar className="h-6 w-6 mr-2">
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="font-medium text-sm mr-2">{author.name}</span>
            <span className="text-xs text-gray-500">{formattedDate}</span>
          </div>
          <p className="text-gray-700 mb-2">{text}</p>
          <div className="flex items-center gap-2 mb-3">
            <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={toggleReplying}>
              <Reply className="h-3 w-3 mr-1" /> Reply
            </Button>
          </div>

          {isReplying && (
            <div className="mb-3">
              <Textarea 
                placeholder="Write a reply..." 
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="mb-2 text-sm min-h-24"
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={toggleReplying}>Cancel</Button>
                <Button size="sm" className="bg-news-secondary hover:bg-news-tertiary" onClick={handleReply}>Submit</Button>
              </div>
            </div>
          )}

          {replies.length > 0 && (
            <div className="border-l-2 border-gray-200 pl-4 mt-3">
              {replies.map((reply) => (
                <Comment key={reply.id} {...reply} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CommentSection = ({ comments }: { comments: CommentProps[] }) => {
  const [commentText, setCommentText] = useState('');

  const handleComment = () => {
    // In a real app, this would send the comment to the server
    if (commentText.trim()) {
      console.log('Comment submitted:', commentText);
      setCommentText('');
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>
      
      <div className="mb-6">
        <Textarea 
          placeholder="Write a comment..." 
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="mb-2 min-h-32"
        />
        <div className="flex justify-end">
          <Button className="bg-news-secondary hover:bg-news-tertiary" onClick={handleComment}>
            Post Comment
          </Button>
        </div>
      </div>
      
      <div className="space-y-6">
        {comments.map((comment) => (
          <Comment key={comment.id} {...comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
