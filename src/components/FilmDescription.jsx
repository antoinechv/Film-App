import React from "react";


const FilmDescription = ({ film }) => {
  if (!film) {
    return null; 
  }

  return (
    <div className="film-card  text-white bg-grad">
      {film.image && film.image.medium && (
        <div className="relative w-screen h-64 md:h-80 lg:h-96">
          <img
            src={film.image.medium}
            alt={film.name}
            className="w-full h-full object-cover"
          />

          <div className="absolute bg-grad inset-0 z-10"></div>
        </div>
      )}

      <div className="film-info justify-center px-6  flex flex-col gap-2 ">
        <div className="flex justify-between  items-center ">
          <h2 className="text-2xl font-bold">{film.name}</h2>
          <button className=" bg-white/30 p-2 px-4 rounded-full flex items-center gap-3"> <img src="/play.svg" alt="" /> Reprendre</button>
        </div>

        <div className=" border-y-2 py-4 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <p> {film.premiered}</p>
            <img src="/pegi.svg" alt="" />
            <p><strong></strong> {film.runtime} minutes</p>
            <img src="/qualite.svg" alt="" />
          </div>
          <div className="flex items-center gap-2">
            {film.genres ? (
              film.genres.map((genre, index) => (
                <span
                  key={index}
                  className=" bg-yellow-300 p-1 py-[2px] rounded-md text-zinc-700 text-[10px]"
                >
                  {genre}
                </span>
              ))
            ) : (
              <span className="label">N/A</span>
            )}
          </div>
        </div>

        <p className=" text-left "> <span dangerouslySetInnerHTML={{ __html: film.summary || "N/A" }} /></p>
        <a href={film.url} target="_blank" rel="noopener noreferrer" className="text-yellow-300 underline border-b-2">Plus d'infos</a>
      </div>
    </div>
  );
};

export default FilmDescription;
