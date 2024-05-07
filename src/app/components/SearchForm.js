import React from "react";
import searchIcon from "../../../public/images/searchIcon.svg";
import Image from "next/image";

export default function SearchForm(props) {
  const { fetchRecipes, apiUrl, setFormData } = props;

  const handleFormChange = (e) => {
    setFormData(e.target.value);
  };
  return (
    <form
      className="w-2/6 laptop:w-2/5 sm-phone:w-4/5"
      onSubmit={(event) => fetchRecipes(apiUrl, event)}
    >
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <input
          onChange={handleFormChange}
          type="search"
          className="block w-full py-4 text-gray-900 border border-gray-300 rounded-lg ps-5 text-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
          placeholder="Search by meal type, ie. Chicken"
          required
        />
        <button
          type="submit"
          className="absolute px-3 py-3 text-sm font-medium text-white transition-all rounded-lg bg-searchBtnBlue end-1 bottom-2 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
        >
          {/* Search */}
          <Image src={searchIcon} alt="search icon" />
        </button>
      </div>
    </form>
  );
}
