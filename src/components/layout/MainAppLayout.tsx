import React from 'react';
import { cn } from '@/lib/utils';
import Header from './Header'; // Relative import for Header component

interface MainAppLayoutProps {
  children: React.ReactNode; // Content to be rendered within the main layout
  className?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        // Overall layout structure: Grid with 3 rows (header, main, footer)
        // Full height of the viewport
        'min-h-screen grid grid-cols-1 grid-rows-[auto_1fr_auto] bg-background text-foreground',
        className
      )}
    >
      {/* Header: Fixed height, sticky at the top */}
      <Header />
      
      {/* Main content area: Takes remaining vertical space, scrollable */}
      {/* Styling based on Layout Requirements for 'mainContent': */}
      {/* - overflow-y-auto: Enables vertical scrolling if content exceeds available space */}
      {/* - bg-card: Background color for the main content area (maps to 'surface' color #1C1E29) */}
      {/* - p-6: Padding around the content */}
      {/* - flex flex-col gap-6: Arranges direct children vertically with spacing (e.g., page sections) */}
      <main 
        className={cn(
          'overflow-y-auto bg-card p-6 flex flex-col gap-6'
        )}
      >
        {children}
      </main>

      {/* Footer area: Fixed height */}
      {/* Styling based on Layout Requirements for 'footer': */}
      <footer 
        className={cn(
          'h-10 flex items-center justify-center px-4 sm:px-6 bg-background border-t border-border'
        )}
      >
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} AI Quotient (AIQ) Assessment. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default MainAppLayout;
