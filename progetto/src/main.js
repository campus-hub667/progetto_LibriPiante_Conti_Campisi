const app = document.querySelector("#app")

app.innerHTML = `
<header class="header">
  <h1>LibreriaOnline</h1>
  <p class="subtitle">Cerca e scopri milioni di libri da tutto il mondo</p>

  <div class="search-bar">
    <input
      id="searchInput"
      placeholder="Cerca per titolo, autore, ISBN o argomento..."
    />
    <button id="searchBtn">Cerca</button>
  </div>

  <button id="filtersBtn" class="filters-btn">🔽 Filtri</button>

  <section id="filtersPanel" class="filters-panel hidden">
    <div class="filters-header">
      <strong>Filtri</strong>
      <button id="closeFilters">✕</button>
    </div>

    <label>
      Ordina per
      <select id="order">
        <option value="relevance">Rilevanza</option>
        <option value="new">Più recenti</option>
      </select>
    </label>

    <label>
      Lingua
      <select id="language">
        <option value="">Tutte le lingue</option>
        <option value="eng">Inglese</option>
        <option value="ita">Italiano</option>
      </select>
    </label>

    <fieldset>
      <legend>Generi</legend>
      <label><input type="checkbox" value="fiction" /> Fiction</label>
      <label><input type="checkbox" value="fantasy" /> Fantasy</label>
      <label><input type="checkbox" value="mystery" /> Mystery</label>
      <label><input type="checkbox" value="romance" /> Romance</label>
      <label><input type="checkbox" value="science_fiction" /> Science Fiction</label>
    </fieldset>
  </section>
</header>

<section id="results" class="grid"></section>
`

const searchInput = document.querySelector("#searchInput")
const searchBtn = document.querySelector("#searchBtn")
const results = document.querySelector("#results")
const filtersBtn = document.querySelector("#filtersBtn")
const filtersPanel = document.querySelector("#filtersPanel")
const closeFilters = document.querySelector("#closeFilters")

filtersBtn.onclick = () => filtersPanel.classList.toggle("hidden")
closeFilters.onclick = () => filtersPanel.classList.add("hidden")

searchBtn.onclick = () => searchBooks()
searchInput.addEventListener("keydown", e => {
  if (e.key === "Enter") searchBooks()
})

async function searchBooks() {
  const query = searchInput.value
  if (!query) return

  const order = document.querySelector("#order").value
  const language = document.querySelector("#language").value
  const genres = [...document.querySelectorAll("fieldset input:checked")]
    .map(cb => cb.value)
    .join(" ")

  let q = `${query} ${genres}`.trim()
  let url = `https://openlibrary.org/search.json?q=${encodeURIComponent(q)}`

  if (language) url += `&language=${language}`
  if (order === "new") url += `&sort=first_publish_year desc`

  const res = await fetch(url)
  const data = await res.json()
  renderBooks(data.docs.slice(0, 12))
}

function renderBooks(books) {
  results.innerHTML = books
    .map(book => `
    <div class="card">
      <img
        src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg"
        onerror="this.style.display='none'"
      />
      <h3>${book.title}</h3>
      <p class="author">${book.author_name?.[0] || "Autore sconosciuto"}</p>

      <div class="meta">
        ${book.first_publish_year ? `<span>📅 ${book.first_publish_year}</span>` : ""}
        ${
          book.subject
            ? book.subject.slice(0, 3).map(s => `<span>${s}</span>`).join("")
            : ""
        }
      </div>

      <a href="https://openlibrary.org${book.key}" target="_blank">
        Vedi dettagli ↗
      </a>
    </div>
  `)
    .join("")
}


searchBooks("classic")