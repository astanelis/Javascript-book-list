const bookForm = document.getElementById('book-form')
const bookList = document.querySelector('#booklist ul.booklist-container')

class Book {
  constructor(title, author, category, year, price, image) {
    this.title = title
    this.author = author
    this.category = category
    this.year = year
    this.price = price
    this.image = image
  }
}

bookForm.addEventListener('submit', function (event) {
  event.preventDefault()

  const title = document.getElementById('title').value
  const author = document.getElementById('add-author').value
  const category = document.getElementById('add-category').value
  const year = document.getElementById('year').value
  const price = document.getElementById('price').value
  const image = document.getElementById('image').value

  const book = new Book(title, author, category, year, price, image)
  addBook(book)
  bookForm.reset()
})

function addBook(book) {
  const books = getBooks()
  books.push(book)
  saveBooks(books)
  displayBooks()
}

function getBooks() {
  const books = localStorage.getItem('books')
  return books ? JSON.parse(books) : []
}

function saveBooks(books) {
  localStorage.setItem('books', JSON.stringify(books))
}

function displayBooks(booksToDisplay = getBooks()) {
  let html = ''

  booksToDisplay.forEach((book, index) => {
    html += `
              <li class="swiper-slide booklist-item">
                  <img src="${book.image}" alt="${book.title}" width="100" class="book-image">
                  <h3 class="book-title">${book.title}</h3>
                  <p class="book-author">Author: ${book.author}</p>
                  <p class="book-category">Category: ${book.category}</p>
                  <p class="book-year">Year: ${book.year}</p>
                  <p class="book-price">Price: $${book.price}</p>
                  <div class="button-container">
              <button class="generated-button" onclick="deleteBook(${index})">Delete</button>
              <button class="generated-button" onclick="editBook(${index})">Edit</button>
          </div>
              </li>
          `
  })

  bookList.innerHTML = html
  initSwiper()

  const nextButton = document.querySelector('.swiper-button-next')
  const prevButton = document.querySelector('.swiper-button-prev')

  if (booksToDisplay.length > 0) {
    nextButton.style.display = 'flex'
    prevButton.style.display = 'flex'
  } else {
    nextButton.style.display = 'none'
    prevButton.style.display = 'none'
  }
}

function deleteBook(index) {
  const books = getBooks()
  books.splice(index, 1)
  saveBooks(books)
  displayBooks()
}

function editBook(index) {
  const books = getBooks()
  const book = books[index]
  const listItem = bookList.children[index]

  listItem.innerHTML = `
        <form class="edit-form">
            <img src="${book.image}" alt="${book.title}" width="100" class="book-image">
            <label>Title:</label>
            <input type="text" class="edit-title generated-input" value="${book.title}">
            <label>Author:</label>
            <input type="text" class="edit-author generated-input" value="${book.author}">
            <label>Category:</label>
            <input type="text" class="edit-category generated-input" value="${book.category}">
            <label>Year:</label>
            <input type="number" class="edit-year generated-input" value="${book.year}">
            <label>Price:</label>
            <input type="number" step="0.01" class="edit-price generated-input" value="${book.price}">
            <label>Image URL:</label>
            <input type="url" class="edit-image generated-input" value="${book.image}">
            <button type="submit" class="generated-button">Save</button>
            <button type="button" class="generated-button" onclick="displayBooks()">Cancel</button>
        </form>
    `

  const editForm = listItem.querySelector('.edit-form')
  editForm.addEventListener('submit', function updateBook(event) {
    event.preventDefault()

    book.title = listItem.querySelector('.edit-title').value
    book.author = listItem.querySelector('.edit-author').value
    book.category = listItem.querySelector('.edit-category').value
    book.year = listItem.querySelector('.edit-year').value
    book.price = listItem.querySelector('.edit-price').value
    book.image = listItem.querySelector('.edit-image').value

    books[index] = book
    saveBooks(books)
    displayBooks()
  })
}

const toggleFormBtn = document.getElementById('toggle-form-btn')
const addBookForm = document.getElementById('add-book-form')

toggleFormBtn.addEventListener('click', () => {
  if (addBookForm.style.display === 'none') {
    addBookForm.style.display = 'block'
  } else {
    addBookForm.style.display = 'none'
  }
})

displayBooks()

function initSwiper() {
  new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })
}

displayBooks()
initSwiper()

// Knygu paieska
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
searchBar.addEventListener('input', searchBooks)
categoryFilter.addEventListener('change', searchBooks)
authorFilter.addEventListener('change', searchBooks)
sortBy.addEventListener('change', searchBooks)

// Knygu paieska
