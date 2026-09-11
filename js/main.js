// Array de datos de empleos (simula lo que en el futuro vendría de una API/base de datos)
fetch('js/data.json')
  .then((response) => response.json())
  .then((jobs) => {
    console.log('Tenemos', jobs.length, 'ofertas disponibles');
    console.log(jobs);
  })
  .catch((error) => {
    console.error('No pudimos obtener los datos', error);
  });
git 
// Referencias a los elementos del DOM que vamos a usar
const searchInput = document.querySelector('#jobs-search-input');
const technologyFilter = document.querySelector('#filter-technology');
const locationFilter = document.querySelector('#filter-location');
const jobCards = document.querySelectorAll('.job-card');

function filterJobs() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedTechnology = technologyFilter.value;
  const selectedLocation = locationFilter.value;

  jobCards.forEach((card) => {
    const title = card.querySelector('.job-card__title')?.textContent.toLowerCase() ?? '';
    const cardTechnology = card.dataset.technology;
    const cardLocation = card.dataset.location;

    const matchesSearch = title.includes(searchTerm);
    const matchesTechnology = selectedTechnology === '' || cardTechnology === selectedTechnology;
    const matchesLocation = selectedLocation === '' || cardLocation === selectedLocation;

    if (matchesSearch && matchesTechnology && matchesLocation) {
      card.classList.remove('is-hidden');
    } else {
      card.classList.add('is-hidden');
    }
  });
}

// Eventos que disparan el filtrado
searchInput.addEventListener('input', filterJobs);
technologyFilter.addEventListener('change', filterJobs);
locationFilter.addEventListener('change', filterJobs);

const applyButtons = document.querySelectorAll('.job-card__button');

applyButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    button.textContent = '¡Aplicado!';
    button.classList.add('is-applied');
  });
});