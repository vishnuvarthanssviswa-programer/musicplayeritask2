import { useRef } from 'react';
import { ListMusic, Plus, X, HardDrive } from 'lucide-react';
import { Song } from '@/data/playlist';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface PlaylistProps {
  songs: Song[];
  currentIndex: number;
  isPlaying: boolean;
  onSelectSong: (index: number) => void;
  isAutoplay: boolean;
  onToggleAutoplay: () => void;
  onAddLocalFiles: (files: FileList) => number;
  onRemoveSong: (songId: number) => void;
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
  onAddLocalFiles,
  onRemoveSong,
}: PlaylistProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const count = onAddLocalFiles(files);
      if (count > 0) {
        toast.success(`Added ${count} song${count > 1 ? 's' : ''} to playlist`);
      } else {
        toast.error('No valid audio files found');
      }
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-4 w-full max-w-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <ListMusic size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">Playlist</h3>
          <span className="text-xs text-muted-foreground">({songs.length})</span>
        </div>
        <div className="flex items-center gap-2">
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
      </div>

      {/* Add Local Files Button */}
      <div className="mb-4 px-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          id="audio-upload"
        />
        <label 
          htmlFor="audio-upload"
          className="flex items-center justify-center gap-2 w-full p-3 rounded-xl border-2 border-dashed border-muted-foreground/30 text-muted-foreground hover:border-primary hover:text-primary transition-all duration-200 cursor-pointer group"
        >
          <Plus size={18} className="group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium">Add Local Music Files</span>
        </label>
      </div>
      
      {/* Song list */}
      <div className="space-y-1 max-h-72 overflow-y-auto scrollbar-thin">
        {songs.map((song, index) => (
          <div
            key={song.id}
            className={cn(
              "relative group flex items-center gap-3 p-3 rounded-xl text-left playlist-item cursor-pointer",
              index === currentIndex && "active"
            )}
            onClick={() => onSelectSong(index)}
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
              {/* Local file indicator */}
              {song.isLocal && (
                <div className="absolute bottom-0 right-0 bg-secondary/90 p-0.5 rounded-tl">
                  <HardDrive size={10} className="text-secondary-foreground" />
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
            
            {/* Duration & Remove */}
            <div className="flex items-center gap-2">
              <span className="text-xs mono-text text-muted-foreground flex-shrink-0">
                {song.duration > 0 ? formatDuration(song.duration) : '--:--'}
              </span>
              
              {/* Remove button for local files */}
              {song.isLocal && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveSong(song.id);
                    toast.info(`Removed "${song.title}"`);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-all"
                  aria-label="Remove song"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty state for local files hint */}
      {songs.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No songs in playlist</p>
          <p className="text-sm mt-1">Add some local files to get started!</p>
        </div>
      )}
    </div>
  );
};

export default Playlist;
