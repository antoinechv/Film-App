// eslint-disable-next-line no-unused-vars
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
                             // eslint-disable-next-line react/prop-types
                             film,
                             // eslint-disable-next-line react/prop-types
                             seasons,
                             // eslint-disable-next-line react/prop-types
                             selectedSeason,
                             // eslint-disable-next-line react/prop-types
                             setSelectedSeason,
                             // eslint-disable-next-line react/prop-types
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
                <div className="relative aspect-video h-40 group">
                    <div className="w-full h-full overflow-hidden object-cover rounded-[20px]">
                        {episode.image && episode.image.medium && (
                            <img
                                src={episode.image.medium}
                                alt={episode.name}
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>
                    <h3 className="text-md font-medium absolute bottom-0 left-0 right-0 bg-grad_card bg-opacity-50 text-white p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        {episode.name}
                    </h3>
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

                <div className="border-y-[0.5px] border-lightGrey py-4 flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <p>{film.premiered}</p>
                        <img src="/pegi.svg" alt="" />
                        <p>
                            <strong></strong> {film.runtime} minutes
                        </p>
                        <img src="/qualite.svg" alt="" />
                    </div>
                    <div className="flex items-center gap-2">
                        {renderGenres(film.genres)}
                    </div>
                    <p className="text-left">
                        {stripHtmlTagsUsingInnerHTML(film.summary)}
                    </p>
                    <a
                        href={film.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lightJaune underline"
                    >
                        Plus d'infos
                    </a>
                </div>

                <div className="w-full text-white">
                    <div className="flex flex-col gap-5 w-full">
                        <select
                            id="season-select"
                            className="py-2 bg-darkBlack rounded-md focus:outline-none focus:ring-lightJaune focus:border-lightJaune sm:text-sm"
                            value={selectedSeason}
                            onChange={(e) => setSelectedSeason(Number(e.target.value))}
                        >
                            {seasons.map((season) => (
                                <option key={season} value={season}>
                                    Saison {season}
                                </option>
                            ))}
                        </select>

                        <div className="w-full flex justify-center">
                            <div className="carousel-wrapper relative flex flex-col gap-4 w-full">
                                <Carousel opts={{ align: "start" }} className="w-full overflow-visible">
                                    <CarouselContent className="m-0 flex gap-4 items-stretch h-48">
                                        {renderEpisodes(episodes)}
                                    </CarouselContent>

                                    <div className="flex items-center justify-center p-4 gap-5">
                                        <CarouselPrevious className="relative inset-0 translate-x-0 translate-y-0 hidden md:flex" />
                                        <CarouselNext className="relative inset-0 translate-x-0 translate-y-0 hidden md:flex" />
                                    </div>
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
