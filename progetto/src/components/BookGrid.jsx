import BookCard from "./BookCard";

export default function BookGrid({ books }) {
  return (
    <div className="grid">
      {books.map((b) => (
        <BookCard key={b.id} book={b.volumeInfo} />
      ))}
    </div>
  );
}