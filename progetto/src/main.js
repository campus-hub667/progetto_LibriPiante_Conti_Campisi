import "./style.css"

const app = document.querySelector("#app")

app.innerHTML = `
  <div class="app">
    <header class="header">
      <h1>LibreriaOnline</h1>
      <p class="subtitle">
        Cerca e scopri milioni di libri da tutto il mondo
      </p>
    </header>

    <section class="search-section">
      <input
        id="searchInput"
        placeholder="Cerca per titolo, autore, ISBN o argomento..."
      />
      <button id="searchBtn">Cerca</button>
    </section>

    <button id="filtersBtn" class="filters-btn">
      <span>Filtri</span>
    </button>

    <section id="filtersPanel" class="filters-panel hidden">
      <label>
        Anno minimo
        <input id="yearInput" type="number" placeholder="Es. 1950" />
      </label>
    </section>

    <section class="results-section">
      <p id="resultsCount" class="results-count hidden"></p>
      <p id="loading" class="hidden">Caricamento...</p>
      <p id="error" class="error hidden"></p>
      <div id="results" class="results-list"></div>
    </section>
  </div>
`


const searchInput = document.querySelector("#searchInput")
const searchBtn = document.querySelector("#searchBtn")
const filtersBtn = document.querySelector("#filtersBtn")
const filtersPanel = document.querySelector("#filtersPanel")
const yearInput = document.querySelector("#yearInput")
const results = document.querySelector("#results")
const loading = document.querySelector("#loading")
const error = document.querySelector("#error")
const resultsCount = document.querySelector("#resultsCount")


searchBtn.addEventListener("click", fetchBooks)
filtersBtn.addEventListener("click", () => {
  filtersPanel.classList.toggle("hidden")
})


async function fetchBooks() {
  const query = searchInput.value.trim()
  const year = yearInput.value

  if (!query) return

  results.innerHTML = ""
  resultsCount.classList.add("hidden")
  loading.classList.remove("hidden")
  error.classList.add("hidden")

  try {
    const res = await fetch(
      https://openlibrary.org/search.json?q=${encodeURIComponent(query)}
    )
    const data = await res.json()

    let books = data.docs

    if (year) {
      books = books.filter(
        (b) => b.first_publish_year && b.first_publish_year >= year
      )
    }

    const sliced = books.slice(0, 12)

    resultsCount.textContent = ${sliced.length} risultati trovati
    resultsCount.classList.remove("hidden")

    sliced.forEach(renderBook)
  } catch (e) {
    error.textContent = "Errore nel caricamento dei dati"
    error.classList.remove("hidden")
  } finally {
    loading.classList.add("hidden")
  }
}


function renderBook(book) {
  const card = document.createElement("div")
  card.className = "book-card"

  const cover = book.cover_i
    ? <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" />
    : ""

  card.innerHTML = `
    ${cover}
    <h3>${book.title}</h3>
    <p class="authors">${book.author_name?.[0] || "Autore sconosciuto"}</p>
    <a href="https://openlibrary.org${book.key}" target="_blank">
      Vedi dettagli ↗
    </a>
  `

  results.appendChild(card)
}


const randomQueries = [
  "fiction",
  "history",
  "science",
  "art",
  "philosophy",
  "novel"
]

window.addEventListener("load", () => {
  const random =
    randomQueries[Math.floor(Math.random() * randomQueries.length)]
  searchInput.value = random
  fetchBooks()
})