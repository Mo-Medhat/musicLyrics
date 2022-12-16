import { useEffect } from "react";
import ArtistCard from './../Components/ArtistCard';
import { getWorldChart } from './../redux/features/playerSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './../Components/Loader';
import Error from './../Components/Error';

function TopArtists() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.player
  );
  useEffect(() => {
    dispatch(getWorldChart());
  }, []);

  if (loading) {
    return <Loader title="Loading top artist" />;
  }
  if (error) {
    return <Error />;
  }

  return <>
        <div className="flex flex-col ">
            <h2 className="font-bold text-white text-3xl text-left mt-4 mb-10">Top Artist</h2>
              <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {data?.map( (art, idx) => <>
                  <ArtistCard
                    key={art.key}
                    art={art}
                    idx={idx}
                  />
                </>)}
              </div>
          </div>

  </>
}

export default TopArtists