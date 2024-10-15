import React from "react";

import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";
const FilmCard = ({ film }) => {
  if (!film) {
    return null; // or return a loading spinner or placeholder
  }

  return (
    <Card className="flex items-center justify-center p-6 flex-col h-full">
      {film.image && film.image.medium && (
        <CardHeader>
          <img src={film.image.medium} alt={film.name} className="film-image" />
        </CardHeader>
      )}

      <CardTitle>{film.name}</CardTitle>
      <CardDescription>
        <strong>Genres:</strong> {film.genres ? film.genres.join(", ") : "N/A"}
      </CardDescription>
    </Card>
  );
};

export default FilmCard;
