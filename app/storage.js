// funkcija kuri pajima knygu sarasa is localStorage , jeigu yra isaugotu knygu ji grazina json obijekta , jei ne tada grazina tuscia masyva.

function getBooks() {
  const books = localStorage.getItem('books')
  return books ? JSON.parse(books) : []
}

// funkcija  kuri issaugo knygu sarasa i localStorage json formatu.

function saveBooks(books) {
  localStorage.setItem('books', JSON.stringify(books))
}


