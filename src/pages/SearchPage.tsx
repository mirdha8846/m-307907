
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search, Music, Library, User } from "lucide-react";
import MusicGrid from "@/components/MusicGrid";
import PlaylistGrid from "@/components/PlaylistGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState("songs");
  const [searchResults, setSearchResults] = useState({
    songs: [] as any[],
    artists: [] as any[],
    playlists: [] as any[]
  });

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

  const allPlaylists = [
    {
      id: "1",
      name: "Workout Mix",
      coverUrl: "https://picsum.photos/seed/playlist1/300/300",
      songCount: 15,
    },
    {
      id: "2",
      name: "Chill Vibes",
      coverUrl: "https://picsum.photos/seed/playlist2/300/300",
      songCount: 24,
    },
    {
      id: "3",
      name: "Party Anthems",
      coverUrl: "https://picsum.photos/seed/playlist3/300/300",
      songCount: 32,
    },
  ];

  const allArtists = [
    {
      id: "1",
      name: "The Weeknd",
      coverUrl: "https://picsum.photos/seed/artist1/300/300",
      songCount: 25,
    },
    {
      id: "2",
      name: "Dua Lipa", 
      coverUrl: "https://picsum.photos/seed/artist2/300/300",
      songCount: 18,
    },
    {
      id: "3",
      name: "Justin Bieber",
      coverUrl: "https://picsum.photos/seed/artist3/300/300",
      songCount: 30,
    },
  ];

  // Mock search function
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults({
        songs: [],
        artists: [],
        playlists: []
      });
      return;
    }

    setIsSearching(true);

    // Simulate API call delay
    setTimeout(() => {
      const query = searchQuery.toLowerCase();
      
      // Filter songs
      const filteredSongs = allSongs.filter(
        (song) =>
          song.title.toLowerCase().includes(query) ||
          song.artist.toLowerCase().includes(query)
      );
      
      // Filter playlists
      const filteredPlaylists = allPlaylists.filter(
        (playlist) => playlist.name.toLowerCase().includes(query)
      );

      // Filter artists
      const filteredArtists = allArtists.filter(
        (artist) => artist.name.toLowerCase().includes(query)
      );
      
      setSearchResults({
        songs: filteredSongs,
        playlists: filteredPlaylists,
        artists: filteredArtists
      });
      setIsSearching(false);
    }, 500);
  };

  // Search when the user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const toggleLiked = (songId: string) => {
    setSearchResults(prev => ({
      ...prev,
      songs: prev.songs.map((song) =>
        song.id === songId ? { ...song, isLiked: !song.isLiked } : song
      )
    }));
  };

  // Calculate total results
  const totalResults = 
    searchResults.songs.length + 
    searchResults.playlists.length + 
    searchResults.artists.length;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Search</h1>

      <div className="relative max-w-2xl mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for songs, artists, or playlists"
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
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            {totalResults > 0 
              ? `Results for "${searchQuery}"`
              : `No results found for "${searchQuery}"`}
          </h2>
          
          {totalResults > 0 && (
            <Tabs defaultValue={activeTab} className="w-full" onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="songs" className="flex items-center gap-2">
                  <Music size={16} />
                  Songs ({searchResults.songs.length})
                </TabsTrigger>
                <TabsTrigger value="artists" className="flex items-center gap-2">
                  <User size={16} />
                  Artists ({searchResults.artists.length})
                </TabsTrigger>
                <TabsTrigger value="playlists" className="flex items-center gap-2">
                  <Library size={16} />
                  Playlists ({searchResults.playlists.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="songs">
                <MusicGrid
                  songs={searchResults.songs}
                  emptyMessage="No songs found"
                  onLike={toggleLiked}
                />
              </TabsContent>
              
              <TabsContent value="playlists">
                <PlaylistGrid
                  playlists={searchResults.playlists}
                  emptyMessage="No playlists found"
                />
              </TabsContent>
              
              <TabsContent value="artists">
                <PlaylistGrid
                  playlists={searchResults.artists.map(artist => ({
                    id: artist.id,
                    name: artist.name,
                    coverUrl: artist.coverUrl,
                    songCount: artist.songCount,
                  }))}
                  emptyMessage="No artists found"
                />
              </TabsContent>
            </Tabs>
          )}
        </div>
      ) : (
        <div className="py-10 text-center text-muted-foreground">
          Start typing to search for music
        </div>
      )}
    </div>
  );
};

export default SearchPage;
