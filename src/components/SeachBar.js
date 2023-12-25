import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    // Perform any necessary actions with the search term
    // For now, let's just log it to the console
    console.log("Search term:", searchTerm);

    // If you want to send the search term to a parent component,
    // you can call the `onSearch` prop
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch} style={{marginLeft: 40}}>Search</button>
    </div>
  );
};

export default SearchBar;
