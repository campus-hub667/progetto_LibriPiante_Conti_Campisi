import React from "react";
import BookCard from "./BookCard.jsx";

export default function BookGrid({ books }) {
  return (
    <div className="grid">
      {books.map((b, i) => (
        <BookCard key={i} book={b} />
      ))}
    </div>
  );
}