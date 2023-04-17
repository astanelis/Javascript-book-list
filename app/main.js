const bookForm = document.getElementById('book-form')
const bookList = document.querySelector('#booklist ul.booklist-container')

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





displayBooks()
initSwiper()



