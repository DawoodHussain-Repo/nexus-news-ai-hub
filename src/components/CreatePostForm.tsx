
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, AlertTriangle, Loader2, X, Plus, Link as LinkIcon } from 'lucide-react';
import AIAnalysis from './AIAnalysis';

const AVAILABLE_TAGS = [
  'Politics', 'Technology', 'Science', 'Health', 'Business', 
  'Entertainment', 'Sports', 'World', 'Environment', 'Education'
];

const CreatePostForm = () => {
  const { toast } = useToast();
  const [formType, setFormType] = useState<'url' | 'text'>('url');
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else if (selectedTags.length < 3) {
      setSelectedTags([...selectedTags, tag]);
    } else {
      toast({
        title: "Tag limit reached",
        description: "You can only select up to 3 tags",
        variant: "destructive"
      });
    }
  };

  const handleAnalyzeContent = () => {
    if (formType === 'url' && !url) {
      toast({
        title: "Missing URL",
        description: "Please enter a URL to analyze",
        variant: "destructive"
      });
      return;
    }

    if (formType === 'text' && (!title || !content)) {
      toast({
        title: "Missing content",
        description: "Please provide both a title and content for your post",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis (in a real app, this would call your backend)
    setTimeout(() => {
      // Mock AI analysis results
      const mockResult = {
        credibilityScore: Math.random() * 0.3 + 0.6, // Between 0.6 and 0.9
        biasLevel: Math.random() * 0.4, // Between 0 and 0.4
        sentimentScore: Math.random() * 0.4 + 0.3, // Between 0.3 and 0.7
        toxicityScore: Math.random() * 0.2, // Between 0 and 0.2
        status: Math.random() > 0.3 ? 'verified' : 'warning' as 'verified' | 'warning',
        feedback: [
          "Consider adding additional sources to strengthen credibility.",
          "Some statements may benefit from more specific data points.",
          "Overall balanced perspective, minimal bias detected."
        ]
      };
      
      setAiResult(mockResult);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleSubmit = () => {
    if (!aiResult) {
      toast({
        title: "Analysis required",
        description: "Please analyze your content before submitting",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would send the post to your backend
    toast({
      title: "Post submitted successfully",
      description: "Your post is now pending review and will be published soon",
      variant: "default"
    });

    // Reset form
    setUrl('');
    setTitle('');
    setContent('');
    setSelectedTags([]);
    setImageUrl('');
    setAiResult(null);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Submit News</h1>
      
      <Tabs value={formType} onValueChange={(value) => setFormType(value as 'url' | 'text')}>
        <TabsList className="w-full mb-6">
          <TabsTrigger value="url" className="flex-1">
            <LinkIcon className="h-4 w-4 mr-2" /> Submit URL
          </TabsTrigger>
          <TabsTrigger value="text" className="flex-1">
            <Plus className="h-4 w-4 mr-2" /> Create Post
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="url" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">News URL</Label>
            <Input
              id="url"
              placeholder="https://example.com/news-article"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <p className="text-sm text-gray-500">
              Submit a link to an existing news article from a reputable source
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="text" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter a descriptive title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Write your news content here..."
              className="min-h-32"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">Image URL (optional)</Label>
            <Input
              id="image"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
        </TabsContent>
        
        <div className="mt-6 space-y-4">
          <div>
            <Label>Tags (select up to 3)</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {AVAILABLE_TAGS.map(tag => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className={`cursor-pointer ${
                    selectedTags.includes(tag) 
                      ? "bg-news-secondary hover:bg-news-tertiary" 
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="pt-4">
            <Button 
              onClick={handleAnalyzeContent} 
              disabled={isAnalyzing}
              className="w-full bg-news-secondary hover:bg-news-tertiary"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Content...
                </>
              ) : (
                <>
                  Analyze with AI
                </>
              )}
            </Button>
          </div>
          
          {aiResult && (
            <div className="mt-6">
              <AIAnalysis {...aiResult} />
              
              <div className="mt-6">
                <Button 
                  onClick={handleSubmit}
                  className="w-full bg-news-primary hover:bg-black text-white"
                >
                  Submit News
                </Button>
              </div>
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default CreatePostForm;
