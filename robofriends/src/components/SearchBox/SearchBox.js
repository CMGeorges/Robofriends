import React from "react";
import "./SearchBox.css";

function SearchBox({ searchField, searchChange }) {
  return (
    <div className="search-box">
      <label className="search-box-label" htmlFor="robot-search">
        Search robot directory
      </label>
      <input
        className="search-box-input"
        type="search"
        name="robot-search"
        id="robot-search"
        placeholder="Search robots by name"
        value={searchField}
        onChange={searchChange}
      />
    </div>
  );
}

export default SearchBox;
