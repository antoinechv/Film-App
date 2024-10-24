import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import FilmCard from "./FilmCard";

const FilmCarousel = ({ title, films, handleFilmClick }) => {
  return (
    <div className="carousel-wrapper w-full max-w-xl relative flex flex-col gap-4">
      <h2 className="text-white text-left">{title}</h2>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-2xl"
      >
        <CarouselContent>
          {films.map((film, index) => (
            <CarouselItem
              key={`${title}-${film.id}-${index}`}
              onClick={() => handleFilmClick(film)}
              className=" flex  "
            >
              <FilmCard film={film} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex " />
        <CarouselNext className="hidden  md:flex" />
      </Carousel>
    </div>
  );
};

export default FilmCarousel;
