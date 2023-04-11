const bookForm = document.getElementById('book-form')
const bookList = document.getElementById('booklist')

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
  const author = document.getElementById('author').value
  const category = document.getElementById('category').value
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
function displayBooks() {
  const books = getBooks()
  let html = ''

  books.forEach((book, index) => {
    html += `
          <li>
              <img src="${book.image}" alt="${book.title}" width="100">
              <h3>${book.title}</h3>
              <p>Author: ${book.author}</p>
              <p>Category: ${book.category}</p>
              <p>Year: ${book.year}</p>
              <p>Price: $${book.price}</p>
              <button onclick="deleteBook(${index})">Delete</button>
              <button onclick="editBook(${index})">Edit</button>
          </li>
      `
  })

  bookList.innerHTML = `<ul>${html}</ul>`
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

  document.getElementById('title').value = book.title
  document.getElementById('author').value = book.author
  document.getElementById('category').value = book.category
  document.getElementById('year').value = book.year
  document.getElementById('price').value = book.price
  document.getElementById('image').value = book.image

  bookForm.removeEventListener('submit', addBook)

  bookForm.addEventListener('submit', function updateBook(event) {
    event.preventDefault()

    book.title = document.getElementById('title').value
    book.author = document.getElementById('author').value
    book.category = document.getElementById('category').value
    book.year = document.getElementById('year').value
    book.price = document.getElementById('price').value
    book.image = document.getElementById('image').value

    books[index] = book
    saveBooks(books)
    displayBooks()

    bookForm.reset()
    bookForm.removeEventListener('submit', updateBook)
    bookForm.addEventListener('submit', addBook)
  })
}

displayBooks()
