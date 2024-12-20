import React from "react";

import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";
const FilmCard = ({ film }) => {
  if (!film) {
    return null;
  }

  return (
      <Card className="flex flex-col gap-2 h-full w-60 md:w-72 rounded-3xl p-4 bg-black border-none">
          {/* Image Container */}
          <div className="w-full h-32 md:h-48">
              {film.image && film.image.medium ? (
                  <img
                      src={film.image.medium}
                      alt={film.name}
                      className="w-full h-full object-cover rounded-2xl"
                  />
              ) : (
                  <div className="w-full h-full bg-gray-800 rounded-2xl flex justify-center items-center text-white text-xs">
                      No Image
                  </div>
              )}
          </div>

          {/* Film Title */}
          <CardTitle className="text-left text-sm text-white">
              {film.name}
          </CardTitle>

          {/* Genres */}
          <CardDescription className="flex flex-wrap gap-2">
              {film.genres && film.genres.length > 0 ? (
                  film.genres.map((genre, index) => (
                      <span
                          key={index}
                          className="bg-lightJaune py-1 px-2 rounded-2xl text-zinc-700 text-[10px]"
                      >
          {genre}
        </span>
                  ))
              ) : (
                  <span className="text-zinc-500 text-xs">N/A</span>
              )}
          </CardDescription>
      </Card>

  );
};

export default FilmCard;
