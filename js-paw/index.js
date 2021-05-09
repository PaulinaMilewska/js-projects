document.addEventListener('DOMContentLoaded', () => {
    sessionStorage.setItem('Cockpit-Token', 'e607a0cf025ec1d0a50d1f148d4bce');
});

let fetchDogs = (event) => {
    let url =
        'http://getcockpit.pmedia-test.pl/rekrutacja/api/collections/get/pieski';

    let req = new Request(url, {
        method: 'GET',
        headers: {'Cockpit-Token': 'e607a0cf025ec1d0a50d1f148d4bce'},
        mode: 'cors',
    });
    return fetch(req)
        .then((resp) => {
            if (!resp.ok) {
                throw Error('Wrong HTTP status');
            }
            return resp.json();
        })
        .then((data) => {
            return data.entries;
        })
        .catch((err) => {
            console.log('err', err.message);
        });
};

const renderDogs = (dogs) => {
    const html = dogs
        .map((dog) => {
            return `
     <div class="dog-box">
      <img class="dog-image" src="http://getcockpit.pmedia-test.pl${dog.image.path}" alt="">
      <ul>
          <li><p>${dog.name}, ${dog.age}</p></li>
          <li><p>${dog.stars} <img class="dog-star" src="images/star.svg" alt=""><p/></li>
      </ul>
      <p>${dog.description}</p>
     </div>
     `;
        })
        .join('');
    const box = (document.querySelector('#box').innerHTML = html);
};

let dogs = [];

fetchDogs()
    .then((dogsFromApi) => {
        dogs = dogsFromApi;
    })
    .then(() => {
        renderDogs(dogs);
    });

// filters

const filters = {
    sex: {
        all: () => true,
        male: (dogs) => dogs.sex === 'piesek',
        female: (dogs) => dogs.sex === 'suczka',
    },
    stars: {
        all: () => true,
        one: (dogs) => dogs.stars == '1',
        two: (dogs) => dogs.stars == '2',
        three: (dogs) => dogs.stars == '3',
        four: (dogs) => dogs.stars == '4',
        five: (dogs) => dogs.stars == '5',
    },
    //   age: {

    //   }
};

let activeFilters = [];

const maleFilter = () => {
    const male = document.querySelector('#piesek');
    const female = document.querySelector('#suczka');
    male.addEventListener('click', () => {
        // console.log("male filter")
        renderDogs(dogs.filter((d) => d.sex === 'piesek'));
        female.classList.remove('active');
        male.classList.add('active');
    });
    female.addEventListener('click', () => {
        // console.log("feMale filter")
        renderDogs(dogs.filter((d) => d.sex === 'suczka'));
        male.classList.remove('active');
        female.classList.add('active');
    });
};

const stars = document.querySelectorAll('.search__stars ul li');
const starValue = document.querySelectorAll('.search__stars ul li p');

const starFilter = () => {
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            stars.forEach((star) => {
                star.classList.remove('active');
            });
            star.classList.add('active');
            renderDogs(
                dogs.filter((d) => d.stars == starValue[index].innerText)
            );
        });
    });
};

const slides = document.querySelectorAll('input');
const ageFilter = () => {
    let slide1 = parseFloat(slides[0].value);
    let slide2 = parseFloat(slides[1].value);
    if (slide1 > slide2) {
        let tmp = slide2;
        slide2 = slide1;
        slide1 = tmp;
    }
    const displayElement = document.querySelectorAll('.rangeValues')[0];
    displayElement.innerHTML = slide1 + ' - ' + slide2;
    console.log('slide1', slide1);
    console.log('slide2', slide2);
    renderDogs(dogs.filter((d) => d.age >= slide1 && d.age <= slide2));
};

const sliderSections = document.querySelectorAll('.range-slider');
for (let x = 0; x < sliderSections.length; x++) {
    let sliders = sliderSections[x].querySelectorAll('input');
    for (let y = 0; y < sliders.length; y++) {
        if (sliders[y].type === 'range') {
            sliders[y].oninput = ageFilter;
            sliders[y].oninput();
        }
    }
}
maleFilter();
starFilter();
ageFilter();

// const filters = {
// 	sex: {
// 		all: () => true,
// 		male: (dogs) => dogs.sex === "male",
// 		female: (dogs) => dogs.sex === "female"
// 	  },
// 	  stars: {
// 		all: () => true,
// 		one: (dogs) => dogs.stars === "1",
// 		two: (dogs) => dogs.stars === "2",
// 		three: (dogs) => dogs.stars === "3",
// 		four: (dogs) => dogs.stars === "4",
// 		five: (dogs) => dogs.stars === "5"
// 	  },
// 	//   age: {

// 	//   }
// };

// let activeFilters = [];

//   const makeSelect = (id, textLabel, options) => {
// 	const field = document.createElement("span")
// 	const label = document.createElement("label")
// 	const select = document.createElement("select");
// 	const defaultOptions = [{ value: 'all', label: "" }];

// 	label.textContent = textLabel;

// 	label.setAttribute('for', id);
// 	select.setAttribute('id', id);

// 	defaultOptions.concat(options).forEach((option) => {
// 	  const node = document.createElement("option");
// 	  node.setAttribute("value", `${id}:${option.value}`);
// 	  node.textContent = option.label;
// 	  select.appendChild(node);
// 	});

// 	select.addEventListener("change", (event) => {
// 	  const prefix = id;

// 	  activeFilters = activeFilters.filter(name => name.indexOf(`${id}:`) !== 0);

// 	  const value = event.target.value

// 	  if (value.includes(':') === false) {
// 		return;
// 	  }

// 	  activeFilters = activeFilters.concat(value)

// 	  const filteringFunctions = activeFilters.map(filterId => {
// 		const [prefix, name] = filterId.split(':')
// 		const filteringFunction = filters[prefix][name]
// 		return filteringFunction;
// 	  })

// 	  const dogsToDisplay = people.filter(dog => filteringFunctions.every(f => f(dog)))

// 	  renderDogs(dogsToDisplay)
// 	});

// 	field.appendChild(label);
// 	field.appendChild(select);

// 	return field;
//   };

//   const sexSelect = makeSelect("sex", "Sex", [
// 	{ value: "piesek", label: "Male" },
// 	{ value: "suczka", label: "Female" }
//   ]);

//   const starSelect = makeSelect("city", "City", [
// 	{ value: "one", label: "One" },
// 	{ value: "two", label: "Two" },
// 	{ value: "three", label: "Three" },
// 	{ value: "four", label: "Four" },
// 	{ value: "five", label: "Five" }
//   ]);

//   box.append(sexSelect);
//   box.append(starSelect);
//   document.body.append(container);

//   renderDogs(dogs);
