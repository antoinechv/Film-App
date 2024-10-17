import React, { useState } from "react";
import FilmCard from "./components/FilmCard";
import useFetch from "./hook/UseFetch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "./App.css";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import FilmDescription from "./components/FilmDescription";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("stranger");
  const [submittedQuery, setSubmittedQuery] = useState("stranger");
  const [selectedFilm, setSelectedFilm] = useState(null);

  const {
    data: dataShearch,
    isLoading: isLoadingSearch,
    error: errorSearch,
  } = useFetch(`https://api.tvmaze.com/search/shows?q=${submittedQuery}`);
  const {
    data: dataSchudle,
    isLoading: isLoadingSchudle,
    error: errorSchudle,
  } = useFetch(`https://api.tvmaze.com/schedule?country=FR`);

  if (isLoadingSearch) {
    return <div>Loading...</div>;
  }

  if (errorSearch) {
    return <div>Error: {error.message}</div>;
  }

  const filmsSearch = dataShearch?.map((item) => item.show) || [];
  const filmsSchudle = dataSchudle?.map((item) => item.show) || [];

  const handleFilmClick = (film) => {
    setSelectedFilm(film);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSubmittedQuery(searchQuery);
  };

  return (
    <div className="flex flex-col items-center gap-10 bg-darkBlack p-4 min-h-screen h-full">
      <h1 className="flex w-full ">
        <img src="/logo.svg" alt="" />
      </h1>
      <h2 className="text-white">Find Movies, Tv series, and more..</h2>

      <form
        onSubmit={handleSearchSubmit}
        className="flex w-full max-w-sm items-center gap-5"
      >
        <Input
          type="text"
          placeholder="Search for a TV show..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full text-yellow-100 placeholder:text-yellow-100 bg-black border-none rounded-3xl"
        />
        <Button
          type="submit"
          className=" border-yellow-100 hover:bg-yellow-100 hover:text-black text-yellow-100  rounded-3xl"
        >
          Search
        </Button>
      </form>

      <div className="carousel-wrapper w-full max-w-xl relative flex flex-col gap-4">
        <h2 className="text-white text-left">
          Les dernieres recherches en FRANCE
        </h2>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-2xl"
        >
          <CarouselContent>
            {filmsSchudle.map((film) => (
              <CarouselItem
                key={film.id}
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

      <div className="carousel-wrapper w-full max-w-xl relative">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-2xl"
        >
          <CarouselContent>
            {filmsSearch.map((film) => (
              <CarouselItem
                key={film.id}
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

      {selectedFilm && <FilmDescription film={selectedFilm} />}
    </div>
  );
};

export default App;
