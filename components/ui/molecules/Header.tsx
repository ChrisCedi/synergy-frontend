"use client";
import React from "react";

import UserAvatar from "@/components/ui/atoms/UserAvatar";
import { Button } from "@/components/ui/atoms/button";
import { Menu } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="icon" className="mr-1">
            <Menu className="h-5 w-5" />
          </Button>

          <p>logo</p>

          <nav className="hidden md:flex items-center gap-1">
            <Button variant="ghost" className="text-sm font-medium">
              Dashboard
            </Button>
            <Button variant="ghost" className="text-sm font-medium">
              Transactions
            </Button>
            <Button variant="ghost" className="text-sm font-medium">
              Reports
            </Button>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:flex text-sm"
          >
            New Balance
          </Button>
          <UserAvatar />
        </div>
      </div>
    </header>
  );
};

export default Header;
