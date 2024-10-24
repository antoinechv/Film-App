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
      >
        <span className="hidden md:inline">Search</span>
        <span className="md:hidden">🔍</span>
      </Button>
    </form>
  );
};

export default SearchForm;
