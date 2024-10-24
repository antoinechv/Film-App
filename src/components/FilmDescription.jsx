import React from "react";
import stripHtmlTagsUsingInnerHTML from "../utils/tools";

const FilmDescription = ({
  film,
  seasons,
  selectedSeason,
  setSelectedSeason,
  episodes,
}) => {
  if (!film) {
    return null;
  }

  return (
    <div className="film-card  text-white bg-darkBlack">
      {film.image && film.image.medium && (
        <div className="relative h-64 md:h-80 lg:h-96">
          <img
            src={film.image.medium}
            alt={film.name}
            className="w-full h-full object-cover object-top"
          />

          <div className="absolute bg-grad inset-0 z-10"></div>
        </div>
      )}

      <div className="film-info justify-center px-6  flex flex-col gap-2 ">
        <div className="flex justify-between  items-center ">
          <h2 className="text-2xl font-bold">{film.name}</h2>
          <button className=" bg-white/30 p-2 px-4 rounded-full flex items-center gap-3">
            {" "}
            <img src="/play.svg" alt="" /> Reprendre
          </button>
        </div>

        <div className=" border-y-2 py-4 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <p> {film.premiered}</p>
            <img src="/pegi.svg" alt="" />
            <p>
              <strong></strong> {film.runtime} minutes
            </p>
            <img src="/qualite.svg" alt="" />
          </div>
          <div className="flex items-center gap-2">
            {film.genres ? (
              film.genres.map((genre, index) => (
                <span
                  key={index}
                  className=" bg-lightJaune py-1 px-2 rounded-sm text-zinc-700 text-[10px]"
                >
                  {genre}
                </span>
              ))
            ) : (
              <span className="label">N/A</span>
            )}
          </div>
        </div>

        <p className=" text-left ">
          {" "}
          <span dangerouslySetInnerHTML={{ __html: film.summary || "N/A" }} />
        </p>
        <a
          href={film.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-yellow-300 underline border-b-2"
        >
          Plus d'infos
        </a>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-medium text-gray-900">{film.title}</h2>
        <p className="text-gray-700">{film.description}</p>
        <label
          htmlFor="season-select"
          className="block text-sm font-medium text-gray-700 mt-4"
        >
          Select Season
        </label>
        <select
          id="season-select"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={selectedSeason}
          onChange={(e) => setSelectedSeason(Number(e.target.value))}
        >
          {seasons.map((season) => (
            <option key={season} value={season}>
              Season {season}
            </option>
          ))}
        </select>

        <div className="mt-4">
          <h2 className="text-lg font-medium text-gray-900">Episodes</h2>
          <ul className="mt-2 space-y-2">
            {episodes.map((episode) => (
              <li
                key={episode.id}
                className="p-2 border border-gray-300 rounded-md"
              >
                <h3 className="text-md font-medium text-gray-900">
                  {episode.name}
                </h3>
                <p className="text-white">
                  {stripHtmlTagsUsingInnerHTML(episode.summary)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FilmDescription;
