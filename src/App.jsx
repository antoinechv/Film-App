import React, {useState, useEffect} from "react";
import Modal from "./components/Modal";
import useFetch from "./hook/UseFetch";
import Loader from "./components/Loader";
import SearchForm from "./components/SearchForm";
import FilmCarousel from "./components/FilmCarousel";
import FilmDescription from "./components/FilmDescription";
import FilmCard from "./components/FilmCard";
import ShowCard from "./components/ShowCard";

const App = () => {
    const [searchQuery, setSearchQuery] = useState();
    const [submittedQuery, setSubmittedQuery] = useState();
    const [idFilm, setIdFilm] = useState(null);
    const [selectedFilm, setSelectedFilm] = useState(null);
    const [selectedSeason, setSelectedSeason] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFilmLoading, setIsFilmLoading] = useState(false);
    const [showLastSearchCarousel, setShowLastSearchCarousel] = useState(true);

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
    } = useFetch(`https://api.tvmaze.com/schedule?country=US`);

    const {
        data: dataSeasons,
        isLoading: isLoadingSeasons,
        error: errorSeasons,
    } = useFetch(`https://api.tvmaze.com/shows/${idFilm}?embed=episodes`);
    const {
        data: showData,
        isLoading: isLoadingShow,
        error: errorShow,
    } = useFetch(`https://api.tvmaze.com/lookup/shows?thetvdb=81189`);

    if (showLoader) {
        return <Loader/>;
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
        setShowLastSearchCarousel(false);
    };
    const handleLogoClick = () => {
        window.location.reload();
    };

    return (
        <div className="flex flex-col items-center gap-10 bg-darkBlack  min-h-screen h-full overflow-hidden ">
            <div
                className="fixed z-30 bg-darkBlack  p-2 flex items-center md:justify-between w-full gap-2 md:px-36 px-3 md:flex-row flex-col">
                <h1 className="flex w-36 md:w-64 " onClick={handleLogoClick}>
                    <img src="./logo.svg" alt="Logo"/>
                </h1>

                <SearchForm
                    searchQuery={searchQuery}
                    handleSearchChange={handleSearchChange}
                    handleSearchSubmit={handleSearchSubmit}
                />
            </div>

            {showLastSearchCarousel && (
                <>
                    <ShowCard show={showData}/>
                    <FilmCarousel
                        title="Actualité"
                        films={filmsSearch}
                        handleFilmClick={handleFilmClick}
                    />
                    <FilmCarousel
                        title="Les dernières recherches aux USA"
                        films={filmsSchudle}
                        handleFilmClick={handleFilmClick}
                    />
                </>
            )}

            {submittedQuery ? (
                filmsSearch.length > 0 ? (
                    <div className="flex justify-center items-center h-screen">
                      <div className="flex flex-col h-screen pt-nav-height overflow-y-auto">
                        <div className=" p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 justify-items-center px-4">
                          {filmsSearch.map((film) => (
                              <div key={film.id} onClick={() => handleFilmClick(film)}>
                                <FilmCard film={film} className="h-full w-60 md:w-72"/>
                              </div>
                          ))}
                        </div>
                      </div>


                    </div>
                ) : (
                    <span className="text-white">
            No results found for {submittedQuery}
          </span>
                )
            ) : null}

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            {isFilmLoading ? (
                <Loader/>
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
