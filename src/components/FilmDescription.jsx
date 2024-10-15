import React from "react";

const FilmDescription = ({ film }) => {
  if (!film) {
    return null; // or return a loading spinner or placeholder
  }

  return (
    <div className="film-card">
      {film.image && film.image.medium && (
        <img src={film.image.medium} alt={film.name} className="film-image" />
      )}
      <div className="film-info">
        <h2>{film.name}</h2>
        <p>
          <strong>Type:</strong> {film.type}
        </p>
        <p>
          <strong>Language:</strong> {film.language}
        </p>
        <p>
          <strong>Genres:</strong>{" "}
          {film.genres ? film.genres.join(", ") : "N/A"}
        </p>
        <p>
          <strong>Status:</strong> {film.status}
        </p>
        <p>
          <strong>Runtime:</strong> {film.runtime} minutes
        </p>
        <p>
          <strong>Premiered:</strong> {film.premiered}
        </p>
        <p>
          <strong>Ended:</strong> {film.ended}
        </p>
        <p>
          <strong>Network:</strong> {film.network ? film.network.name : "N/A"}
        </p>
        <p>
          <strong>Country:</strong>{" "}
          {film.network && film.network.country
            ? film.network.country.name
            : "N/A"}
        </p>
        <p>
          <strong>Rating:</strong> {film.rating ? film.rating.average : "N/A"}
        </p>
        <p>
          <strong>Summary:</strong>{" "}
          <span dangerouslySetInnerHTML={{ __html: film.summary || "N/A" }} />
        </p>
        <a href={film.url} target="_blank" rel="noopener noreferrer">
          More Info
        </a>
      </div>
    </div>
  );
};

export default FilmDescription;
