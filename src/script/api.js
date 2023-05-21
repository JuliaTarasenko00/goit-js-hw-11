import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API_KEY = '36534768-9895174b062ef79544d81d3db';

// function getImages(query, page = 1){
//   return fetch(`${URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=thue&per_page=40&page=${page}`)
//   .then(rest => rest.json());
// }
// export default { searchImages }

//!========================

export default class searchImages {
  constructor() {
    this.page = 1;
    this.values = '';
    this.totalHits = 0; 
  }
  async getImages() {
    const { data } = await axios.get(
      `${URL}?key=${API_KEY}&q=${this.values}&image_type=photo&orientation=horizontal&safesearch=thue&per_page=40&page=${this.page}`
    )
// console.log(data);
        this.incrementPage();
        this.totalHits = data.totalHits;
        return data.hits;
  }
  restPage() {
    this.page = 1;
  }
  incrementPage() {
    this.page += 1;
  }
}
