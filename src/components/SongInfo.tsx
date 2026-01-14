import { Song } from '@/data/playlist';

interface SongInfoProps {
  song: Song;
}

const SongInfo = ({ song }: SongInfoProps) => {
  return (
    <div className="text-center space-y-2 animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
        {song.title}
      </h2>
      <p className="text-lg text-muted-foreground">
        {song.artist}
      </p>
      <p className="text-sm text-muted-foreground/70">
        {song.album}
      </p>
    </div>
  );
};

export default SongInfo;
