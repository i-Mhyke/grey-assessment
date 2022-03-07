import React, { useState } from "react";
import { sendSearch } from "../../store/features/search/searchSlice";
import { useAppDispatch } from "../../store/hooks";
import searchIcon from "../../assets/search-icon.svg";

export const SearchForm = () => {
  const dispatch = useAppDispatch();
  const [searchWord, setSearchWord] = useState<string>("");
  const submitSearchForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(searchWord);
    dispatch(sendSearch(searchWord));
  };
  return (
    <div>
      <form className="flex items-center" onSubmit={submitSearchForm}>
        <input
          className="w-full border-2 p-2 border-gray-200 rounded-lg mt-2"
          type="text"
          name="search"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          placeholder="Search for a user"
        />
        <div className="mt-2 ml-2">
          <button
            type="submit"
            className="text-center p-3 font-medium rounded-lg bg-gray-100  hover:bg-gray-200 transition-colors duration-300 w-full"
          >
            <img width={22} src={searchIcon} alt="search" />
          </button>
        </div>
      </form>
    </div>
  );
};
