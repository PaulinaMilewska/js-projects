const joke = document.querySelector('.joke');

function getRandomJoke() {
    return fetch('https://api.chucknorris.io/jokes/random')
        .then((res) => res.json())
        .then((data) => data.value)
        .catch((rej) => console.log(rej.message));
}
const chuckBtn = document.querySelector('.box a');

function renderJoke(jokeText) {
    const getJoke = `${jokeText}`;
    joke.innerHTML = getJoke;
}

// getRandomJoke();
let jokeContent = '';

const printJoke = () => {
    getRandomJoke()
        .then((jokeApi) => {
            jokeContent = jokeApi;
        })
        .then(() => {
            renderJoke(jokeContent);
        });
};

function getCategories() {
    fetch('https://api.chucknorris.io/jokes/categories')
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((rej) => console.log(rej.message));
}

// getCategories();

function getJokesByQuery(query) {
    fetch(`https://api.chucknorris.io/jokes/search?query=${query}`)
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((rej) => console.log(rej.message));
}

// getJokesByQuery("dog");

chuckBtn.addEventListener('click', printJoke());

const hiddenInfo = document.querySelectorAll('[data-hidden]');

hiddenInfo.forEach((info, index) => {
    info.classList.add('hidden');
});

const categories = document.querySelectorAll('.categories li');
