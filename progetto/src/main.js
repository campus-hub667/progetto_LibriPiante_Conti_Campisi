import "./style.css"

const app = document.querySelector("#app")

app.innerHTML = `
  <div class="app">
    <header class="header">
      <h1>BooksArchive</h1>
      <p class="subtitle">Scopri libri, autori e storie</p>
    </header>

    <section class="search-section">
      <input id="titleInput" placeholder="Cerca un libro" />
      <input id="authorInput" placeholder="Autore" />
      <button id="searchBtn">🔍</button>
    </section>

    <section class="results-section">
      <h2>Risultati</h2>
      <p id="loading" class="hidden">Caricamento...</p>
      <p id="error" class="error hidden"></p>
      <div id="results" class="results-list"></div>
    </section>
  </div>
`

const titleInput = document.querySelector("#titleInput")
const authorInput = document.querySelector("#authorInput")
const searchBtn = document.querySelector("#searchBtn")
const results = document.querySelector("#results")
const loading = document.querySelector("#loading")
const error = document.querySelector("#error")

searchBtn.addEventListener("click", fetchBooks)

async function fetchBooks() {
  const title = titleInput.value.trim()
  const author = authorInput.value.trim()

  if (!title) return

  results.innerHTML = ""
  error.classList.add("hidden")
  loading.classList.remove("hidden")

  try {
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(
        title + " " + author
      )}`
    )
    const data = await res.json()

    const books = data.docs.slice(0, 10)

    books.forEach(renderBook)
  } catch (e) {
    error.textContent = "Errore nel caricamento dei dati"
    error.classList.remove("hidden")
  } finally {
    loading.classList.add("hidden")
  }
}

function renderBook(book) {
  const div = document.createElement("div")
  div.className = "book-card"

  const cover = book.cover_i
    ? `<img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" />`
    : ""

  const authors = book.author_name?.join(", ") || "Autore sconosciuto"

  const description =
    typeof book.first_sentence === "string"
      ? book.first_sentence
      : typeof book.first_sentence?.value === "string"
      ? book.first_sentence.value
      : "Descrizione non disponibile"

  div.innerHTML = `
    <h3>${book.title}</h3>
    <p class="authors">${authors}</p>
    <div class="card-body">
      ${cover}
      <div class="description">
        <p>${description}</p>
      </div>
    </div>
    <div class="card-actions">🔖 👁️ ℹ️</div>
  `

  results.appendChild(div)
}
