
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import MainNav from "./MainNav";
import MusicPlayer from "../player/MusicPlayer";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 z-50 md:hidden"
          onClick={toggleSidebar}
        >
          <Menu size={24} />
        </Button>
        
        {/* Sidebar - hidden on mobile by default but can be toggled */}
        <div 
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 w-64 h-full fixed md:relative z-40 transition-transform duration-300 ease-in-out`}
        >
          <MainNav />
        </div>
        
        {/* Main content */}
        <div className="flex-1 overflow-auto w-full">
          <main className="p-6 md:p-6 pt-16 md:pt-6">
            <Outlet />
          </main>
        </div>
      </div>
      
      {/* Music player fixed at bottom */}
      <MusicPlayer className="z-50" />
    </div>
  );
};

export default AppLayout;
