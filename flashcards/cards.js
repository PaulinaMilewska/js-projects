import {renderCard, renderCardFromArray} from './card.js';
import {getData, getAllData} from './data.js';

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
const rightBtn = document.querySelector(".right");
const leftBtn = document.querySelector(".left");

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
        let htmlQuestion = "";
        let htmlAnswer = "";
        for (const [i, value] of Object.entries(cardsArray)) {
            index = value.index || 0;
            htmlQuestion = `${value.question}`;
            htmlAnswer = `${value.answer}`;
            if(index === maxIndex){
                question.innerText = htmlQuestion;
                answer.innerText = htmlAnswer;
                cardId = i;
                break;
            }
        }
    console.log("cardId", cardId);
    starHandler(cardsArray);

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
        starHandler(cardsArray);
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
        starHandler(cardsArray);
        cardIndex = prevIndex;
        console.log("cardIndex", cardIndex);
    });
});

const editStar = (cardId, isSelected) => {
    for (const [i, value] of Object.entries(cardsArray)) {
        if(i === cardId && value.isSelected === true) {
            value.isSelected = false;
        } else if(i === cardId && value.isSelected === false){
            value.isSelected = true;
        }
    }
    for (const [i, value] of Object.entries(starCards)) {
        if(value.dbIndex === cardId && value.isSelected === true) {
            categoryFromApi = value.category;
            value.isSelected = false;
            console.log("!!!! ", cardId);
            console.log("*** starCards", starCards);
            for (const [i, value] of Object.entries(cardsArray)) {
                if(i === cardId && value.isSelected === true) {
                    value.isSelected = false;
                } else if(i === cardId && value.isSelected === false){
                    value.isSelected = true;
                }
            }
        } else if(value.dbIndex === cardId && value.isSelected === false){
            value.isSelected = true;
        }
    }
    fetch(`https://flashcards-ef26e-default-rtdb.firebaseio.com/data/${categoryFromApi}/${cardId}.json`, {
        method: 'PATCH',
        body: JSON.stringify({ isSelected })
    });
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

const starHandler = (array) => {
    star.classList.remove("selected");
    for (const [i, value] of Object.entries(array)) {
        console.log("SSSTTTAAARRR");
        console.log("i", i);
        console.log("cardId", cardId);
        console.log("value.isSelected === true", value.isSelected === true);
        if((i === cardId || value.dbIndex === cardId ) && value.isSelected === true) {
            console.log("IIINNN", i, cardId);
            star.classList.add("selected");
            break;
        }
    }
}

const objectLength = (object) => {
    return Object.keys(object).length;
}

const myCardsBtn = document.querySelector('.custom');

// const myCards = () => {

// }
let starCards = [];
myCardsBtn.addEventListener('click', () => {
    rightBtn.classList.remove("display-none");
    // const starData = renderCardFromArray(cardsArray, htmlQuestion, htmlAnswer);
    const starData = getAllData().then( cards => {
        starCards = cards;
        star.classList.remove("display-none");
        star.classList.add("selected");
        let starIndex = 0;
        cardIterate(starCards, starIndex);
        const maxIndex = objectLength(starCards)-1;
        rightBtn.addEventListener('click', () => {
            leftBtn.classList.remove("display-none");
            starIndex++;
            console.log("cards.length", maxIndex);
            if(starIndex > maxIndex) starIndex = 0;
            cardIterate(starCards, starIndex);
        });
        leftBtn.addEventListener('click', () => {
            starIndex--;
            console.log("cards.length", maxIndex);
            if(starIndex < 0) starIndex = maxIndex;
            cardIterate(starCards, starIndex);
        });

    })
})

const cardIterate = (data, index) => {
    for (const [i, value] of Object.entries(data)) {
        console.log("starIndex", typeof index);
        console.log("i", typeof i);
        console.log("value.question", value.question);
        if( parseInt(i) === index){
            console.log("INNN");
            htmlQuestion = `${value.question}`
            htmlAnswer = `${value.answer}`
            // index = value.index;
            cardId = value.dbIndex;
            break;
        }
    }
    question.innerText = htmlQuestion;
    answer.innerText = htmlAnswer;
    starHandler(data);

}