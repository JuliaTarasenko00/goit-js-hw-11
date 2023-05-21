import Notiflix from 'notiflix';
import searchImages from './api.js';
import loadMoreBtn from './loadMore.js';

const refs = {
  formEl: document.getElementById('search-form'),
  buttonEl: document.querySelector('.btn'),
  divEl: document.querySelector('.gallery'),
  imgEl: document.querySelector('.img-card'),
};

const newImage = new searchImages();
const newLoadMoreBtn = new loadMoreBtn('.load-more', true);

refs.formEl.addEventListener('submit', onSubmit);
newLoadMoreBtn.button.addEventListener('click', onClick);

function onSubmit(ev) {
  ev.preventDefault();
  const form = ev.currentTarget;
  const value = form.elements.searchQuery.value.trim();
  if (value === '') {
    return Notiflix.Notify.warning(
      'Please enter a value to search for images!'
    );
  } else {
    newImage.values = value;
    newImage.restPage();

    newLoadMoreBtn.removeBtn();
    delitMarkup();

    onClick().finally(() => form.reset());
  
}}

function onClick() {
  if (newImage.page > 1 && newImage.page > Math.ceil(newImage.totalHits / 40)) {
    newLoadMoreBtn.hideBtn();
    return Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
  }
  newLoadMoreBtn.disable();
  return getRestPage().then(() => newLoadMoreBtn.enable());
}

async function getRestPage() {
  try {
    const articles = await newImage.getImages();
    // console.log(articles);
    if (articles.length === 0) {
      throw new Error(onError);
    }
    const markup =  articles.reduce((markup, hit) => markup + createMarkup(hit), '');
    if(!markup){
      return;
    } else{
      Notiflix.Notify.success(
        `Hooray! We found ${newImage.totalHits} images.`
      );
    }
    return  updateMarkup(markup);
  } catch (err) {
    onError(err);
  };
}

function createMarkup({
  webformatURL,
  tags,
  likes,
  views,
  comments,
  downloads,
  largeImageURL,
}) {
  return `<div class="photo-card">
<img class="img-card" src="${webformatURL}" alt="${tags}" loading="lazy" />
<div class="info">
  <p class="info-item">
    <b>Likes: ${likes}</b>
  </p>
  <p class="info-item">
    <b>Views: ${views}</b>
  </p>
  <p class="info-item">
    <b>Comments: ${comments}</b>
  </p>
  <p class="info-item">
    <b>Downloads: ${downloads}</b>
  </p>
</div>
</div>`;
}
function updateMarkup(markup) {
  refs.divEl.insertAdjacentHTML('beforeend', markup);
}

function delitMarkup() {
  refs.divEl.innerHTML = '';
}

function onError(er) {
  console.log(er);
  newLoadMoreBtn.hideBtn();
  return Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}
