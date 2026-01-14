export interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  cover: string;
  audio: string;
  isLocal?: boolean;
}

export const defaultPlaylist: Song[] = [
  {
    id: 1,
    title: "Midnight Dreams",
    artist: "Lunar Echo",
    album: "Neon Horizons",
    duration: 234,
    cover: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=400&h=400&fit=crop",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: 2,
    title: "Electric Pulse",
    artist: "Synthwave Collective",
    album: "Digital Sunset",
    duration: 198,
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    id: 3,
    title: "Ocean Waves",
    artist: "Ambient Flow",
    album: "Serenity",
    duration: 312,
    cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    id: 4,
    title: "City Lights",
    artist: "Urban Beats",
    album: "Metro Nights",
    duration: 267,
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  },
  {
    id: 5,
    title: "Starlight Serenade",
    artist: "Cosmic Journey",
    album: "Galaxies",
    duration: 289,
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
  }
];
