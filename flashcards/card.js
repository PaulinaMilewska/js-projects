const question = document.querySelector(".card__face--front");
const answer = document.querySelector(".card__face--back");

export const renderCard = (cards) => {
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