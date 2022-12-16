import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import SongCard from "./../Components/SongCard";
import Error from "./../Components/Error";
import Loader from "./../Components/Loader";
import axios from "axios";

function AroundYou() {
  // const apiGeoKey = `563a7b74bee6b9152022f07d8415f82a`
  const [country, setCountry] = useState("US");
  const [loading, setLoading] = useState(true);
  const [songsAroundYou, setSongsAroundYou] = useState(null);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  async function getGeoLocation() {
    const { data } = await axios.get(`http://api.ipstack.com/8.8.8.8?access_key=563a7b74bee6b9152022f07d8415f82a`);
    setCountry(data?.country_code);
    setLoading(false);
  }
  
  async function getSongsByCountry() {
    const { data } = await axios.get(
      `https://shazam-core.p.rapidapi.com/v1/charts/country?country_code=${country}`,
      {
        headers: {
          "X-RapidAPI-Key":
            "abc63a0e1bmsh0416feda14ffb0dp1fd675jsn7c85745e2108",
          "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
        },
      }
    );
    setSongsAroundYou(data);
  }


  useEffect(() => {
    getGeoLocation()
    getSongsByCountry()
  }, [country]);

  if (songsAroundYou == null && loading == true) {
    return <Loader title='Loading songs around you'/>
  }

  if (loading == false && country == undefined) {
    return <Error/>
  }


  return <>
      <div className="flex flex-col ">
        <h2 className="font-bold text-white text-3xl text-left mt-4 mb-10">Around You <span className="font-black"> {country}</span></h2>
          <div className="flex flex-wrap sm:justify-start justify-center gap-8">
            {songsAroundYou?.map( (song, idx) => <>
              <SongCard
                key={song.key}
                song={song}
                isPlaying={isPlaying}
                activeSong={activeSong}
                songsAroundYou={songsAroundYou}
                idx={idx}
              />
            </>)}
          </div>
      </div>
  
  </>;
}

export default AroundYou;
