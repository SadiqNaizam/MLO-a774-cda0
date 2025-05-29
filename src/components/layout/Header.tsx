import React from 'react';
import { cn } from '@/lib/utils';
import { UserCircle, Settings, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  // Dummy user data for illustrative purposes.
  // In a real application, this would typically come from an authentication context or props.
  const user = { name: "Screener Name", email: "screener@example.com" };

  return (
    <header
      className={cn(
        'flex items-center justify-between px-4 sm:px-6 h-16 bg-background border-b border-border text-foreground sticky top-0 z-50',
        className
      )}
    >
      <div className="flex items-center gap-3">
        {/* Brand/Logo Text - From Project Info & Image */}
        <span className="text-2xl font-bold text-primary">ASCENDION</span>
        {/* Application Name from Project Info */}
        <div className="hidden md:flex items-center">
          <span className="border-l border-border h-6 mx-3" aria-hidden="true"></span>
          <span className="text-lg font-semibold text-foreground">
            AI Quotient (AIQ) Assessment
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {/* User menu - Example implementation */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
              <UserCircle className="h-7 w-7 text-muted-foreground hover:text-foreground transition-colors" />
              <span className="sr-only">Open user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
