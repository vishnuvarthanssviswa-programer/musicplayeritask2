import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import AlbumArt from './AlbumArt';
import SongInfo from './SongInfo';
import ProgressBar from './ProgressBar';
import PlayerControls from './PlayerControls';
import VolumeControl from './VolumeControl';
import Playlist from './Playlist';

const MusicPlayer = () => {
  const {
    currentSong,
    currentSongIndex,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isAutoplay,
    isShuffle,
    isRepeat,
    playlist,
    togglePlay,
    playNext,
    playPrevious,
    seekTo,
    changeVolume,
    toggleMute,
    playSong,
    toggleAutoplay,
    toggleShuffle,
    toggleRepeat,
  } = useAudioPlayer();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-8">
      {/* Background gradient */}
      <div 
        className="fixed inset-0 opacity-30 transition-all duration-1000"
        style={{
          backgroundImage: `radial-gradient(ellipse at center, hsl(var(--primary) / 0.2) 0%, transparent 70%)`,
        }}
      />
      
      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-16 w-full max-w-6xl">
        {/* Main player */}
        <div className="flex flex-col items-center gap-8 flex-1">
          {/* Album art */}
          <AlbumArt 
            cover={currentSong.cover}
            title={currentSong.title}
            isPlaying={isPlaying}
          />
          
          {/* Song info */}
          <SongInfo song={currentSong} />
          
          {/* Progress bar */}
          <div className="w-full max-w-md">
            <ProgressBar 
              currentTime={currentTime}
              duration={duration}
              onSeek={seekTo}
            />
          </div>
          
          {/* Controls */}
          <PlayerControls 
            isPlaying={isPlaying}
            isShuffle={isShuffle}
            isRepeat={isRepeat}
            onTogglePlay={togglePlay}
            onNext={playNext}
            onPrevious={playPrevious}
            onToggleShuffle={toggleShuffle}
            onToggleRepeat={toggleRepeat}
          />
          
          {/* Volume */}
          <VolumeControl 
            volume={volume}
            isMuted={isMuted}
            onVolumeChange={changeVolume}
            onToggleMute={toggleMute}
          />
        </div>
        
        {/* Playlist */}
        <Playlist 
          songs={playlist}
          currentIndex={currentSongIndex}
          isPlaying={isPlaying}
          onSelectSong={playSong}
          isAutoplay={isAutoplay}
          onToggleAutoplay={toggleAutoplay}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
