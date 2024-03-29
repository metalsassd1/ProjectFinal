import React, { useState } from "react";

const SearchFilter = ({ onSearch, onFilter1, onFilter2, onTypeFilter1, onTypeFilter2 }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Event handler when search button is clicked
  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  // Event handlers for type filter buttons
  const handleTypeFilter1 = () => {
    if (onTypeFilter1) {
      onTypeFilter1(); // This could also take parameters if needed
    }
  };

  const handleTypeFilter2 = () => {
    if (onTypeFilter2) {
      onTypeFilter2(); // This could also take parameters if needed
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
      {/* Other filter buttons */}
      <button onClick={handleTypeFilter1} style={styles.filterButton}>
        Type 1
      </button>
      <button onClick={handleTypeFilter2} style={styles.filterButton}>
        Type 2
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

export default SearchFilter;
