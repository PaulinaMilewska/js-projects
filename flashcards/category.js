import {showCardsByCategory} from './cards.js';

const links = document.querySelectorAll(".navigation ul li a");

export const categoryBtnHandler = (categoryBtn, categoryLink, category) => {
    categoryBtn.addEventListener('click', () => {
        links.forEach((el) => {
            el.classList.remove("clicked");
          });
          categoryLink.classList.add("clicked");
        showCardsByCategory(category);
    });
}