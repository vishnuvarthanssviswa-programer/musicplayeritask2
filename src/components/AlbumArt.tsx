import { cn } from '@/lib/utils';

interface AlbumArtProps {
  cover: string;
  title: string;
  isPlaying: boolean;
}

const AlbumArt = ({ cover, title, isPlaying }: AlbumArtProps) => {
  return (
    <div className="relative group">
      {/* Glow effect */}
      <div 
        className={cn(
          "absolute inset-0 rounded-2xl blur-2xl opacity-50 transition-opacity duration-500",
          isPlaying ? "animate-pulse-glow" : "opacity-30"
        )}
        style={{
          backgroundImage: `url(${cover})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Album cover */}
      <div className={cn(
        "relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500",
        isPlaying && "album-glow"
      )}>
        <img 
          src={cover} 
          alt={title}
          className={cn(
            "w-full h-full object-cover transition-transform duration-700",
            isPlaying && "scale-105"
          )}
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Playing indicator */}
        {isPlaying && (
          <div className="absolute bottom-4 right-4 flex items-end gap-1 h-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-primary rounded-full equalizer-bar"
                style={{
                  animationDelay: `${i * 0.15}s`,
                  height: '100%',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlbumArt;
