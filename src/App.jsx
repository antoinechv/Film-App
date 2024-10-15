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

  const { data, isLoading, error } = useFetch(
    `https://api.tvmaze.com/search/shows?q=${submittedQuery}`
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const films = data?.map((item) => item.show) || [];

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
    <div className="flex flex-col items-center gap-10">
      <h1>TV Shows</h1>

      <form
        onSubmit={handleSearchSubmit}
        className="flex w-full max-w-sm items-center  gap-5"
      >
        <Input
          type="text"
          placeholder="Search for a TV show..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Button type="submit">Search</Button>
      </form>

      <Carousel
        opts={{
          align: "start",
        }}
        className=" w-full max-w-xl"
      >
        <CarouselContent>
          {films.map((film) => (
            <div key={film.id} onClick={() => handleFilmClick(film)}>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 h-full">
                <FilmCard film={film} />
              </CarouselItem>
            </div>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {selectedFilm && <FilmDescription film={selectedFilm} />}
    </div>
  );
};

export default App;
