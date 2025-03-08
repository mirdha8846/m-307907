
import React, { useState } from "react";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Heart,
  Repeat,
  Shuffle
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface MusicPlayerProps {
  className?: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ className }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // 3 minutes in seconds
  const [volume, setVolume] = useState(80);
  const [isLiked, setIsLiked] = useState(false);
  const { toast } = useToast();

  // Mock data for the currently playing song
  const currentSong = {
    title: "Blinding Lights",
    artist: "The Weeknd",
    coverUrl: "https://picsum.photos/seed/song1/300/300",
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    toast({
      title: isPlaying ? "Paused" : "Now Playing",
      description: `${currentSong.title} by ${currentSong.artist}`,
    });
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleTimeChange = (value: number[]) => {
    setCurrentTime(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (value[0] === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Removed from Liked Songs" : "Added to Liked Songs",
      description: `${currentSong.title} by ${currentSong.artist}`,
    });
  };

  const handlePrevious = () => {
    toast({
      title: "Previous Track",
      description: "Playing previous song",
    });
  };

  const handleNext = () => {
    toast({
      title: "Next Track",
      description: "Playing next song",
    });
  };

  return (
    <div className={`w-full px-4 py-3 bg-card border-t flex items-center ${className}`}>
      <div className="flex items-center w-1/4 min-w-64">
        <img 
          src={currentSong.coverUrl} 
          alt={currentSong.title} 
          className="h-12 w-12 rounded object-cover mr-3 hidden sm:block" 
        />
        <div className="overflow-hidden">
          <h4 className="font-semibold text-sm truncate">{currentSong.title}</h4>
          <p className="text-xs text-muted-foreground truncate">{currentSong.artist}</p>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="ml-2 text-muted-foreground"
          onClick={toggleLike}
        >
          <Heart className={isLiked ? "fill-primary text-primary" : ""} size={18} />
        </Button>
      </div>

      <div className="flex-1 px-4 mx-4">
        <div className="flex justify-center items-center gap-3 mb-1">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Shuffle size={18} />
          </Button>
          <Button variant="ghost" size="icon" onClick={handlePrevious}>
            <SkipBack size={18} />
          </Button>
          <Button 
            size="icon" 
            className="bg-primary hover:bg-primary/90"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </Button>
          <Button variant="ghost" size="icon" onClick={handleNext}>
            <SkipForward size={18} />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Repeat size={18} />
          </Button>
        </div>
        <div className="flex items-center gap-2 w-full">
          <span className="text-xs text-muted-foreground w-10 text-right">
            {formatTime(currentTime)}
          </span>
          <Slider
            value={[currentTime]}
            max={duration}
            step={1}
            onValueChange={handleTimeChange}
            className="flex-1"
          />
          <span className="text-xs text-muted-foreground w-10">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      <div className="w-1/6 min-w-24 hidden md:flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggleMute} className="text-muted-foreground">
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </Button>
        <Slider
          value={[isMuted ? 0 : volume]}
          max={100}
          onValueChange={handleVolumeChange}
          className="w-24"
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
