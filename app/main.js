const bookForm = document.getElementById('book-form')
const bookList = document.querySelector('#booklist ul.booklist-container')
const toggleFormBtn = document.getElementById('toggle-form-btn')
const addBookForm = document.getElementById('add-book-form')

//is formos nuskaito pavadinima, autoriu, kategorija, metus, kaina ir nuotraukos reikšmes.Sukuria nauja knygos obijekta su ivestomis reiksmemis.iskviecia funkciją addBook .is naujo nustato forma, kad pridejus knyga butu isvalyti visi laukai.

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

// jeigu mygtukas nera paspaustas formos nesimato , jeigu mygtuka paspaudi forma islenda ir pasirodo.

toggleFormBtn.addEventListener('click', () => {
  if (addBookForm.style.display === 'none') {
    addBookForm.style.display = 'block'
  } else {
    addBookForm.style.display = 'none'
  }
})

// funkcija kuri sukuria karusele pagal swiperio biblioteka .

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
