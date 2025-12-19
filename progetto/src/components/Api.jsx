import { useState } from "react"
import "./App.css"

export default function App() {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function fetchBooks() {
    if (!title.trim()) return

    setLoading(true)
    setError(null)

    try {
      // 1. Ricerca libri
      const res = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(
          title + " " + author
        )}`
      )
      const data = await res.json()

      // 2. Inizializza libri con isbn_13 = null
      const parsedBooks = data.docs.slice(0, 10).map((book) => ({
        ...book,
        isbn_13: null,
      }))

      setBooks(parsedBooks)

      // 3. Carica ISBN-13 in background
      parsedBooks.forEach(async (book) => {
        try {
          const resEditions = await fetch(
            `https://openlibrary.org${book.key}/editions.json`
          )
          const editionsData = await resEditions.json()
          let isbn_13 = null

          for (let edition of editionsData.entries || []) {
            if (edition.isbn_13?.length) {
              isbn_13 = edition.isbn_13[0]
              break
            }
          }

          // Aggiorna lo stato con l'ISBN-13 (fix bug: non usare index)
          setBooks((prev) =>
            prev.map((b) =>
              b.key === book.key ? { ...b, isbn_13 } : b
            )
          )
        } catch (e) {
          console.log("Errore nel recupero delle edizioni:", e)
        }
      })
    } catch (e) {
      setError("Errore nel caricamento dei dati")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>BooksArchive</h1>
        <p className="subtitle">Scopri libri, autori e storie</p>
      </header>

      <section className="search-section">
        <input
          placeholder="Cerca un libro"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Autore"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button onClick={fetchBooks}>🔍</button>
      </section>

      <section className="results-section">
        <h2>Risultati</h2>

        {loading && <p>Caricamento...</p>}
        {error && <p className="error">{error}</p>}

        <div className="results-list">
          {books.map((book) => (
            <BookCard key={book.key} book={book} />
          ))}
        </div>
      </section>
    </div>
  )
}

function BookCard({ book }) {
  const coverId = book.cover_i

  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p className="authors">
        {book.author_name?.join(", ") || "Autore sconosciuto"}
      </p>

      <div className="card-body">
        {coverId && (
          <img
            src={`https://covers.openlibrary.org/b/id/${coverId}-M.jpg`}
            alt={book.title}
          />
        )}
        <div className="description">
          {book.isbn_13 && <p className="isbn">ISBN-13: {book.isbn_13}</p>}
          <p>
            {typeof book.first_sentence === "string"
              ? book.first_sentence
              : typeof book.first_sentence?.value === "string"
              ? book.first_sentence.value
              : "Descrizione non disponibile"}
          </p>
        </div>
      </div>

      <div className="card-actions">🔖 👁️ ℹ️</div>
    </div>
  )
}
