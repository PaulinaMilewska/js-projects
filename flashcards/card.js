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

export const renderCardFromArray = (cards, htmlQuestion, htmlAnswer) => {
    // let htmlQuestion = "";
    // let htmlAnswer = "";
    let index = 0;
    // cards.foreach((value, i) => {
    //     htmlQuestion = `${value.question}`
    //     htmlAnswer = `${value.answer}`
    //     index = value.index;
    // })
    for (const [i, value] of Object.entries(cards)) {
        htmlQuestion = `${value.question}`
        htmlAnswer = `${value.answer}`
    }
    question.innerText = htmlQuestion;
    answer.innerText = htmlAnswer;
    console.log("111",htmlAnswer);
    console.log("222",htmlAnswer);
    console.log("333",cards);
    return index;
};