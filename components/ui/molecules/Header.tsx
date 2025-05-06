"use client";
import React from "react";
import UserAvatar from "@/components/ui/atoms/UserAvatar";
import { SidebarTrigger } from "../sidebar";

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md">
      <div className="px-4 md:px-8 lg:px-14 h-16 flex w-full items-center justify-between">
        <SidebarTrigger />
        <UserAvatar />
      </div>
    </header>
  );
};

export default Header;
