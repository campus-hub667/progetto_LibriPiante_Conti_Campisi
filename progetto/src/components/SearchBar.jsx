import React from "react";

export default function SearchBar({ value, onChange, onSearch }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") onSearch();
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Cerca per titolo, autore, ISBN o argomento..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={onSearch}>Cerca</button>
    </div>
  );
}