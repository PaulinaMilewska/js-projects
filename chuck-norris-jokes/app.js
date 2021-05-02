function getRandomJoke() {
    fetch("https://api.chucknorris.io/jokes/random")
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(rej => console.log(rej.message));
}

getRandomJoke();

function getCategories(){
    fetch("https://api.chucknorris.io/jokes/categories")
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(rej => console.log(rej.message));
}

getCategories();

function getJokesByQuery(query){
    fetch(`https://api.chucknorris.io/jokes/search?query=${query}`)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(rej => console.log(rej.message));
}

getJokesByQuery("dog");