import React from "react";

import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";
const FilmCard = ({ film }) => {
  if (!film) {
    return null;
  }

  return (
    <Card className="flex flex-col gap-2 h-full rounded-3xl p-2 bg-black pb-4 border-none">
      <div className=" w-32  h-24 overflow-hidden  object-cover rounded-[20px]">
        {film.image && film.image.medium && (
          <img src={film.image.medium} alt={film.name} lassName="" />
        )}
      </div>
      <CardTitle className=" text-left text-sm text-white">
        {film.name}
      </CardTitle>
      <CardDescription className="flex flex-wrap gap-2">
        {film.genres ? (
          film.genres.map((genre, index) => (
            <span
              key={index}
              className=" bg-lightJaune py-1 px-2 rounded-2xl text-zinc-700 text-[10px]"
            >
              {genre}
            </span>
          ))
        ) : (
          <span className="label">N/A</span>
        )}
      </CardDescription>
    </Card>
  );
};

export default FilmCard;
