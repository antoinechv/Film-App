import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SearchForm = ({
  searchQuery,
  handleSearchChange,
  handleSearchSubmit,
}) => {
  return (
    <form
      onSubmit={handleSearchSubmit}
      className="flex w-full max-w-sm items-center md:gap-5 gap-2"
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
        className="border-yellow-100 hover:bg-yellow-100 hover:text-black text-yellow-100 rounded-3xl"
        disabled={!searchQuery} // Disable button if input is empty
      >
        <span className="hidden md:inline">Search</span>
        <span className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </span>
      </Button>
    </form>
  );
};

export default SearchForm;
