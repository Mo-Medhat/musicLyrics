import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import DetailsHeader from "./../Components/DetailsHeader";
import RelatedSongs from "./../Components/RelatedSongs";
import Loader from './../Components/Loader';

function SongDetails() {
  const { songid } = useParams();
  const [songData, setSongData] = useState(null);
  const [relatedSongs, setRelatedSongs] = useState(null);
  const dispatch = useDispatch()

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, idx) => {
    dispatch(setActiveSong({ song, idx, relatedSongs }));
    dispatch(playPause(true));
  };

  const { activeSong, isPlaying } = useSelector(
    (state) => state.player
  );

  async function getSongDetails() {
    const { data } = await axios.get(
      `https://shazam-core.p.rapidapi.com/v1/tracks/details?track_id=${songid}`,
      {
        headers: {
          "X-RapidAPI-Key":
            "abc63a0e1bmsh0416feda14ffb0dp1fd675jsn7c85745e2108",
          "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
        },
      }
    );
    setSongData(data);
  }

  async function getRelatedSongs() {
    const { data } = await axios.get(
      `https://shazam-core.p.rapidapi.com/v1/tracks/related?track_id=${songid}`,
      {
        headers: {
          "X-RapidAPI-Key":
            "abc63a0e1bmsh0416feda14ffb0dp1fd675jsn7c85745e2108",
          "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
        },
      }
    );
    setRelatedSongs(data);
  }

  useEffect(() => {
    getSongDetails();
    getRelatedSongs();
  }, [songid]);


  return (
    <>
      <div className="flex flex-col">
        <DetailsHeader artistId="" songData={songData} />

        <div className="mb-10">
          <h2 className="text-white text-3xl font-bold">Lyrics:</h2>

          <div className="mt-5">
            {songData?.sections[1].type === "LYRICS" ? (
              songData?.sections[1].text.map((line, i) => (
                <>
                  <p key={i} className="text-gray-400 text-base my-1">
                    {line}
                  </p>
                </>
              ))
            ) : (
              <>
                <p className="text-gray-400 text-base my-1">
                  Sorry, no lyrics found!
                </p>
              </>
            )}
          </div>
        </div>

        {relatedSongs && relatedSongs ? (
          <>
            <RelatedSongs
              relatedSongs={relatedSongs}
              handlePauseClick={handlePauseClick}
              handlePlayClick={handlePlayClick}
              activeSong={activeSong}
              isPlaying={isPlaying}
            />
          </>
        ) : (
          <>
            <Loader title="Searching song details" />
          </>
        )}
      </div>
    </>
  );
}

export default SongDetails;
