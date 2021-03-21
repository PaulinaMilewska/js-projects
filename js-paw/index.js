document.addEventListener('DOMContentLoaded', () => {
	sessionStorage.setItem('Cockpit-Token', 'e607a0cf025ec1d0a50d1f148d4bce');
});

let fetchDogs = (event) => {
	let url = 'http://getcockpit.pmedia-test.pl/rekrutacja/api/collections/get/pieski';

	let req = new Request(url, {
		method: 'GET',
		headers: { 'Cockpit-Token': 'e607a0cf025ec1d0a50d1f148d4bce' },
		mode: 'cors'
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
      renderDogs(dogs.filter((d) => d.stars == starValue[index].innerText));
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
}


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



// const mainFilter = () => {
//   maleFilter && starFilter && ageFilter
// }

// mainFilter();