import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  return (
    <div className="search-bar">
      <input
        placeholder="Cerca per titolo, autore, ISBN o argomento..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={() => onSearch(value)}>Cerca</button>
    </div>
  );
}