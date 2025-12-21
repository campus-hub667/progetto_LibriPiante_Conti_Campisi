import React, { useState } from "react";

export default function FilterPanel({ filters, setFilters, onSearch }) {
  const [open, setOpen] = useState(false);

  const handleChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  const applyFilters = () => {
    onSearch();
    setOpen(false);
  };

  return (
    <div className="filter-wrapper">
      <button className="filter-toggle" onClick={() => setOpen(!open)}>
        🎛️ Filtri avanzati
      </button>

      <div className={`filter-box ${open ? "open" : ""}`}>
        <div className="filter-field">
          <label>Autore</label>
          <input
            type="text"
            placeholder="Es. J.K. Rowling"
            value={filters.author}
            onChange={(e) => handleChange("author", e.target.value)}
          />
        </div>

        <div className="filter-field">
          <label>Anno</label>
          <input
            type="text"
            placeholder="Es. 1997"
            value={filters.year}
            onChange={(e) => handleChange("year", e.target.value)}
          />
        </div>

        <div className="filter-field">
          <label>Genere</label>
          <input
            type="text"
            placeholder="Es. fantasy, mystery..."
            value={filters.subject}
            onChange={(e) => handleChange("subject", e.target.value)}
          />
        </div>

        <div className="filter-field">
          <label>Lingua</label>
          <input
            type="text"
            placeholder="ita, eng, spa..."
            value={filters.language}
            onChange={(e) => handleChange("language", e.target.value)}
          />
        </div>

        <button className="apply-button" onClick={applyFilters}>
          ✅ Applica filtri
        </button>
      </div>
    </div>
  );
}