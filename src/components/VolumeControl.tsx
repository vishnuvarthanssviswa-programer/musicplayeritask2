import { Volume2, VolumeX, Volume1 } from 'lucide-react';
import { useCallback } from 'react';

interface VolumeControlProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (volume: number) => void;
  onToggleMute: () => void;
}

const VolumeControl = ({ volume, isMuted, onVolumeChange, onToggleMute }: VolumeControlProps) => {
  const displayVolume = isMuted ? 0 : volume;

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    onVolumeChange(percentage);
  }, [onVolumeChange]);

  const handleDrag = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons !== 1) return;
    handleClick(e);
  }, [handleClick]);

  const VolumeIcon = isMuted || volume === 0 
    ? VolumeX 
    : volume < 0.5 
      ? Volume1 
      : Volume2;

  return (
    <div className="flex items-center gap-3">
      <button 
        onClick={onToggleMute}
        className="control-button p-1"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        <VolumeIcon size={20} />
      </button>
      
      <div 
        className="w-24 h-1.5 progress-track rounded-full cursor-pointer group relative"
        onClick={handleClick}
        onMouseMove={handleDrag}
      >
        <div 
          className="absolute inset-y-0 left-0 progress-fill rounded-full transition-all duration-100"
          style={{ width: `${displayVolume * 100}%` }}
        />
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg"
          style={{ left: `calc(${displayVolume * 100}% - 6px)` }}
        />
      </div>
    </div>
  );
};

export default VolumeControl;
