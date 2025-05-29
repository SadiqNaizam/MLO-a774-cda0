import React, { useState, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

export type AIQLevel = 'High' | 'Medium' | 'Low' | null;

interface AssessmentResultProps {
  className?: string;
  initialLevel?: AIQLevel;
  // In a real app, relevantScores would be calculated from QuestionList state
  relevantScoresCount?: number; 
}

const aiqChartData = [
  { name: 'Curiosity & Initiative', score: 0 },
  { name: 'AI Awareness', score: 0 },
  { name: 'Experimentation', score: 0 },
  { name: 'Practical Identification', score: 0 },
  { name: 'Adaptability', score: 0 },
  { name: 'Hands-on Application', score: 0 },
];

// Function to update chart data based on relevant scores (example)
const generateChartData = (relevantCount: number): typeof aiqChartData => {
  const baseScores = [70, 85, 60, 75, 90, 50]; // Max possible for each category
  const factor = relevantCount / 6; // Max 6 relevant questions
  return aiqChartData.map((item, index) => ({
    ...item,
    score: Math.round(baseScores[index] * (0.2 + factor * 0.8) * (Math.random() * 0.4 + 0.8)), // Add some variance
  }));
};

const AssessmentResult: React.FC<AssessmentResultProps> = ({ 
  className, 
  initialLevel = 'Low', 
  relevantScoresCount = 2 // Default to 2 to show 'Low' based on image and some chart data
}) => {
  const [selectedLevel, setSelectedLevel] = useState<AIQLevel>(initialLevel);
  const [chartData, setChartData] = useState(generateChartData(relevantScoresCount));

  const levels: AIQLevel[] = ['High' as const, 'Medium' as const, 'Low' as const];

  useEffect(() => {
    // This is a simplified auto-calculation logic. 
    // A real app would have more complex criteria.
    let calculatedLevel: AIQLevel = 'Low';
    if (relevantScoresCount >= 5) {
      calculatedLevel = 'High';
    } else if (relevantScoresCount >= 3) {
      calculatedLevel = 'Medium';
    }
    setSelectedLevel(calculatedLevel);
    setChartData(generateChartData(relevantScoresCount));
  }, [relevantScoresCount]);

  const handleLevelChange = useCallback((level: AIQLevel) => {
    // Allow manual override, though it's primarily auto-calculated
    setSelectedLevel(prevLevel => prevLevel === level ? null : level);
  }, []);

  return (
    <Card className={cn('w-full bg-card text-card-foreground', className)}>
      <CardHeader>
        <CardTitle className="text-lg">AIQ Level & Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-6">
          <span className="font-semibold text-foreground">AIQ Level:</span>
          {levels.map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <Checkbox
                id={`aiq-${level}`}
                checked={selectedLevel === level}
                onCheckedChange={() => handleLevelChange(level)}
                className="w-5 h-5 data-[state=checked]:bg-prd-accentGreen data-[state=checked]:text-black border-2 border-border focus-visible:ring-ring focus-visible:ring-offset-background"
              />
              <Label htmlFor={`aiq-${level}`} className="text-sm font-medium text-foreground">
                {level}
              </Label>
            </div>
          ))}
          <span className="text-xs text-muted-foreground ml-auto">(Auto calculated based on inputs)</span>
        </div>
        
        <div className="mt-4">
          <p className="text-sm text-secondary-foreground mb-2">
            Candidate's estimated AIQ profile based on responses:
          </p>
          {selectedLevel === 'High' && <p className="text-sm text-prd-accentGreen">Strong indication of AI-friendly talent. Demonstrates curiosity, awareness, and practical application ability.</p>}
          {selectedLevel === 'Medium' && <p className="text-sm text-yellow-400">Moderate indication. Shows some key AI-friendly traits but may need development in certain areas.</p>}
          {selectedLevel === 'Low' && <p className="text-sm text-prd-accentRed">Limited indication of current AI-friendly traits. Further exploration or development recommended.</p>}
          {!selectedLevel && <p className="text-sm text-muted-foreground">AIQ Level not determined or overridden.</p>}
        </div>

        <div className="h-64 w-full mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                angle={-30}
                textAnchor="end"
                height={50}
                interval={0}
              />
              <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} domain={[0, 100]} />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--popover))', 
                  borderColor: 'hsl(var(--border))',
                  color: 'hsl(var(--popover-foreground))'
                }}
                cursor={{ fill: 'hsla(var(--primary), 0.2)' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} payload={[{ value: 'Proficiency Score', type: 'square', color: 'hsl(var(--primary))' }]}/>
              <Bar dataKey="score" name="Proficiency Score" unit="%">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.score > 75 ? 'hsl(var(--accent))' : entry.score > 50 ? 'hsl(var(--primary))' : 'hsl(var(--destructive))'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssessmentResult;
