import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SongCard from "./../Components/SongCard";
import Error from "./../Components/Error";
import Loader from "./../Components/Loader";
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Search() {
  const { searchTerm } = useParams()
  const [searchByTerm, setSearchByTerm] = useState(null)

  const { loading, error, activeSong, isPlaying } = useSelector(
    (state) => state.player
  );


    async function getSearchTerm() {
      const { data } = await axios.get(
        `https://shazam-core.p.rapidapi.com/v1/search/multi?query=${searchTerm}&search_type=SONGS_ARTISTS`,
        {
          headers: {
            "X-RapidAPI-Key":
              "abc63a0e1bmsh0416feda14ffb0dp1fd675jsn7c85745e2108",
            "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
          },
        }
      );
      setSearchByTerm(data?.tracks?.hits);
    }

  useEffect(() => {
    getSearchTerm();
  }, [searchTerm]);


  if (loading) {
    return <Loader title="Loading resultes" />;
  }
  if (error) {
    return <Error />;
  }

  return <>
            <div className="flex flex-col ">
            <h2 className="font-bold text-white text-3xl text-left mt-4 mb-10">Showing resultes for <span className="font-black">{searchTerm}</span></h2>
              <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {searchByTerm?.map( (song, idx) => <>
                  <SongCard
                    key={song.key}
                    song={song}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    idx={idx}
                  />
                </>)}
              </div>
          </div>
  </>
}

export default Search