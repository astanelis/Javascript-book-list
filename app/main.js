const bookForm = document.getElementById('book-form')
const bookList = document.querySelector('#booklist ul.booklist-container')
const toggleFormBtn = document.getElementById('toggle-form-btn')
const addBookForm = document.getElementById('add-book-form')

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

toggleFormBtn.addEventListener('click', () => {
  if (addBookForm.style.display === 'none') {
    addBookForm.style.display = 'block'
  } else {
    addBookForm.style.display = 'none'
  }
})

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

populateFilters()
displayBooks()
initSwiper()
