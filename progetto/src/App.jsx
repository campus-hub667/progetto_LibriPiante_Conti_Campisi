import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar.jsx";
import FilterPanel from "./components/FilterPanel.jsx";
import BookGrid from "./components/BookGrid.jsx";

export default function App() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    author: "",
    year: "",
    subject: "",
    language: ""
  });

  // 🔥 Carica libri casuali al primo avvio
  useEffect(() => {
    loadRandomBooks();
  }, []);

  const loadRandomBooks = async () => {
    setLoading(true);

    const randomPage = Math.floor(Math.random() * 50) + 1;
    const url = `https://openlibrary.org/search.json?q=fantasy&page=${randomPage}`;

    const res = await fetch(url);
    const data = await res.json();

    const normalized = data.docs.slice(0, 20).map((b) => ({
      title: b.title,
      authors: b.author_name,
      coverId: b.cover_i,
      subject: b.subject?.[0],
      key: b.key,
      year: b.first_publish_year
    }));

    setBooks(normalized);
    setLoading(false);
  };

  // 🔍 Ricerca con barra + filtri
  const searchBooks = async () => {
    if (!searchTerm && !filters.author && !filters.subject) return;

    setLoading(true);

    const url =
      `https://openlibrary.org/search.json?q=${encodeURIComponent(searchTerm || "")}` +
      (filters.author ? `&author=${encodeURIComponent(filters.author)}` : "") +
      (filters.year ? `&publish_year=${filters.year}` : "") +
      (filters.subject ? `&subject=${encodeURIComponent(filters.subject)}` : "") +
      (filters.language ? `&language=${filters.language}` : "");

    try {
      const res = await fetch(url);
      const data = await res.json();

      const normalized = data.docs.map((b) => ({
        title: b.title,
        authors: b.author_name,
        coverId: b.cover_i,
        subject: b.subject?.[0],
        key: b.key,
        year: b.first_publish_year
      }));

      setBooks(normalized);
    } catch (err) {
      console.error("Errore nella ricerca:", err);
      setBooks([]);
    }

    setLoading(false);
  };

  return (
    <div className="app">
      <header>
        <h1>📘 LibreriaOnline</h1>
        <p>Cerca e filtra libri da OpenLibrary</p>
      </header>

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        onSearch={searchBooks}
      />

      <FilterPanel
        filters={filters}
        setFilters={setFilters}
        onSearch={searchBooks}
      />

      {loading ? <div className="loader"></div> : <BookGrid books={books} />}
    </div>
  );
}
