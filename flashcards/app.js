const card = document.querySelector('.card');
card.addEventListener( 'click', function() {
  card.classList.toggle('is-flipped');
});

const data = [
    // {
    //     "What is CSS ?": "The full form of CSS is Cascading Style Sheets. It is a styling language which is simple enough for HTML elements. It is popular in web designing, and its application is common in XHTML also"
    // }
    // ,
    // {
    //     "What is the origin of CSS ?" : "Standard Generalized Markup Language marked the beginning of style sheets in 1980s"
    // },
    // {
    //     "What is Pseudo-elements ?" : "Pseudo-elements are used to add special effects to some selectors.  CSS in used to apply styles in HTML mark-up. In some cases when extra mark-up or styling is not possible for the document, then there is a feature available in CSS known as pseudo-elements. It will allow extra mark-up to the document without disturbing the actual document"
    // },
    {
        "How does Z index function?" : "Overlapping may occur while using CSS for positioning HTML elements. Z index helps in specifying the overlapping element. It is a number which can be positive or negative, the default value being zero"
    }
    ,
    // {
    //     "What is Inline style?" : "The Inline style in a CSS is used to add up styling to individual HTML elements"
    // }
    // ,
    // {   
    //     "How comments can be added in CSS?" : "The comments in CSS can be added with /* and */"
    // }
    // ,
    // {
    //     "What is Alternate Style Sheet?" : "Alternate Style Sheets allows the user to select the style in which the page is displayed using the view>page style menu. Through Alternate Style Sheet, user can see a multiple version of the page on their needs and preferences"
    // }
]

let i = 0;
function addData(){
    data.forEach( (element => {
        for (const [question, answer] of Object.entries(element)) {
            fetch(`https://flashcards-ef26e-default-rtdb.firebaseio.com/data/css.json`, {
            method: "POST",
            body: JSON.stringify({question, answer, index: i})
            })
        }
        i++;
    } ))
}

// addData();

// const question = document.querySelector(".card__face--front");
const answer = document.querySelector(".card__face--back");


let getQuestion = (event) =>
// function getQuestion()
{
    return fetch(`https://flashcards-ef26e-default-rtdb.firebaseio.com/data/css.json`)
    .then(res => res.json())
    .then(data => {
        return data;
        // cssCards = data;
        // for (const [index, value] of Object.entries(data)) {
        //     cssCards.push(value);
        // }
    })
    .catch((err) => {
        console.log('err', err.message);
    });
}
const question = document.querySelector(".card__face--front");
// getQuestion();
const renderCard = (cards) => {
    let html = "";
    let index = 0;
    for (const [i, value] of Object.entries(cards)) {
        // console.log(index, value);
        html = `${value.question}`
        index = value.index;
        // console.log(html);
        // console.log(index);
    }
    question.innerText = html;
    return index;
};

let cssCards = [];

getQuestion()
.then( (cardsFromApi) => {
    cssCards = cardsFromApi;
    console.log("array", cssCards);
})
.then(() => {
    renderCard(cssCards);
    console.log("cssCards", cssCards);
})
.then(() => {
    let index = 0;
    const rightBtn = document.querySelector(".right");
    const leftBtn = document.querySelector(".left");
    var nextIndex = renderCard(cssCards) + 1;
    console.log("nextIndex", nextIndex);
    rightBtn.addEventListener("click", () => {
        console.log("Next", cssCards);
        console.log("stop");
        let html = "";
        for (const [i, value] of Object.entries(cssCards)) {
            index = value.index;
            html = `${value.question}`
            if(value.index === nextIndex){
                console.log(value);
                question.innerText = html;
                nextIndex++;
            }
        }
        console.log("index",index);
    })
});

// question1.inneText = "text";

// getQuestion();
// console.log("array", cssCards);

const showNextQuestion = () => {
    const rightBtn = document.querySelector(".right");
    const leftBtn = document.querySelector(".left");
    var nextIndex = renderCard(cssCards) + 1;
    console.log("nextIndex", nextIndex);
    rightBtn.addEventListener("click", () => {
        console.log("Next", renderCard(cssCards));
        console.log("stop");
    })
}