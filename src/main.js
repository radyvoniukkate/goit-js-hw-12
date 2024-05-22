import { displayImages } from './js/render-functions.js';
import { fetchImages } from './js/pixabay-api.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

// Елемент для відображення завантажувача і кнопки завантаження
const loader = document.getElementById('loader');
const loadMoreButton = document.getElementById('load-more');
const gallery = document.getElementById('gallery');

// Обробка події сабміту форми
document
  .getElementById('search-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();
    const query = document.getElementById('search-input').value.trim();

    if (!query) {
      iziToast.error({
        title: 'Error',
        message: 'Please enter a search term!',
      });
      return;
    }

    // Оновлення змінних для нової пошукової фрази
    currentQuery = query;
    currentPage = 1;
    totalHits = 0;

    // Очищуємо галерею для нового запиту
    gallery.innerHTML = '';

    // Ховаємо кнопку завантаження та показуємо завантажувач
    loadMoreButton.style.display = 'none';
    loader.style.display = 'block';

    try {
      // Виконуємо HTTP-запит для отримання зображень
      const response = await fetchImages(currentQuery, currentPage);
      const images = response.hits;
      totalHits = response.totalHits; // Зберігаємо загальну кількість результатів

      console.log('Images fetched', images);

      // Показуємо зображення
      displayImages(images);

      // Показуємо кнопку "Load more" якщо є зображення і вони не закінчилися
      if (images.length > 0 && currentPage * images.length < totalHits) {
        loadMoreButton.style.display = 'block';
      } else if (images.length === 0) {
        iziToast.error({
          title: 'Error',
          message: 'No images found for the search query.',
        });
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      iziToast.error({
        title: 'Error',
        message: 'Failed to fetch images. Please try again later.',
      });
    } finally {
      // Ховаємо завантажувач після завершення запиту (незалежно від результату)
      loader.style.display = 'none';
    }
  });

// Обробка події кліку на кнопку "Load more"
loadMoreButton.addEventListener('click', async function () {
  currentPage += 1;
  loader.style.display = 'block';
  loadMoreButton.style.display = 'none';

  try {
    const response = await fetchImages(currentQuery, currentPage);
    const images = response.hits;

    console.log('More images fetched', images);

    displayImages(images);

    // Показуємо кнопку "Load more" якщо є зображення і вони не закінчилися
    if (images.length > 0 && currentPage * images.length < totalHits) {
      loadMoreButton.style.display = 'block';
    } else {
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    console.error('Error fetching more images:', error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch more images. Please try again later.',
    });
  } finally {
    loader.style.display = 'none';
  }
});

// Створюємо SimpleLightbox після завантаження документа
document.addEventListener('DOMContentLoaded', function () {
  new SimpleLightbox('.image-link');
});
