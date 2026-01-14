import { useCallback } from 'react';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

const formatTime = (seconds: number): string => {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const ProgressBar = ({ currentTime, duration, onSeek }: ProgressBarProps) => {
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    onSeek(newTime);
  }, [duration, onSeek]);

  const handleDrag = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons !== 1) return;
    handleClick(e);
  }, [handleClick]);

  return (
    <div className="w-full space-y-2">
      <div 
        className="relative h-2 progress-track rounded-full cursor-pointer group"
        onClick={handleClick}
        onMouseMove={handleDrag}
      >
        {/* Progress fill */}
        <div 
          className="absolute inset-y-0 left-0 progress-fill rounded-full transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
        
        {/* Hover thumb */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg"
          style={{ left: `calc(${progress}% - 8px)` }}
        />
      </div>
      
      {/* Time display */}
      <div className="flex justify-between text-xs mono-text text-muted-foreground">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
