
import React, { useState } from "react";
import MusicGrid from "@/components/MusicGrid";
import PlaylistGrid from "@/components/PlaylistGrid";

const Dashboard = () => {
  // Mock data for demonstration
  const [recommendedSongs, setRecommendedSongs] = useState([
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
  ]);

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
  ]);

  const [recentlyPlayed, setRecentlyPlayed] = useState([
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

  // Toggle liked status
  const toggleLiked = (songId: string) => {
    // Handle recommended songs
    setRecommendedSongs(
      recommendedSongs.map((song) =>
        song.id === songId ? { ...song, isLiked: !song.isLiked } : song
      )
    );

    // Handle recently played
    setRecentlyPlayed(
      recentlyPlayed.map((song) =>
        song.id === songId ? { ...song, isLiked: !song.isLiked } : song
      )
    );
  };

  return (
    <div className="space-y-10">
      <section>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Good afternoon, John!</h1>
        </div>
        <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-2">
            Discover your daily music mix
          </h2>
          <p className="text-muted-foreground mb-4">
            Personalized songs picked just for you, based on your listening
            history
          </p>
        </div>
      </section>

      <section>
        <MusicGrid
          songs={recommendedSongs}
          title="Recommended for you"
          onLike={toggleLiked}
        />
      </section>

      <section>
        <PlaylistGrid playlists={playlists} title="Your playlists" />
      </section>

      <section>
        <MusicGrid
          songs={recentlyPlayed}
          title="Recently played"
          onLike={toggleLiked}
        />
      </section>
    </div>
  );
};

export default Dashboard;
