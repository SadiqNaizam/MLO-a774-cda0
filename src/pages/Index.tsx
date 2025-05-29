import React, { useState, useCallback } from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import QuestionList from '../components/AssessmentModule/QuestionList';
import AssessmentResult from '../components/AssessmentModule/AssessmentResult';
import ScreenerNotes from '../components/AssessmentModule/ScreenerNotes';

// Interface for QuestionRelevance, mirroring what QuestionList emits via onRelevanceChange
interface QuestionRelevance {
  relevant: boolean;
  nonRelevant: boolean;
}

const IndexPage: React.FC = () => {
  // State for screener notes
  const [screenerNotes, setScreenerNotes] = useState<string>('');

  // Initial state for question relevance, based on QuestionList's internal initial setup.
  // This ensures the page's understanding of relevance is synchronized from the start.
  const initialRelevanceStates: Record<string, QuestionRelevance> = {
    'q1': { relevant: true, nonRelevant: false }, // From QuestionList.tsx initial state
    'q2': { relevant: false, nonRelevant: true },// From QuestionList.tsx initial state
    'q3': { relevant: true, nonRelevant: false },// From QuestionList.tsx initial state
    'q4': { relevant: false, nonRelevant: true },// From QuestionList.tsx initial state
    'q5': { relevant: true, nonRelevant: false },// From QuestionList.tsx initial state
    'q6': { relevant: false, nonRelevant: true },// From QuestionList.tsx initial state
  };

  // Mirrored state of question relevance from QuestionList.
  // Updated via handleRelevanceChange callback.
  const [relevantQuestionStates, setRelevantQuestionStates] = useState<Record<string, QuestionRelevance>>(initialRelevanceStates);
  
  // State for the count of relevant questions, derived from relevantQuestionStates.
  // Initialized by calculating from initialRelevanceStates.
  const [relevantScoresCount, setRelevantScoresCount] = useState<number>(() => {
    return Object.values(initialRelevanceStates).filter(state => state.relevant).length;
  });

  // Callback for QuestionList to report changes in question relevance.
  const handleRelevanceChange = useCallback((questionId: string, newRelevanceForQuestion: QuestionRelevance) => {
    // newRelevanceForQuestion is the complete, updated relevance state for the specific question, 
    // as emitted by QuestionList's onRelevanceChange handler.
    setRelevantQuestionStates(prevStates => {
      const updatedStates = { ...prevStates, [questionId]: newRelevanceForQuestion };
      
      // Recalculate relevantScoresCount based on the newly updated relevantQuestionStates
      const count = Object.values(updatedStates).filter(state => state.relevant).length;
      setRelevantScoresCount(count);
      
      return updatedStates;
    });
  }, []);

  // Callback for ScreenerNotes to update notes state in the page
  const handleNotesChange = useCallback((notes: string) => {
    setScreenerNotes(notes);
  }, []);

  return (
    <MainAppLayout>
      {/* 
        The MainAppLayout's <main> element already provides:
        - flex flex-col: Stacks children vertically
        - gap-6: Adds space between child components
        - p-6: Padding around the content area
        - bg-card: Background color for the main content area
        Therefore, QuestionList, AssessmentResult, and ScreenerNotes will be arranged accordingly.
      */}
      
      <QuestionList 
        onRelevanceChange={handleRelevanceChange}
        // QuestionList manages its own display state and initial data internally.
        // It calls onRelevanceChange to notify this parent page of any relevance updates.
        // The relevantQuestionStates in this page acts as a synchronized mirror to derive relevantScoresCount.
      />

      <AssessmentResult 
        relevantScoresCount={relevantScoresCount}
        // AssessmentResult uses relevantScoresCount to auto-calculate and display the AIQ Level.
        // Based on QuestionList's initial state (Q1, Q3, Q5 relevant), relevantScoresCount will be 3.
        // According to AssessmentResult's logic, this will result in an initial AIQ Level of 'Medium'.
      />

      <ScreenerNotes 
        initialNotes={screenerNotes} 
        onNotesChange={handleNotesChange} 
      />
    </MainAppLayout>
  );
};

export default IndexPage;
