const joke = document.querySelector('.joke');
const container = document.querySelector('.container');

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

const categoryContainer = document.querySelector('.categoryContainer');

const renderQueryJoke = (jokes) => {
    const html = jokes
        .map((joke) => {
            return `
     <div class="joke-box">
      <p>${joke.value}</p>
     </div>
     `;
        })
        .join('');
    categoryContainer.classList.remove('display-none');
    categoryContainer.innerHTML = html;
};

const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    let searchQuery = form.search.value;
    getJokesByQuery(searchQuery);
    form.search.value = '';
});

// getCategories();
let queryArray = [];
function getJokesByQuery(query) {
    fetch(`https://api.chucknorris.io/jokes/search?query=${query}`)
        .then((res) => res.json())
        .then((data) => {
            // console.log(data.result);
            return data.result;
        })
        .then((jokesFromApi) => {
            queryArray = jokesFromApi;
        })
        .then(() => {
            container.classList.add('display-none');
            renderQueryJoke(queryArray);
        })
        .catch((rej) => console.log(rej.message));
}

let categoryJoke = '';
function getJokesByCategory(category) {
    fetch(`https://api.chucknorris.io/jokes/random?category=${category}`)
        .then((res) => res.json())
        // .then((data) => console.log(data.value))
        .then((data) => data.value)
        .then((apiCatJoke) => (categoryJoke = apiCatJoke))
        .then(() => {
            renderJoke(categoryJoke);
        })
        .catch((rej) => console.log(rej.message));
}

const categoriesBtn = document.querySelectorAll('.categories li');
const imageBtn = document.querySelector('.box img');

chuckBtn.addEventListener('click', (event) => {
    event.preventDefault();
    imageBtn.classList.add('push');
    categoriesBtn.forEach((el, index) => {
        if (el.dataset.select == 'true') {
            if (el.dataset.category == 'home') {
                printJoke();
            } else {
                let cate = el.dataset.category;
                getJokesByCategory(cate);
            }
        }
    });
    setTimeout(() => {
        imageBtn.classList.remove('push');
    }, 500);
});

const hiddenInfo = document.querySelectorAll('[data-hidden]');

hiddenInfo.forEach((info, index) => {
    info.classList.add('hidden');
});

categoriesBtn.forEach((category, index) => {
    category.addEventListener('click', (event) => {
        event.preventDefault();
        categoryContainer.classList.add('display-none');
        container.classList.remove('display-none');
        categoriesBtn.forEach((cat) => {
            cat.setAttribute('data-select', 'false');
        });
        let data = '';
        const pathArr = event.path;
        // FOREACH NOT TOLERATE break;
        for (const el of pathArr) {
            if (el.dataset.category == 'home') {
                el.setAttribute('data-select', 'true');
                data = el.dataset.category;
                console.log('HOME');
                printJoke();
                break;
            } else if (el.dataset.category != (undefined || null)) {
                el.setAttribute('data-select', 'true');
                data = el.dataset.category;
                console.log(data);
                getJokesByCategory(data);
                break;
            }
        }
        imageBtn.src = `./images/${data}.png`;
    });
});
