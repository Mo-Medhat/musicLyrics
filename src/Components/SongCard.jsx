import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

function SongCard({song, idx, activeSong, isPlaying, data }) {
  
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, idx, data }));
    dispatch(playPause(true));
  };

  return (
    <>
      <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
        <div className="relative w-full h-56 group">
          <div
            className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
              activeSong?.title === song.title
                ? `flex bg-black bg-opacity-70`
                : `hidden`
            }`}
          >
            <PlayPause
              isPlaying={isPlaying}
              activeSong={activeSong}
              song={song}
              handlePause={handlePauseClick}
              handlePlay={handlePlayClick}
            />
          </div>
          <img src={song.images?.coverart || song?.track?.images?.coverart} alt="song_img" />
        </div>
        <div className="flex items-start flex-col mt-4 truncate">
          <p className="text-white text-semibold text-lg truncate">
            <Link to={`/songs/${song?.key}`}>{song.title || song?.track?.title}</Link>
          </p>
          <p className="text-gray-300 mt-1 text-sm truncate">
            <Link
              to={
                song.artist
                  ? `/artists/${song?.artist[0]?.adamid || song?.track?.artist[0]?.adamid}`
                  : `/top-artists`
              }
            >
              {song.subtitle || song?.track?.subtitle}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default SongCard;
