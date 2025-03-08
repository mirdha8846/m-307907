
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import MusicGrid from "@/components/MusicGrid";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const allSongs = [
    {
      id: "1",
      title: "Blinding Lights",
      artist: "The Weeknd",
      coverUrl: "https://picsum.photos/seed/song1/300/300",
      isLiked: false,
    },
    {
      id: "2",
      title: "Bad Guy",
      artist: "Billie Eilish",
      coverUrl: "https://picsum.photos/seed/song2/300/300",
      isLiked: true,
    },
    {
      id: "3",
      title: "Don't Start Now",
      artist: "Dua Lipa",
      coverUrl: "https://picsum.photos/seed/song3/300/300",
      isLiked: false,
    },
    {
      id: "4",
      title: "Watermelon Sugar",
      artist: "Harry Styles",
      coverUrl: "https://picsum.photos/seed/song4/300/300",
      isLiked: false,
    },
    {
      id: "5",
      title: "Levitating",
      artist: "Dua Lipa",
      coverUrl: "https://picsum.photos/seed/song5/300/300",
      isLiked: true,
    },
    {
      id: "6",
      title: "Save Your Tears",
      artist: "The Weeknd",
      coverUrl: "https://picsum.photos/seed/song6/300/300",
      isLiked: false,
    },
    {
      id: "7",
      title: "Peaches",
      artist: "Justin Bieber",
      coverUrl: "https://picsum.photos/seed/song7/300/300",
      isLiked: false,
    },
    {
      id: "8",
      title: "Stay",
      artist: "The Kid LAROI & Justin Bieber",
      coverUrl: "https://picsum.photos/seed/song8/300/300",
      isLiked: true,
    },
  ];

  // Mock search function
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    // Simulate API call delay
    setTimeout(() => {
      const filteredResults = allSongs.filter(
        (song) =>
          song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.artist.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults(filteredResults);
      setIsSearching(false);
    }, 500);
  };

  // Search when the user stops typing
  React.useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const toggleLiked = (songId: string) => {
    setSearchResults(
      searchResults.map((song) =>
        song.id === songId ? { ...song, isLiked: !song.isLiked } : song
      )
    );
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Search</h1>

      <div className="relative max-w-2xl mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for songs, artists, or albums"
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {isSearching ? (
        <div className="py-10 text-center text-muted-foreground">
          Searching...
        </div>
      ) : searchQuery ? (
        <MusicGrid
          songs={searchResults}
          title={`Results for "${searchQuery}"`}
          emptyMessage="No results found"
          onLike={toggleLiked}
        />
      ) : (
        <div className="py-10 text-center text-muted-foreground">
          Start typing to search for music
        </div>
      )}
    </div>
  );
};

export default SearchPage;
