const searchBar = document.getElementById('search-bar')
const categoryFilter = document.getElementById('category')
const authorFilter = document.getElementById('author')
const sortBy = document.getElementById('sort-by')

function searchBooks() {
  const searchValue = searchBar.value.toLowerCase()
  const categoryValue = categoryFilter.value
  const authorValue = authorFilter.value
  const sortByValue = sortBy.value

  let filteredBooks = getBooks().filter(book => {
    const titleMatch = book.title.toLowerCase().includes(searchValue)
    const authorSearchMatch = book.author.toLowerCase().includes(searchValue)
    const categorySearchMatch = book.category.toLowerCase().includes(searchValue)
    const priceMatch = book.price.toString().toLowerCase().includes(searchValue)
    const yearMatch = book.year.toString().toLowerCase().includes(searchValue)

    return titleMatch || authorSearchMatch || categorySearchMatch || priceMatch || yearMatch
  })

  filteredBooks = filteredBooks.filter(book => {
    const categoryMatch = categoryValue === '' || book.category === categoryValue
    const authorMatch = authorValue === '' || book.author === authorValue

    return categoryMatch && authorMatch
  })

  if (sortByValue === 'price-low-high') {
    filteredBooks.sort((a, b) => a.price - b.price)
  } else if (sortByValue === 'price-high-low') {
    filteredBooks.sort((a, b) => b.price - a.price)
  }

  displayBooks(filteredBooks)
}

function populateFilters() {
  const storedBooks = getBooks()
  const authors = []
  const categories = []

  for (let book of storedBooks) {
    if (!authors.includes(book.author)) {
      authors.push(book.author)
    }
    if (!categories.includes(book.category)) {
      categories.push(book.category)
    }
  }

  for (let author of authors) {
    const authorOption = new Option(author, author)
    authorFilter.appendChild(authorOption)
  }

  for (let category of categories) {
    const categoryOption = new Option(category, category)
    categoryFilter.appendChild(categoryOption)
  }
}

searchBar.addEventListener('input', searchBooks)
categoryFilter.addEventListener('change', searchBooks)
authorFilter.addEventListener('change', searchBooks)
sortBy.addEventListener('change', searchBooks)
