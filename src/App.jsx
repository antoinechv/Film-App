import React, { useState, useEffect } from "react";
import Modal from "./components/Modal";
import useFetch from "./hook/UseFetch";
import Loader from "./components/Loader";
import SearchForm from "./components/SearchForm";
import FilmCarousel from "./components/FilmCarousel";
import FilmDescription from "./components/FilmDescription";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("stranger");
  const [submittedQuery, setSubmittedQuery] = useState("stranger");
  const [idFilm, setIdFilm] = useState(null);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilmLoading, setIsFilmLoading] = useState(false);

// Loader state to control its visibility
const [showLoader, setShowLoader] = useState(true);

// Simulation of a 3x animation duration (you can adjust the duration)
useEffect(() => {
  const loaderDuration = 1400 * 1; // 4000ms per animation x 3 for 3 repetitions
  const timer = setTimeout(() => {
    setShowLoader(false);
  }, loaderDuration);

  return () => clearTimeout(timer);
}, []);

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

const {
  data: dataSeasons,
  isLoading: isLoadingSeasons,
  error: errorSeasons,
} = useFetch(`https://api.tvmaze.com/shows/${idFilm}?embed=episodes`);

if (showLoader) {
  return <Loader />; // Display loader while loading
}

if (isLoadingSearch) {
  return <div>Loading search results...</div>;
}

if (errorSearch) {
  return <div>Error: {errorSearch.message}</div>;
}

const filmsSearch = dataShearch?.map((item) => item.show) || [];
const filmsSchudle = dataSchudle?.map((item) => item.show) || [];

const seasons = [];
let episodes = [];
if (dataSeasons?._embedded?.episodes) {
  dataSeasons._embedded.episodes.forEach((episode) => {
    if (!seasons.includes(episode.season)) {
      seasons.push(episode.season);
    }
  });
  episodes = dataSeasons._embedded.episodes.filter(
    (episode) => episode.season === selectedSeason
  );
}

const handleFilmClick = (film) => {
  setSelectedFilm(film);
  setIdFilm(film.id);
  setIsModalOpen(true);
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
        <img src="/logo.svg" alt="Logo" />
      </h1>
      <h2 className="text-white">Find Movies, TV series, and more..</h2>

      <SearchForm
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        handleSearchSubmit={handleSearchSubmit}
      />

      <FilmCarousel
        title="Les dernières recherches en FRANCE"
        films={filmsSchudle}
        handleFilmClick={handleFilmClick}
      />

      <FilmCarousel
        title="Search Results"
        films={filmsSearch}
        handleFilmClick={handleFilmClick}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {isFilmLoading ? (
          <Loader />
        ) : (
          selectedFilm && (
            <FilmDescription
              film={selectedFilm}
              seasons={seasons}
              selectedSeason={selectedSeason}
              setSelectedSeason={setSelectedSeason}
              episodes={episodes}
            />
          )
        )}
      </Modal>
    </div>
  );
};

export default App;
