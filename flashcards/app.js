import {dataCSS, dataHTML, dataJS, dataREACT, addData} from './data.js'

const card = document.querySelector('.card');
card.addEventListener( 'click', function() {
  card.classList.toggle('is-flipped');
});

// addData(dataCSS, "css");
// addData(dataHTML, "html");
// addData(dataJS, "js");
// addData(dataREACT, "react");

const question = document.querySelector(".card__face--front");
const answer = document.querySelector(".card__face--back");


let getQuestion = (category) =>{
    console.log(category);
    return fetch(`https://flashcards-ef26e-default-rtdb.firebaseio.com/data/${category}.json`)
    .then(res => res.json())
    .then(data => {
        return data;
    })
    .catch((err) => {
        console.log('err', err.message);
    });
}

const renderCard = (cards) => {
    let htmlQuestion = "";
    let htmlAnswer = "";
    let index = 0;
    for (const [i, value] of Object.entries(cards)) {
        htmlQuestion = `${value.question}`
        htmlAnswer = `${value.answer}`
        index = value.index;
    }
    question.innerText = htmlQuestion;
    answer.innerText = htmlAnswer;
    return index;
};

// let index = 0;
const rightBtn = document.querySelector(".right");
const leftBtn = document.querySelector(".left");
// let cardIndex = null;
// let maxIndex = null;


let cardsArray = [];

const showCardsByCategory = (category) => getQuestion(category)
.then( (cardsFromApi) => {
    cardsArray = cardsFromApi;
    console.log("SHOW THEN 1","array", cardsArray);
})
.then(() => {
    renderCard(cardsArray);
    console.log("SHOW THEN 2");
})
.then(() => {
    console.log("SHOW THEN 3");
    card.classList.remove("is-flipped");
    let index = 0;
    const rightBtn = document.querySelector(".right");
    const leftBtn = document.querySelector(".left");
    leftBtn.classList.add("display-none");
    const maxIndex = renderCard(cardsArray);
    let cardIndex = null;
    let nextIndex = renderCard(cardsArray) + 1;
    let prevIndex = 0;
    rightBtn.classList.remove("display-none");
    console.log("before click index", index);
    console.log("before click nextIndex", nextIndex);
    rightBtn.addEventListener("click", () => {
        console.log("render: ",renderCard(cardsArray));
        leftBtn.classList.remove("display-none");
        card.classList.remove("is-flipped");
        let htmlQuestion = "";
        let htmlAnswer = "";
        if(cardIndex !== null) nextIndex = cardIndex + 1;
        if(nextIndex > maxIndex) nextIndex = 0;
        for (const [i, value] of Object.entries(cardsArray)) {
            index = value.index || 0;
            htmlQuestion = `${value.question}`;
            htmlAnswer = `${value.answer}`;
            if(index === nextIndex){
                console.log(value);
                question.innerText = htmlQuestion;
                answer.innerText = htmlAnswer;
            }
        }
        cardIndex = nextIndex;
        console.log("cardIndex", cardIndex);
        nextIndex++;
    });
    leftBtn.addEventListener("click", () => {
        card.classList.remove("is-flipped");
        prevIndex = cardIndex - 1;
        if(prevIndex < 0) prevIndex = maxIndex;
        let htmlQuestion = "";
        let htmlAnswer = "";
        for (const [i, value] of Object.entries(cardsArray)) {
            index = value.index || 0;
            htmlQuestion = `${value.question}`;
            htmlAnswer = `${value.answer}`;
            if(index === prevIndex){
                console.log(value);
                question.innerText = htmlQuestion;
                answer.innerText = htmlAnswer;
            }
        }
        cardIndex = prevIndex;
        console.log("cardIndex", cardIndex);
    });
});

const home = document.querySelector(".home");
const homeLink = document.querySelector(".home a");
homeLink.classList.add("clicked");
home.addEventListener("click", () => {
    card.classList.remove("is-flipped");
    links.forEach((el) => {
        el.classList.remove("clicked");
      });
    homeLink.classList.add("clicked");
    question.innerText = "Do you already know the answers\nto all the questions?\n\nTry to answer all the them :)";
    answer.innerText = "If you know the answers to all the questions,\n\ncongratulations!"
});

const html = document.querySelector(".html");
const htmlLink = document.querySelector(".html a");
const css = document.querySelector(".css");
const cssLink = document.querySelector(".css a");
const js = document.querySelector(".js");
const jsLink = document.querySelector(".js a");
const react = document.querySelector(".react");
const reactLink = document.querySelector(".react a");
const links = document.querySelectorAll(".navigation ul li a");

const categoryBtnHandler = (categoryBtn, categoryLink, category) => {
    categoryBtn.addEventListener('click', () => {
        links.forEach((el) => {
            el.classList.remove("clicked");
          });
          categoryLink.classList.add("clicked");
        // maxIndex = renderCard(cardsArray);
        showCardsByCategory(category);
    });
}
categoryBtnHandler(html, htmlLink, "html");
categoryBtnHandler(css, cssLink, "css");
categoryBtnHandler(js, jsLink, "js");
categoryBtnHandler(react, reactLink, "react");
