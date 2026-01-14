import { Music, ListMusic } from 'lucide-react';
import { Song } from '@/data/playlist';
import { cn } from '@/lib/utils';

interface PlaylistProps {
  songs: Song[];
  currentIndex: number;
  isPlaying: boolean;
  onSelectSong: (index: number) => void;
  isAutoplay: boolean;
  onToggleAutoplay: () => void;
}

const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const Playlist = ({ 
  songs, 
  currentIndex, 
  isPlaying,
  onSelectSong,
  isAutoplay,
  onToggleAutoplay,
}: PlaylistProps) => {
  return (
    <div className="glass-panel rounded-2xl p-4 w-full max-w-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <ListMusic size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">Playlist</h3>
        </div>
        <button 
          onClick={onToggleAutoplay}
          className={cn(
            "text-xs px-3 py-1 rounded-full transition-all duration-200",
            isAutoplay 
              ? "bg-primary/20 text-primary" 
              : "bg-muted text-muted-foreground"
          )}
        >
          Autoplay {isAutoplay ? 'On' : 'Off'}
        </button>
      </div>
      
      {/* Song list */}
      <div className="space-y-1 max-h-80 overflow-y-auto scrollbar-thin">
        {songs.map((song, index) => (
          <button
            key={song.id}
            onClick={() => onSelectSong(index)}
            className={cn(
              "w-full flex items-center gap-3 p-3 rounded-xl text-left playlist-item",
              index === currentIndex && "active"
            )}
          >
            {/* Album thumbnail */}
            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                src={song.cover} 
                alt={song.title}
                className="w-full h-full object-cover"
              />
              {index === currentIndex && isPlaying && (
                <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                  <div className="flex items-end gap-0.5 h-4">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-0.5 bg-primary rounded-full equalizer-bar"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Song info */}
            <div className="flex-1 min-w-0">
              <p className={cn(
                "font-medium truncate",
                index === currentIndex ? "text-primary" : "text-foreground"
              )}>
                {song.title}
              </p>
              <p className="text-sm text-muted-foreground truncate">
                {song.artist}
              </p>
            </div>
            
            {/* Duration */}
            <span className="text-xs mono-text text-muted-foreground flex-shrink-0">
              {formatDuration(song.duration)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Playlist;
