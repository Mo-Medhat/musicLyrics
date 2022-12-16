import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FreeMode } from "swiper";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

import "swiper/css/bundle";
import "swiper/css/free-mode";
import { getWorldChart } from './../redux/features/playerSlice';

const TopChartCard = ({ song, idx, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => {

    return ( <>
        <div key={idx}
          className="w-full flex flex-row
          items-center hover:bg-[#4c426e] py-2
          p-4 rounded-lg cursor-pointer mb-2"
          >
            <h3 className="font-bold text-base text-white mr-3">{idx +1}.</h3>
            <div className="flex-1 flex flex-row justify-between items-center">
              <img src={song?.images?.coverart} className="w-20 h-20 rounded-lg" alt={song?.title} />
              <div className="flex-1 flex flex-col justify-center mx-3">
                <Link to={`/songs/${song.key}`}>
                  <p className="text-xl font-bold text-white">{song?.title}</p>
                </Link>
                <Link to={`/artists/${song?.artists[0].adamid}`}>
                  <p className="text-base text-gray-200 mt-1">{song?.subtitle}</p>
                </Link>
              </div>
            </div>
            <div>
                {<PlayPause
                isPlaying={isPlaying}
                activeSong={activeSong}
                song={song}
                handlePause={handlePauseClick}
                handlePlay={() => handlePlayClick(song, idx)}
                />}
              </div>
        </div>
      </>);
};

function TopPlay() {
  const divRef = useRef(null);
  const dispatch = useDispatch();
  const { data, activeSong, isPlaying} = useSelector(
    (state) => state.player
  );

  const topPlays = data?.slice(0, 5);

  useEffect(() => {
    dispatch(getWorldChart());
  }, []);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, idx) => {
    dispatch(setActiveSong({ song, idx, data }));
    dispatch(playPause(true));
  };

  return (
    <>
            {/* Top Charts */}
      <div
        ref={divRef}
        className="xl:ml-6 ml-0 xl:mb-6 mb-0 flex-1 xl:max-w-[500px] max-w-full flex flex-col"
      >
        <div className="w-full flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-white font-bold text-2xl">Top Charts</h2>
            <Link to="/top-charts">
              <p className="text-gray-300 text-base cursor-pointer">See more</p>
            </Link>
          </div>
          <div className="mt-4 flex flex-col gap-1">
            {topPlays?.map((song, idx) => (
              <>
                <TopChartCard key={song.key} song={song} idx={idx}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
                isPlaying={isPlaying}
                activeSong={activeSong}
                />
              </>
            ))}
          </div>
        </div>
              {/* Top Artist */}
        <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
            <h2 className="text-white font-bold text-2xl">Top Artist</h2>
            <Link to="/top-Artist">
              <p className="text-gray-300 text-base cursor-pointer">See more</p>
            </Link>
          </div>
            <Swiper
              spaceBetween={15}
              slidesPerView='auto'
              freeMode
              centeredSlides
              centeredSlidesBounds
              modules={[FreeMode]}
              className="mt-4"
              >
              {topPlays?.map((song, idx) => (
              <>
              <SwiperSlide key={song.key} song={song} idx={idx}
                style={{width:'25%', height:'auto'}}
                className="shadow-lg rounded-full animate-slideright"
              >
                <Link to={`/artists/${song?.artists[0].adamid}`}>
                  <img src={song?.images.background} alt="name" className="rounded-full w-full object-cover" />
                </Link>
              </SwiperSlide>
              </>
            ))}
              
          </Swiper>
          </div>

      </div>
    </>
  );
}

export default TopPlay;
