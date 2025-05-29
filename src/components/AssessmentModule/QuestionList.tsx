import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Check, Square } from 'lucide-react';

interface Question {
  id: string;
  number: string;
  text: string;
  subtext: string;
}

interface QuestionRelevance {
  relevant: boolean;
  nonRelevant: boolean;
}

const initialQuestionsData: Question[] = [
  {
    id: 'q1',
    number: '01',
    text: '"Tell me about a time when you adopted a new technology or tool on your own. What motivated you, and what was the result?"',
    subtext: '(Looks for curiosity and initiative)',
  },
  {
    id: 'q2',
    number: '02',
    text: '"How do you stay up to date with new trends or tools in your field? Have you come across anything AI-related?"',
    subtext: '(Assesses awareness and interest)',
  },
  {
    id: 'q3',
    number: '03',
    text: '"Have you experimented with any AI tools, even casually? (e.g., ChatGPT, image generators, automation bots)"',
    subtext: '(Gauges willingness to experiment)',
  },
  {
    id: 'q4',
    number: '04',
    text: '"Can you think of a repetitive or time-consuming task in your role that could benefit from automation or AI?"',
    subtext: '(Tests ability to identify practical AI opportunities)',
  },
  {
    id: 'q5',
    number: '05',
    text: '"Tell me about a time you had to change your way of working because of a new process or tool. How did you respond?"',
    subtext: '(Evaluates adaptability)',
  },
  {
    id: 'q6',
    number: '06',
    text: '"Can you open an AI tool of your choice and show me how you would use it to solve something or get a result? Pls walk me through the process, step by step"',
    subtext: '', // No subtext in image for Q6
  },
];

interface QuestionListProps {
  className?: string;
  onRelevanceChange?: (questionId: string, relevance: Partial<QuestionRelevance>) => void;
}

const QuestionList: React.FC<QuestionListProps> = ({ className, onRelevanceChange }) => {
  const [questionsRelevance, setQuestionsRelevance] = useState<Record<string, QuestionRelevance>>(
    initialQuestionsData.reduce((acc, q) => {
      acc[q.id] = { relevant: false, nonRelevant: false };
      // Mimic initial state from image
      if (q.id === 'q1') acc[q.id] = { relevant: true, nonRelevant: false };
      if (q.id === 'q2') acc[q.id] = { relevant: false, nonRelevant: true };
      if (q.id === 'q3') acc[q.id] = { relevant: true, nonRelevant: false };
      if (q.id === 'q4') acc[q.id] = { relevant: false, nonRelevant: true };
      if (q.id === 'q5') acc[q.id] = { relevant: true, nonRelevant: false };
      if (q.id === 'q6') acc[q.id] = { relevant: false, nonRelevant: true };
      return acc;
    }, {} as Record<string, QuestionRelevance>)
  );

  const handleRelevanceToggle = useCallback((questionId: string, type: 'relevant' | 'nonRelevant') => {
    setQuestionsRelevance(prev => {
      const current = prev[questionId];
      let newRelevance: Partial<QuestionRelevance>;
      if (type === 'relevant') {
        newRelevance = { relevant: !current.relevant, nonRelevant: current.relevant ? true : false }; // if relevant becomes true, nonRelevant becomes false
      } else {
        newRelevance = { nonRelevant: !current.nonRelevant, relevant: current.nonRelevant ? true : false }; // if nonRelevant becomes true, relevant becomes false
      }
      
      const updatedRelevance = { ...current, ...newRelevance };
      if (updatedRelevance.relevant && type === 'relevant') updatedRelevance.nonRelevant = false;
      if (updatedRelevance.nonRelevant && type === 'nonRelevant') updatedRelevance.relevant = false;

      if (onRelevanceChange) {
        onRelevanceChange(questionId, updatedRelevance);
      }
      return { ...prev, [questionId]: updatedRelevance };
    });
  }, [onRelevanceChange]);

  return (
    <Card className={cn('w-full bg-card text-card-foreground', className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-end items-center space-x-16 pr-4">
          <CardTitle className="text-sm font-medium text-primary">Relevant</CardTitle>
          <CardTitle className="text-sm font-medium text-primary">Non-Relevant</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {initialQuestionsData.map((question) => (
          <div key={question.id} className="grid grid-cols-[auto_1fr_auto_auto] items-start gap-x-4 gap-y-1 py-3 border-b border-border last:border-b-0">
            <span className="text-2xl font-bold text-prd-accentTeal pt-px">{question.number}</span>
            <div className="flex flex-col">
              <p className="text-base text-foreground">{question.text}</p>
              {question.subtext && <p className="text-xs text-muted-foreground mt-1">{question.subtext}</p>}
            </div>
            <div className="flex items-center justify-center pt-1 mx-auto min-w-[80px]">
              <Checkbox
                id={`${question.id}-relevant`}
                checked={questionsRelevance[question.id]?.relevant}
                onCheckedChange={() => handleRelevanceToggle(question.id, 'relevant')}
                className="w-6 h-6 data-[state=checked]:bg-prd-accentGreen data-[state=checked]:text-black border-2 border-border focus-visible:ring-ring focus-visible:ring-offset-background"
                aria-label={`Mark question ${question.number} as relevant`}
              />
            </div>
            <div className="flex items-center justify-center pt-1 mx-auto min-w-[80px]">
              <Checkbox
                id={`${question.id}-non-relevant`}
                checked={questionsRelevance[question.id]?.nonRelevant}
                onCheckedChange={() => handleRelevanceToggle(question.id, 'nonRelevant')}
                className="w-6 h-6 data-[state=checked]:bg-prd-accentGreen data-[state=checked]:text-black border-2 border-border focus-visible:ring-ring focus-visible:ring-offset-background"
                aria-label={`Mark question ${question.number} as non-relevant`}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default QuestionList;
