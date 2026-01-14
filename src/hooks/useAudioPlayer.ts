import { useState, useRef, useEffect, useCallback } from 'react';
import { Song, defaultPlaylist } from '@/data/playlist';

export const useAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playlist, setPlaylist] = useState<Song[]>(defaultPlaylist);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const currentSong: Song = playlist[currentSongIndex];

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    const audio = audioRef.current;
    audio.src = currentSong.audio;
    audio.volume = isMuted ? 0 : volume;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play();
      } else if (isAutoplay) {
        playNext();
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentSongIndex, currentSong.audio]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const playNext = useCallback(() => {
    if (isShuffle) {
      let randomIndex = Math.floor(Math.random() * playlist.length);
      while (randomIndex === currentSongIndex && playlist.length > 1) {
        randomIndex = Math.floor(Math.random() * playlist.length);
      }
      setCurrentSongIndex(randomIndex);
    } else {
      setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
    }
    setIsPlaying(true);
  }, [currentSongIndex, isShuffle, playlist.length]);

  const playPrevious = useCallback(() => {
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
    } else {
      setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
      setIsPlaying(true);
    }
  }, [playlist.length]);

  const seekTo = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const changeVolume = useCallback((newVolume: number) => {
    setVolume(newVolume);
    if (newVolume > 0) setIsMuted(false);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(!isMuted);
  }, [isMuted]);

  const playSong = useCallback((index: number) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
  }, []);

  const toggleAutoplay = useCallback(() => {
    setIsAutoplay(!isAutoplay);
  }, [isAutoplay]);

  const toggleShuffle = useCallback(() => {
    setIsShuffle(!isShuffle);
  }, [isShuffle]);

  const toggleRepeat = useCallback(() => {
    setIsRepeat(!isRepeat);
  }, [isRepeat]);

  const addLocalFiles = useCallback((files: FileList) => {
    const newSongs: Song[] = [];
    
    Array.from(files).forEach((file, index) => {
      if (file.type.startsWith('audio/')) {
        const audioUrl = URL.createObjectURL(file);
        const fileName = file.name.replace(/\.[^/.]+$/, ''); // Remove extension
        
        // Try to parse artist - title format, otherwise use filename
        const parts = fileName.split(' - ');
        const title = parts.length > 1 ? parts[1] : fileName;
        const artist = parts.length > 1 ? parts[0] : 'Unknown Artist';
        
        const newSong: Song = {
          id: Date.now() + index,
          title: title.trim(),
          artist: artist.trim(),
          album: 'Local Files',
          duration: 0, // Will be updated when audio loads
          cover: 'https://images.unsplash.com/photo-1618609378039-b572f64c5b42?w=400&h=400&fit=crop',
          audio: audioUrl,
          isLocal: true,
        };
        
        // Get actual duration
        const tempAudio = new Audio(audioUrl);
        tempAudio.addEventListener('loadedmetadata', () => {
          setPlaylist(prev => prev.map(s => 
            s.id === newSong.id ? { ...s, duration: Math.floor(tempAudio.duration) } : s
          ));
        });
        
        newSongs.push(newSong);
      }
    });
    
    if (newSongs.length > 0) {
      setPlaylist(prev => [...prev, ...newSongs]);
    }
    
    return newSongs.length;
  }, []);

  const removeSong = useCallback((songId: number) => {
    setPlaylist(prev => {
      const index = prev.findIndex(s => s.id === songId);
      const song = prev[index];
      
      // Revoke object URL if it's a local file
      if (song?.isLocal) {
        URL.revokeObjectURL(song.audio);
      }
      
      const newPlaylist = prev.filter(s => s.id !== songId);
      
      // Adjust current index if needed
      if (index < currentSongIndex) {
        setCurrentSongIndex(curr => curr - 1);
      } else if (index === currentSongIndex && newPlaylist.length > 0) {
        setCurrentSongIndex(0);
        setIsPlaying(false);
      }
      
      return newPlaylist;
    });
  }, [currentSongIndex]);

  return {
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
    addLocalFiles,
    removeSong,
  };
};
