import React from "react";

import stripHtmlTagsUsingInnerHTML from "../utils/tools";
const ShowCard = ({ show }) => {
  if (!show) return null;

  return (
    <div className=" relative flex h-screen-3/4 text-white   ">
      <img
        src={show.image?.original || show.image?.medium}
        alt={show.name}
        className=" w-screen object-cover"
      />
      <div className="absolute bg-grad_accueil inset-0 h-screen-3/4"></div>
      <div className="absolute inset-0 md:px-36 px-3 flex  flex-col  justify-center gap-5 z-10 ">
        <h2 className="text-xl font-bold">{show.name}</h2>
        <p className="w-2/3 md:w-1/2 line-clamp-2">
          {stripHtmlTagsUsingInnerHTML(show.summary)}
        </p>
        <div className="flex items-center gap-2">
          {show.genres ? (
            show.genres.map((genre, index) => (
              <span
                key={index}
                className="bg-lightJaune py-1 px-2 rounded-sm text-zinc-700 text-[10px]"
              >
                {genre}
              </span>
            ))
          ) : (
            <span className="label">N/A</span>
          )}
        </div>
        <button className="bg-white/30 p-2 px-4 rounded-full flex items-center gap-3 w-fit">
          <img src="/play.svg" alt="" /> Reprendre
        </button>
      </div>
    </div>
  );
};

export default ShowCard;
