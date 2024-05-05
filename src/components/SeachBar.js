import React, { useState } from "react";
import axios from "axios";

const SearchBar = ({ value, onChange, onSearch }) => {  




  return (
    <div style={styles.container}>
       <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={onChange}
        style={styles.input}
      />
      <button onClick={onSearch} style={styles.button}>
        Search
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
