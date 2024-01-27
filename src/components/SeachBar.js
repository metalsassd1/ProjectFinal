import React, { useState } from "react";

const SearchBar = ({ onSearch, onFilter1, onFilter2 }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleFilter1 = () => {
    if (onFilter1) {
      onFilter1();
    }
  };

  const handleFilter2 = () => {
    if (onFilter2) {
      onFilter2();
    }
  };

  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleSearch} style={styles.button}>
        Search
      </button>
      <button onClick={handleFilter1} style={styles.filterButton}>
        Filter 1
      </button>
      <button onClick={handleFilter2} style={styles.filterButton}>
        Filter 2
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    marginRight: 10,
    padding: 8,
    fontSize: 16,
    borderRadius: 4,
    border: "1px solid #ccc",
  },
  button: {
    padding: 8,
    fontSize: 16,
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
  filterButton: {
    marginLeft: 10,
    padding: 8,
    fontSize: 16,
    backgroundColor: "#2196F3",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
};

export default SearchBar;
