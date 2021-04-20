import {dataCSS, dataHTML, dataJS, dataREACT, addData} from './data.js';
import {categoryBtnHandler} from './category.js';
import {homeBtn} from './home.js'

const card = document.querySelector('.card');
const html = document.querySelector(".html");
const htmlLink = document.querySelector(".html a");
const css = document.querySelector(".css");
const cssLink = document.querySelector(".css a");
const js = document.querySelector(".js");
const jsLink = document.querySelector(".js a");
const react = document.querySelector(".react");
const reactLink = document.querySelector(".react a");

// addData(dataCSS, "css");
// addData(dataHTML, "html");
// addData(dataJS, "js");
// addData(dataREACT, "react");

homeBtn();
categoryBtnHandler(html, htmlLink, "html");
categoryBtnHandler(css, cssLink, "css");
categoryBtnHandler(js, jsLink, "js");
categoryBtnHandler(react, reactLink, "react");

card.addEventListener( 'click', function() {
    card.classList.toggle('is-flipped');
  });