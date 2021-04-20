import {renderCard} from './card.js';
import {getData} from './data.js';

let cardsArray = [];
const card = document.querySelector('.card');
const question = document.querySelector(".card__face--front");
const answer = document.querySelector(".card__face--back");

export const showCardsByCategory = (category) => getData(category)
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