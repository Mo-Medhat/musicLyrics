import React from "react";
import { Link } from "react-router-dom";
import PlayPause from "./PlayPause";
import SongBar from "./SongBar";

function RelatedSongs({ relatedSongs, artistData, artistId, isPlaying, activeSong, handlePauseClick, handlePlayClick,}) {

  return (
    <>
      <div className="flex flex-col">
        <h1 className="font-bold text-3xl text-white">Related Songs:</h1>

        <div className="mt-6 w-full flex flex-col">
          {relatedSongs?.map((song, idx) => (
            <>
              <SongBar
                key={`${song.key}-${artistId}`}
                song={song}
                idx={idx}
                artistId={artistId}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
              />
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default RelatedSongs;
