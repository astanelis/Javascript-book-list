const toggleFormBtn = document.getElementById('toggle-form-btn');
const addBookForm = document.getElementById('add-book-form');

toggleFormBtn.addEventListener('click', () => {
  if (addBookForm.style.display === 'none') {
    addBookForm.style.display = 'block';
  } else {
    addBookForm.style.display = 'none';
  }
});

function initSwiper() {
  new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}

initSwiper();