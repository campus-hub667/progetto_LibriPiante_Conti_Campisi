import { useState } from "react";
import SearchBar from "./components/SearchBar";
import BookGrid from "./components/BookGrid";
import "./App.css";

export default function App() {
  const [books, setBooks] = useState([]);

  const searchBooks = async (query) => {
    const res = await fetch(`http://localhost:4000/api/books?q=${query}`);
    const data = await res.json();
    setBooks(data.items || []);
  };

  return (
    <div className="app">
      <header>
        <h1>📘 nome sito</h1>
        <p>Cerca e scopri milioni di libri da tutto il mondo</p>
      </header>

      <SearchBar onSearch={searchBooks} />
      <BookGrid books={books} />
    </div>
  );
}
