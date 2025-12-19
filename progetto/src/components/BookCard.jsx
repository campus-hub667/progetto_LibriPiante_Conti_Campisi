export default function BookCard({ book }) {
  return (
    <div className="card">
      <img
        src={book.imageLinks?.thumbnail || "https://via.placeholder.com/128x190"}
        alt={book.title}
      />
      <h3>{book.title}</h3>
      <p className="author">{book.authors?.[0]}</p>
      <span className="tag">{book.categories?.[0]}</span>
      <a href={book.previewLink} target="_blank">Vedi dettagli ↗</a>
    </div>
  );
}
