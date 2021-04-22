import {renderCard} from './card.js';
import {getData} from './data.js';

let cardsArray = [];
const card = document.querySelector('.card');
const question = document.querySelector(".card__face--front");
const answer = document.querySelector(".card__face--back");
const star = document.querySelector(".far");
let starQuestion = "";
let starAnswer = "";
let htmlQuestion = "";
let htmlAnswer = "";
let categoryFromApi = "";
let cardId = "";

export const showCardsByCategory = (category) => getData(category)
.then( (cardsFromApi) => {
    cardsArray = cardsFromApi;
    console.log("SHOW THEN 1","array", cardsArray);
    categoryFromApi = category;
})
.then(() => {
    renderCard(cardsArray);
    console.log("SHOW THEN 2");
})
.then(() => {
    console.log("SHOW THEN 3");
    card.classList.remove("is-flipped");
    star.classList.remove("display-none");
    let index = 0;
    const rightBtn = document.querySelector(".right");
    const leftBtn = document.querySelector(".left");
    leftBtn.classList.add("display-none");
    const maxIndex = objectLength(cardsArray)-1;
    console.log("max index:", maxIndex);
    console.log("length", objectLength(cardsArray));
    let cardIndex = null;
    let nextIndex = maxIndex + 1;
    let prevIndex = 0;
    rightBtn.classList.remove("display-none");
    console.log("before click index", index);
    console.log("before click nextIndex", nextIndex);
        for (const [i, value] of Object.entries(cardsArray)) {
            index = value.index || 0;
            if(index === renderCard(cardsArray)){
                cardId = i;
                break;
            }
        }
    console.log("555555", cardId);
    starHandler();

    rightBtn.addEventListener("click", () => {
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
                starQuestion = htmlQuestion;
                starAnswer = htmlAnswer;
                cardId = i;
                break;
            }
        }
        starHandler();
        cardIndex = nextIndex;
        console.log("cardIndex", cardIndex);
        nextIndex++;
        console.log("RRRR", htmlQuestion);

    });
    leftBtn.addEventListener("click", () => {
        card.classList.remove("is-flipped");
        prevIndex = cardIndex - 1;
        if(prevIndex < 0) prevIndex = maxIndex;
        for (const [i, value] of Object.entries(cardsArray)) {
            index = value.index || 0;
            htmlQuestion = `${value.question}`;
            htmlAnswer = `${value.answer}`;
            if(index === prevIndex){
                console.log(value);
                question.innerText = htmlQuestion;
                answer.innerText = htmlAnswer;
                starQuestion = htmlQuestion;
                starAnswer = htmlAnswer;
                cardId = i;
                break;
            }
        }
        starHandler();
        cardIndex = prevIndex;
        console.log("cardIndex", cardIndex);
    });
});

const editStar = (cardId, isSelected) => {
    fetch(`https://flashcards-ef26e-default-rtdb.firebaseio.com/data/${categoryFromApi}/${cardId}.json`, {
        method: 'PATCH',
        body: JSON.stringify({ isSelected })
    })
}

star.addEventListener('click', () => {
    star.classList.toggle("selected");
    card.classList.add("is-flipped");
    if(star.classList.contains('selected')){
        editStar(cardId, true);
    } else if(!star.classList.contains('selected')){
        editStar(cardId, false);
    }
});

const starHandler = () => {
    star.classList.remove("selected");
    for (const [i, value] of Object.entries(cardsArray)) {
        if(i === cardId && value.isSelected === true) {
            star.classList.add("selected");
        }
    }
}

const objectLength = (object) => {
    return Object.keys(object).length;
}