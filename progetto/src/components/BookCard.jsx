import React from "react";

export default function BookCard({ book }) {
  const img = book.coverId
    ? `https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`
    : "https://via.placeholder.com/128x190";

  return (
    <div className="card">
      <img src={img} alt={book.title} />
      <h3>{book.title}</h3>

      <p className="author">
        {book.authors?.join(", ") || "Autore sconosciuto"}
        {book.year ? ` • ${book.year}` : ""}
      </p>

      <span className="tag">{book.subject || "Senza categoria"}</span>

      <a
        href={`https://openlibrary.org${book.key}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Vedi dettagli ↗
      </a>
    </div>
  );
}