
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, AlertTriangle, AlertCircle, Cpu, BarChart3, Zap, Info } from 'lucide-react';

export interface AIAnalysisProps {
  credibilityScore: number;
  biasLevel: number;
  sentimentScore: number;
  toxicityScore: number;
  status: 'verified' | 'warning' | 'unverified' | 'unreliable';
  feedback?: string[];
}

const AIAnalysis = ({
  credibilityScore,
  biasLevel,
  sentimentScore,
  toxicityScore,
  status,
  feedback = [],
}: AIAnalysisProps) => {
  
  const getScoreColor = (score: number, isReversed = false) => {
    if (isReversed) score = 1 - score;
    if (score >= 0.7) return 'text-green-600';
    if (score >= 0.4) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  const getProgressColor = (score: number, isReversed = false) => {
    if (isReversed) score = 1 - score;
    if (score >= 0.7) return 'bg-green-600';
    if (score >= 0.4) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  const formatPercent = (score: number) => {
    return Math.round(score * 100);
  };

  const statusIcon = () => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'unreliable':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  const statusText = () => {
    switch (status) {
      case 'verified':
        return "Verified Content";
      case 'warning':
        return "Exercise Caution";
      case 'unreliable':
        return "Potentially Misleading";
      default:
        return "Unverified Content";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Cpu className="h-5 w-5 text-news-secondary" />
          AI Content Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-6 p-3 rounded-md bg-gray-50">
          <div className="flex items-center gap-2">
            {statusIcon()}
            <span className="font-medium">{statusText()}</span>
          </div>
          <div className="text-sm text-gray-500">
            Overall Trust Score: <span className={getScoreColor(credibilityScore)}>{formatPercent(credibilityScore)}%</span>
          </div>
        </div>

        <Tabs defaultValue="metrics">
          <TabsList className="w-full">
            <TabsTrigger value="metrics" className="flex-1"><BarChart3 className="h-4 w-4 mr-1" /> Metrics</TabsTrigger>
            <TabsTrigger value="feedback" className="flex-1"><Zap className="h-4 w-4 mr-1" /> AI Feedback</TabsTrigger>
          </TabsList>
          <TabsContent value="metrics" className="space-y-4 pt-4">
            <div>
              <div className="flex justify-between mb-1">
                <div className="text-sm font-medium">Credibility</div>
                <div className={`text-sm font-medium ${getScoreColor(credibilityScore)}`}>
                  {formatPercent(credibilityScore)}%
                </div>
              </div>
              <Progress value={formatPercent(credibilityScore)} className="h-2" indicatorClassName={getProgressColor(credibilityScore)} />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <div className="text-sm font-medium">Neutrality (Bias)</div>
                <div className={`text-sm font-medium ${getScoreColor(1 - biasLevel, true)}`}>
                  {formatPercent(1 - biasLevel)}%
                </div>
              </div>
              <Progress value={formatPercent(1 - biasLevel)} className="h-2" indicatorClassName={getProgressColor(1 - biasLevel)} />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <div className="text-sm font-medium">Sentiment</div>
                <div className="text-sm font-medium">
                  {sentimentScore > 0.6 ? 'Positive' : sentimentScore < 0.4 ? 'Negative' : 'Neutral'}
                </div>
              </div>
              <Progress value={formatPercent(sentimentScore)} className="h-2" indicatorClassName="bg-blue-500" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <div className="text-sm font-medium">Safety (Non-Toxic)</div>
                <div className={`text-sm font-medium ${getScoreColor(1 - toxicityScore, true)}`}>
                  {formatPercent(1 - toxicityScore)}%
                </div>
              </div>
              <Progress value={formatPercent(1 - toxicityScore)} className="h-2" indicatorClassName={getProgressColor(1 - toxicityScore, true)} />
            </div>
          </TabsContent>
          
          <TabsContent value="feedback" className="pt-4">
            {feedback.length > 0 ? (
              <ul className="space-y-2">
                {feedback.map((item, index) => (
                  <li key={index} className="text-sm flex gap-2 items-start">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No specific feedback available for this content.</p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AIAnalysis;
