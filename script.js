const bookForm = document.getElementById('book-form');
const bookList = document.querySelector('#booklist ul');

class Book {
    constructor(title, author, category, year, price, image) {
        this.title = title;
        this.author = author;
        this.category = category;
        this.year = year;
        this.price = price;
        this.image = image;
    }
}

bookForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const category = document.getElementById('category').value;
    const year = document.getElementById('year').value;
    const price = document.getElementById('price').value;
    const image = document.getElementById('image').value;

    const book = new Book(title, author, category, year, price, image);
    addBook(book);
    bookForm.reset();
});

function addBook(book) {
    const books = getBooks();
    books.push(book);
    saveBooks(books);
    displayBooks();
}

function getBooks() {
    const books = localStorage.getItem('books');
    return books ? JSON.parse(books) : [];
}

function saveBooks(books) {
    localStorage.setItem('books', JSON.stringify(books));
}

function displayBooks() {
    const books = getBooks();
    let html = '';

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
        `;
    });

    bookList.innerHTML = html;
}

function deleteBook(index) {
    const books = getBooks();
    books.splice(index, 1);
    saveBooks(books);
    displayBooks();
}

function editBook(index) {
    const books = getBooks();
    const book = books[index];
    const listItem = bookList.children[index];

    listItem.innerHTML = `
        <form class="edit-form">
            <img src="${book.image}" alt="${book.title}" width="100">
            <label>Title:</label>
            <input type="text" class="edit-title" value="${book.title}">
            <label>Author:</label>
            <input type="text" class="edit-author" value="${book.author}">
            <label>Category:</label>
            <input type="text" class="edit-category" value="${book.category}">
            <label>Year:</label>
            <input type="number" class="edit-year" value="${book.year}">
            <label>Price:</label>
            <input type="number" step="0.01" class="edit-price" value="${book.price}">
            <label>Image URL:</label>
            <input type="url" class="edit-image" value="${book.image}">
            <button type="submit">Save</button>
            <button type="button" onclick="displayBooks()">Cancel</button>
        </form>
    `;

    const editForm = listItem.querySelector('.edit-form');
    editForm.addEventListener('submit', function updateBook(event) {
        event.preventDefault();

        book.title = listItem.querySelector('.edit-title').value;
        book.author = listItem.querySelector('.edit-author').value;
    book.category = listItem.querySelector('.edit-category').value;
    book.year = listItem.querySelector('.edit-year').value;
    book.price = listItem.querySelector('.edit-price').value;
    book.image = listItem.querySelector('.edit-image').value;

    books[index] = book;
    saveBooks(books);
    displayBooks();
})}

const toggleFormBtn = document.getElementById('toggle-form-btn');
const addBookForm = document.getElementById('add-book-form');

toggleFormBtn.addEventListener('click', () => {
    if (addBookForm.style.display === 'none') {
        addBookForm.style.display = 'block';
    } else {
        addBookForm.style.display = 'none';
    }
});