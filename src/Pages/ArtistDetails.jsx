import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from './../Components/Loader';
import DetailsHeader from './../Components/DetailsHeader';
import RelatedSongs from './../Components/RelatedSongs';


function ArtistDetails() {

  const { id : artistId } = useParams();
  const [artistData, setArtistData] = useState(null);

  const { activeSong, isPlaying } = useSelector(
    (state) => state.player
  );

  async function getArtistDetails() {
    const { data } = await axios.get(
      `https://shazam-core.p.rapidapi.com/v2/artists/details?artist_id=${artistId}`,
      {
        headers: {
          "X-RapidAPI-Key":
            "abc63a0e1bmsh0416feda14ffb0dp1fd675jsn7c85745e2108",
          "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
        },
      }
    );
    setArtistData(data);
  }

  useEffect(() => {
    getArtistDetails();
  }, [artistId]);


  return <>
      <div className="flex flex-col">

        <DetailsHeader artistId={artistId} artistData={artistData} />

        {artistData && artistData ? (
          <>
            <RelatedSongs
              artistData={artistData}
              artistId={artistId}
              activeSong={activeSong}
              isPlaying={isPlaying}
            />
          </>
        ) : (
          <>
            <Loader title="Searching artist details" />
          </>
        )}
      </div>
    </>
}

export default ArtistDetails