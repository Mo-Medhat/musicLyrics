import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SongCard from "./../Components/SongCard";
import Error from "./../Components/Error";
import Loader from "./../Components/Loader";
import { getWorldChart } from './../redux/features/playerSlice';


function TopCharts() {

  const dispatch = useDispatch();
  const { data, loading, error, activeSong, isPlaying } = useSelector(
    (state) => state.player
  );

  useEffect(() => {
    dispatch(getWorldChart());
  }, []);

  if (loading) {
    return <Loader title="Loading top charts" />;
  }
  if (error) {
    return <Error />;
  }

  return <>
        <div className="flex flex-col ">
            <h2 className="font-bold text-white text-3xl text-left mt-4 mb-10">Discover Top Charts</h2>
              <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {data?.map( (song, idx) => <>
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

export default TopCharts