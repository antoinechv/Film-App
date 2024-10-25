import React from "react";

const ShowCard = ({ show }) => {
  if (!show) return null;

  return (
    <div className="flex h-screen-3/4 text-white  ">
      <img
        src={show.image?.original || show.image?.medium}
        alt={show.name}
        className="relative w-screen object-cover"
      />

      <div className="absolute inset-0 pl-36 flex  flex-col  justify-center gap-5 ">
        <h2 className="text-xl font-bold">{show.name}</h2>
        <p className="w-1/2">
          {show.summary && show.summary.replace(/<[^>]+>/g, "")}
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
      </div>
    </div>
  );
};

export default ShowCard;
