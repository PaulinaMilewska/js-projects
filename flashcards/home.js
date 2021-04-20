

const links = document.querySelectorAll(".navigation ul li a");
const card = document.querySelector('.card');
const question = document.querySelector(".card__face--front");
const answer = document.querySelector(".card__face--back");

const home = document.querySelector(".home");
const homeLink = document.querySelector(".home a");
homeLink.classList.add("clicked");
export const homeBtn = () => { home.addEventListener("click", () => {
    card.classList.remove("is-flipped");
    links.forEach((el) => {
        el.classList.remove("clicked");
      });
    homeLink.classList.add("clicked");
    question.innerText = "Do you already know the answers\nto all the questions?\n\nTry to answer all the them :)";
    answer.innerText = "If you know the answers to all the questions,\n\ncongratulations!"
    });
}