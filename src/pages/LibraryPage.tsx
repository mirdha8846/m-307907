
import React, { useState } from "react";
import PlaylistGrid from "@/components/PlaylistGrid";
import MusicGrid from "@/components/MusicGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LibraryPage = () => {
  const [playlists, setPlaylists] = useState([
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
    {
      id: "4",
      name: "Road Trip",
      coverUrl: "https://picsum.photos/seed/playlist4/300/300",
      songCount: 18,
    },
    {
      id: "5",
      name: "Study Focus",
      coverUrl: "https://picsum.photos/seed/playlist5/300/300",
      songCount: 42,
    },
  ]);

  const [recentlyPlayed, setRecentlyPlayed] = useState([
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
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Library</h1>

      <Tabs defaultValue="playlists" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
          <TabsTrigger value="history">Listening History</TabsTrigger>
        </TabsList>
        <TabsContent value="playlists">
          <PlaylistGrid playlists={playlists} />
        </TabsContent>
        <TabsContent value="history">
          <MusicGrid
            songs={recentlyPlayed}
            title="Recently Played"
            emptyMessage="Your listening history will appear here"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LibraryPage;
