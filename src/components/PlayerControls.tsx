import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlayerControlsProps {
  isPlaying: boolean;
  isShuffle: boolean;
  isRepeat: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onToggleShuffle: () => void;
  onToggleRepeat: () => void;
}

const PlayerControls = ({
  isPlaying,
  isShuffle,
  isRepeat,
  onTogglePlay,
  onNext,
  onPrevious,
  onToggleShuffle,
  onToggleRepeat,
}: PlayerControlsProps) => {
  return (
    <div className="flex items-center justify-center gap-6">
      {/* Shuffle */}
      <button 
        onClick={onToggleShuffle}
        className={cn(
          "control-button p-2",
          isShuffle && "text-primary"
        )}
        aria-label="Toggle shuffle"
      >
        <Shuffle size={20} />
      </button>

      {/* Previous */}
      <button 
        onClick={onPrevious}
        className="control-button p-2"
        aria-label="Previous track"
      >
        <SkipBack size={24} fill="currentColor" />
      </button>

      {/* Play/Pause */}
      <button 
        onClick={onTogglePlay}
        className="gradient-button p-4 rounded-full text-primary-foreground"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <Pause size={28} fill="currentColor" />
        ) : (
          <Play size={28} fill="currentColor" className="ml-1" />
        )}
      </button>

      {/* Next */}
      <button 
        onClick={onNext}
        className="control-button p-2"
        aria-label="Next track"
      >
        <SkipForward size={24} fill="currentColor" />
      </button>

      {/* Repeat */}
      <button 
        onClick={onToggleRepeat}
        className={cn(
          "control-button p-2",
          isRepeat && "text-primary"
        )}
        aria-label="Toggle repeat"
      >
        <Repeat size={20} />
      </button>
    </div>
  );
};

export default PlayerControls;
