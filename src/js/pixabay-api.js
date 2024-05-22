import axios from 'axios';

const API_KEY = '43969055-d0c46f522fb3643e2ec2eb3d1';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 15) {
  const URL = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  try {
    const response = await axios.get(URL);
    return response.data; // Повертаємо всю відповідь
  } catch (error) {
    throw new Error('Error fetching images: ' + error.message);
  }
}
