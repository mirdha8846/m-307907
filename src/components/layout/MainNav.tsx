
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Library, Search, Heart, PlusSquare, User, LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const MainNav = () => {
  const location = useLocation();
  const { toast } = useToast();
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    // This is where you'd actually implement logout functionality
  };

  return (
    <div className="flex flex-col h-full bg-sidebar p-4">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <span className="text-white font-bold text-lg">M</span>
        </div>
        <h1 className="text-xl font-bold">MusiSync</h1>
      </div>

      <nav className="flex-1 space-y-1">
        <Link
          to="/dashboard"
          className={`nav-link ${isActive("/dashboard") ? "active" : ""}`}
        >
          <Home size={20} />
          <span>Home</span>
        </Link>
        <Link
          to="/search"
          className={`nav-link ${isActive("/search") ? "active" : ""}`}
        >
          <Search size={20} />
          <span>Search</span>
        </Link>
        <Link
          to="/library"
          className={`nav-link ${isActive("/library") ? "active" : ""}`}
        >
          <Library size={20} />
          <span>Your Library</span>
        </Link>

        <div className="py-2"></div>

        <Link
          to="/liked"
          className={`nav-link ${isActive("/liked") ? "active" : ""}`}
        >
          <Heart size={20} />
          <span>Liked Songs</span>
        </Link>
        <Link
          to="/create-playlist"
          className={`nav-link ${isActive("/create-playlist") ? "active" : ""}`}
        >
          <PlusSquare size={20} />
          <span>Create Playlist</span>
        </Link>
      </nav>

      <div className="mt-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start">
              <User size={20} className="mr-2" />
              <span>John Doe</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to="/profile" className="flex items-center w-full">
                <User size={16} className="mr-2" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut size={16} className="mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default MainNav;
