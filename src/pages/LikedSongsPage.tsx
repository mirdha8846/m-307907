
import React, { useState } from "react";
import MusicGrid from "@/components/MusicGrid";

const LikedSongsPage = () => {
  const [likedSongs, setLikedSongs] = useState([
    {
      id: "2",
      title: "Bad Guy",
      artist: "Billie Eilish",
      coverUrl: "https://picsum.photos/seed/song2/300/300",
      isLiked: true,
    },
    {
      id: "5",
      title: "Levitating",
      artist: "Dua Lipa",
      coverUrl: "https://picsum.photos/seed/song5/300/300",
      isLiked: true,
    },
    {
      id: "8",
      title: "Stay",
      artist: "The Kid LAROI & Justin Bieber",
      coverUrl: "https://picsum.photos/seed/song8/300/300",
      isLiked: true,
    },
  ]);

  const handleUnlike = (songId: string) => {
    setLikedSongs(likedSongs.filter(song => song.id !== songId));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Liked Songs</h1>
        <p className="text-muted-foreground">{likedSongs.length} songs</p>
      </div>

      <MusicGrid
        songs={likedSongs}
        onLike={handleUnlike}
        emptyMessage="Songs you like will appear here"
      />
    </div>
  );
};

export default LikedSongsPage;
