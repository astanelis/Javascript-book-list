// funkcija, kuri prideda nauja knyga ir itraukia i knygu sarasa , isaugo ir rodo knygu sarasa.

function addBook(book) {
  const books = getBooks()
  books.push(book)
  saveBooks(books)
  displayBooks()
}

// funkcija kuri istrina knyga is knygu saraso.Pasalina ta knyga kuria pasirenki ir issaugo nauja knygu sarasa

function deleteBook(index) {
  const books = getBooks()
  books.splice(index, 1)
  saveBooks(books)
  displayBooks()
}

// funkcija kuri rodo knygas puslapyje . Sukuria html koda kekvienai knygai duotame masyve ir iterpia i elementa su ID bookList. Sukurtame faile yra info apie knyga ir trynimo mygtukas ir redagavimo .

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

  // Swiperio biblioteka , jeigu yra knygu kurias rodyti atsiranda mygtukai , jei nera ju nesimato . Leidzia judeti pirmyn ir atgla  stumdyti knygas su rodyklem ir pelyte.

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

// Funkcija kuri leidzia redaguoti knygos informacija tam tikram masyve. Pakeicia html forma , kuri buvo sukurta anksciau su kita funkcija . Paspaudus mygtuka save informacija atsinaujina ir pasikeicia masyve .

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
