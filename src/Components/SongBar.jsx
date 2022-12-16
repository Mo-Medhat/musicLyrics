import React from "react";
import { Link } from "react-router-dom";
import PlayPause from "./PlayPause";

function SongBar({
  song,
  idx,
  artistId,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) {

  
  return (
    <>
      <div
        key={idx}
        className="w-full flex flex-row
    items-center hover:bg-[#4c426e] py-2
    p-4 rounded-lg cursor-pointer mb-2"
      >
        <h3 className="font-bold text-base text-white mr-3">{idx + 1}.</h3>
        <div className="flex-1 flex flex-row justify-between items-center">
          <img
            src={
              artistId
                ? song?.attributes?.artwork?.url
                    .replace("{w}", "125")
                    .replace("{h}", "125")
                : song?.images?.coverart
            }
            className="w-20 h-20 rounded-lg"
            alt={song?.title}
          />
          <div className="flex-1 flex flex-col justify-center mx-3">
            {!artistId ? (
              <>
                <Link to={`/songs/${song.key}`}>
                  <p className="text-xl font-bold text-white">{song?.title}</p>
                </Link>
              </>
            ) : (
              <>
                <p className="text-xl font-bold text-white">
                  {song?.attributes?.name}
                </p>
              </>
            )}
                <p className="text-base text-gray-200 mt-1">
                  {artistId ? song?.attributes?.albumName : song?.subtitle}
                </p>
          </div>
        </div>

        {!artistId ? (
          <>
            <PlayPause
              isPlaying={isPlaying}
              activeSong={activeSong}
              song={song}
              handlePause={handlePauseClick}
              handlePlay={() => handlePlayClick(song, idx)}
            />
          </>
        ) : null}
      </div>
    </>
  );
}

export default SongBar;
