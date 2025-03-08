
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, MoreHorizontal, Play, Clock } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const PlaylistViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock playlist data based on ID
  const playlistData = {
    id: id || "1",
    name: id === "1" ? "Workout Mix" : id === "2" ? "Chill Vibes" : "My Playlist",
    description: "A collection of energetic songs to keep you motivated during workouts",
    coverUrl: `https://picsum.photos/seed/playlist${id}/300/300`,
    createdBy: "John Doe",
    createdAt: "2023-05-15",
    songs: [
      {
        id: "1",
        title: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        duration: "3:20",
        coverUrl: "https://picsum.photos/seed/song1/300/300",
        addedAt: "2023-05-15",
      },
      {
        id: "2",
        title: "Don't Start Now",
        artist: "Dua Lipa",
        album: "Future Nostalgia",
        duration: "3:03",
        coverUrl: "https://picsum.photos/seed/song3/300/300",
        addedAt: "2023-05-15",
      },
      {
        id: "3",
        title: "Watermelon Sugar",
        artist: "Harry Styles",
        album: "Fine Line",
        duration: "2:54",
        coverUrl: "https://picsum.photos/seed/song4/300/300",
        addedAt: "2023-05-15",
      }
    ]
  };

  // Mock available songs to add
  const availableSongs = [
    {
      id: "4",
      title: "Bad Guy",
      artist: "Billie Eilish",
      album: "When We All Fall Asleep, Where Do We Go?",
      duration: "3:14",
      coverUrl: "https://picsum.photos/seed/song2/300/300",
    },
    {
      id: "5",
      title: "Levitating",
      artist: "Dua Lipa",
      album: "Future Nostalgia",
      duration: "3:23",
      coverUrl: "https://picsum.photos/seed/song5/300/300",
    },
    {
      id: "6",
      title: "Save Your Tears",
      artist: "The Weeknd",
      album: "After Hours",
      duration: "3:35",
      coverUrl: "https://picsum.photos/seed/song6/300/300",
    },
  ];

  const handlePlaySong = (songId: string) => {
    const song = playlistData.songs.find((s) => s.id === songId);
    if (song) {
      toast({
        title: "Now Playing",
        description: `${song.title} by ${song.artist}`,
      });
    }
  };

  const handlePlayPlaylist = () => {
    toast({
      title: "Playing Playlist",
      description: playlistData.name,
    });
  };

  const handleAddSongs = () => {
    // Toggle search for adding songs
    setShowAddSongs(!showAddSongs);
  };

  const [showAddSongs, setShowAddSongs] = useState(false);

  const handleAddSongToPlaylist = (songId: string) => {
    const song = availableSongs.find((s) => s.id === songId);
    if (song) {
      toast({
        title: "Song Added",
        description: `${song.title} has been added to ${playlistData.name}`,
      });
    }
  };

  const filteredSongs = availableSongs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.album.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-64 aspect-square md:sticky md:top-6">
          <img
            src={playlistData.coverUrl}
            alt={playlistData.name}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{playlistData.name}</h1>
          <p className="text-muted-foreground mb-4">{playlistData.description}</p>
          <div className="text-sm text-muted-foreground mb-6">
            Created by {playlistData.createdBy} • {playlistData.songs.length} songs
          </div>
          <div className="flex flex-wrap gap-3">
            <Button onClick={handlePlayPlaylist} className="gap-2">
              <Play fill="currentColor" size={16} />
              Play
            </Button>
            <Button variant="outline" onClick={handleAddSongs} className="gap-2">
              <Plus size={16} />
              Add Songs
            </Button>
          </div>
        </div>
      </div>

      {showAddSongs && (
        <div className="mb-8 p-4 bg-muted/20 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Add Songs to Playlist</h3>
          <div className="relative max-w-md mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for songs to add"
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredSongs.map((song) => (
              <div key={song.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/30">
                <img src={song.coverUrl} alt={song.title} className="w-12 h-12 rounded" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{song.title}</div>
                  <div className="text-sm text-muted-foreground truncate">{song.artist}</div>
                </div>
                <Button size="sm" variant="ghost" onClick={() => handleAddSongToPlaylist(song.id)}>
                  <Plus size={16} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Album</TableHead>
              <TableHead className="hidden md:table-cell">Date Added</TableHead>
              <TableHead className="w-28">
                <div className="flex items-center justify-end">
                  <Clock size={16} />
                </div>
              </TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {playlistData.songs.map((song, index) => (
              <TableRow key={song.id} className="hover:bg-muted/20">
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={song.coverUrl}
                      alt={song.title}
                      className="w-10 h-10 rounded hidden sm:block"
                    />
                    <div>
                      <div className="font-medium">{song.title}</div>
                      <div className="text-sm text-muted-foreground">{song.artist}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{song.album}</TableCell>
                <TableCell className="hidden md:table-cell">{song.addedAt}</TableCell>
                <TableCell className="text-right">{song.duration}</TableCell>
                <TableCell>
                  <div className="flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handlePlaySong(song.id)}>Play</DropdownMenuItem>
                        <DropdownMenuItem>Add to Queue</DropdownMenuItem>
                        <DropdownMenuItem>Add to Another Playlist</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Remove from Playlist
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PlaylistViewPage;
