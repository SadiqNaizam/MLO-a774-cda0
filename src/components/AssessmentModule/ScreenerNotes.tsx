import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ScreenerNotesProps {
  className?: string;
  initialNotes?: string;
  onNotesChange?: (notes: string) => void;
}

const ScreenerNotes: React.FC<ScreenerNotesProps> = ({ 
  className, 
  initialNotes = '',
  onNotesChange 
}) => {
  const [notes, setNotes] = useState<string>(initialNotes);

  const handleNotesChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = event.target.value;
    setNotes(newNotes);
    if (onNotesChange) {
      onNotesChange(newNotes);
    }
  }, [onNotesChange]);

  return (
    <Card className={cn('w-full bg-card text-card-foreground', className)}>
      <CardHeader>
        <CardTitle className="text-lg">Screener Notes / Comments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="screener-notes" className="sr-only">Screener Notes / Comments</Label>
          <Textarea
            id="screener-notes"
            placeholder="Enter qualitative feedback, observations, and comments here..."
            value={notes}
            onChange={handleNotesChange}
            className="min-h-[150px] bg-input text-foreground border-border focus:ring-ring resize-y"
            rows={6}
          />
          <p className="text-xs text-muted-foreground">
            Provide detailed observations about the candidate's responses and overall AI aptitude.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScreenerNotes;
