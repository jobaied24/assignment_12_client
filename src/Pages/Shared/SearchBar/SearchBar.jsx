import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({
  searchText,
  setSearchText,
  onSearch,
  placeholder,
}) => {
  return (
    <div className="flex-1 mb-4">
      <label className="label">
        <span className="label-text font-semibold text-secondary mb-1">
          Search
        </span>
      </label>

      <div className="join w-full">
        <div className="input input-bordered border-2 rounded-l-xl border-blue-200 join-item flex items-center gap-2 w-full">
          <FaSearch className="text-primary" />

          <input
            type="text"
            placeholder={placeholder}
            className="grow outline-none"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearch();
              }
            }}
          />
        </div>

        <button
          className="btn btn-primary rounded-r-xl px-6 join-item"
          onClick={onSearch}
        >
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;