import React, { useEffect, useState } from "react";
import Error from "./../Components/Error";
import Loader from "./../Components/Loader";
import SongCard from "./../Components/SongCard";
import { genres } from "./../assets/constants";
import { useSelector } from "react-redux";
import axios from 'axios';
 
function Discover() {
  const [genre, setGenre] = useState('POP')
  const [worldChartGenre, setWorldChartGenre] = useState(null)
  const { loading, error, activeSong, isPlaying } = useSelector(
    (state) => state.player
  );


  async function getWorldChartByGenre() {
    const { data } = await axios.get(
      `https://shazam-core.p.rapidapi.com/v1/charts/genre-world?genre_code=${genre}`,
      {
        headers: {
          "X-RapidAPI-Key":
            "abc63a0e1bmsh0416feda14ffb0dp1fd675jsn7c85745e2108",
          "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
        },
      }
    );
    setWorldChartGenre(data);
  }
  const genreTitle = genres.find((oneGenre) => oneGenre?.value === genre ? oneGenre?.title : '');

  useEffect(() => {
    getWorldChartByGenre();
  }, [genre]);

  if (loading) {
    return <Loader title="Loading songs..." />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <>
      <section>
        <div className="flex flex-col">
          <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
            <h2 className="font-bold text-3xl text-white text-left">
              Discover {genreTitle.title}
            </h2>
            <select
              onChange={(e) => setGenre(e.target.value)}
              value={genreTitle.value || 'Pop'}
              className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
            >
              {genres.map((genre) => (
                <>
                  <option key={genre.value} value={genre.value}>
                    {genre.title}
                  </option>
                </>
              ))}
            </select>
          </div>
          <div className="flex flex-wrap sm:justify-start justify-center gap-4">
            {worldChartGenre?.map((song, idx) => (
              <>
                <SongCard
                  key={song.key}
                  song={song}
                  idx={idx}
                  activeSong={activeSong}
                  isPlaying={isPlaying}
                  data={worldChartGenre}
                />
              </>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Discover;
