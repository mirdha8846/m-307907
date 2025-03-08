
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MusicCardProps {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  isLiked?: boolean;
  onPlay?: () => void;
  onLike?: () => void;
}

const MusicCard = ({
  id,
  title,
  artist,
  coverUrl,
  isLiked = false,
  onPlay,
  onLike,
}: MusicCardProps) => {
  return (
    <Card className="music-card group">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={coverUrl}
          alt={`${title} by ${artist}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full bg-primary hover:bg-primary/90 text-white"
            onClick={onPlay}
          >
            <Play fill="currentColor" size={16} />
          </Button>
        </div>
      </div>
      <CardContent className="p-3">
        <div className="flex justify-between items-start">
          <div className="overflow-hidden">
            <h3 className="font-semibold truncate">{title}</h3>
            <p className="text-sm text-muted-foreground truncate">{artist}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-primary"
            onClick={onLike}
          >
            <Heart
              size={16}
              className={isLiked ? "fill-primary text-primary" : ""}
            />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MusicCard;
