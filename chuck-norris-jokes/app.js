const joke = document.querySelector(".joke");

function getRandomJoke() {
    fetch("https://api.chucknorris.io/jokes/random")
    .then(res => res.json())
    .then(data => {
        console.log(data.value);
        joke.innerText = data.value;
    })
    .catch(rej => console.log(rej.message));
}

// getRandomJoke();

function getCategories(){
    fetch("https://api.chucknorris.io/jokes/categories")
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(rej => console.log(rej.message));
}

// getCategories();

function getJokesByQuery(query){
    fetch(`https://api.chucknorris.io/jokes/search?query=${query}`)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(rej => console.log(rej.message));
}

// getJokesByQuery("dog");

const chuckBtn = document.querySelector(".box a");

chuckBtn.addEventListener('click', getRandomJoke()
    // .then(data => {
    //     joke.innerText = data.value;
    // })
)