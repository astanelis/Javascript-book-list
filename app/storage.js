function getBooks() {
  const books = localStorage.getItem('books');
  return books ? JSON.parse(books) : [];
}

function saveBooks(books) {
  localStorage.setItem('books', JSON.stringify(books));
}