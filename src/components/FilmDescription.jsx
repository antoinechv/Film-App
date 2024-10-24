import React from "react";
import stripHtmlTagsUsingInnerHTML from "../utils/tools";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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

  const renderGenres = (genres) => {
    return genres ? (
      genres.map((genre, index) => (
        <span
          key={index}
          className="bg-yellow-300 p-1 py-[2px] rounded-md text-zinc-700 text-[10px]"
        >
          {genre}
        </span>
      ))
    ) : (
      <span className="label">N/A</span>
    );
  };

  const renderEpisodes = (episodes) => {
    return episodes.map((episode) => (
      <CarouselItem key={episode.id} onClick={() => handleFilmClick(film)}>
        <div className=" aspect-square w-36">
          <div className="w-full h-full overflow-hidden object-cover rounded-[20px]">
            {episode.image && episode.image.medium && (
              <img
                src={episode.image.medium}
                alt={episode.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <h3 className="text-md font-medium">{episode.name}</h3>
        </div>
      </CarouselItem>
    ));
  };

  return (
    <div className="text-white bg-darkBlack">
      {film.image?.original && (
        <div className="relative h-64 md:h-80 lg:h-96">
          <img
            src={film.image.original}
            alt={film.name}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute bg-grad inset-0 z-10"></div>
        </div>
      )}

      <div className="flex flex-col justify-center p-6 gap-2">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{film.name}</h2>
          <button className="bg-white/30 p-2 px-4 rounded-full flex items-center gap-3">
            <img src="/play.svg" alt="" /> Reprendre
          </button>
        </div>

        <div className=" border-y-[0.5px] border-lightGrey py-4 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <p>{film.premiered}</p>
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
          <p className="text-left">
            <span dangerouslySetInnerHTML={{ __html: film.summary || "N/A" }} />
          </p>
          <a
            href={film.url}
            target="_blank"
            rel="noopener noreferrer"
            className=" text-lightJaune underline "
          >
            Plus d'infos
          </a>
        </div>

        <div className="w-full max-w-xl text-white">
  <div className="flex flex-col gap-5">
    {/* Alignement du select à gauche */}
    <select
      id="season-select"
      className="py-2 bg-darkBlack rounded-md focus:outline-none focus:ring-yellow-300 focus:border-yellow-300 sm:text-sm"
      value={selectedSeason}
      onChange={(e) => setSelectedSeason(Number(e.target.value))}
    >
      {seasons.map((season) => (
        <option key={season} value={season}>
          Saison {season}
        </option>
      ))}
    </select>
    
    {/* Carousel centré */}
    <div className="w-full flex justify-center">
      <div className="carousel-wrapper relative flex flex-col gap-4 w-full max-w-xl">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="m-0 flex gap-4 items-stretch">
            {renderEpisodes(episodes)}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2" />
          <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2" />
        </Carousel>
      </div>
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default FilmDescription;
