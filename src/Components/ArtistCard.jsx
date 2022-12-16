import React from "react";
import { useNavigate } from "react-router-dom";

function ArtistCard({art, idx}) {
  const navigate = useNavigate()

  return (
    <>
      <div key={idx} className="flex flex-col w-[250px] p-4
      bg-white/5 bg-opacity-80 backdrop-blur-sm
      animate-slideup rounded-lg cursor-pointer truncate"
       onClick={() => navigate(`/artists/${art?.artists[0]?.adamid}`)}>
        <img src={art?.images?.coverart} className="w-full h-56 rounded-lg" alt="artist" />
        <p className="mt-4 font-semibold text-lg text-white truncate">{art.subtitle}</p>
      </div>
    </>
  );
}

export default ArtistCard;
