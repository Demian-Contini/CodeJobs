const searchInput = document.querySelector('#jobs-search-input');
const technologyFilter = document.querySelector('#filter-technology');
const locationFilter = document.querySelector('#filter-location');
const jobList = document.querySelector('.job-list');

fetch('js/data.json')
  .then((response) => response.json())
  .then((jobs) => {
    renderJobs(jobs);
  })
  .catch((error) => {
    console.error('No pudimos obtener los datos', error);
  });

function renderJobs(jobs) {
  const jobsHTML = jobs.map((job) => `
    <article class="job-card" data-technology="${job.data.technology}" data-location="${job.data.modalidad}">
      <div class="job-card__content">
        <h3 class="job-card__title">${job.titulo}</h3>
        <p class="job-card__meta">${job.empresa} · ${job.ubicacion}</p>
        <p class="job-card__description">${job.descripcion}</p>
      </div>
      <a href="#" class="job-card__button">Aplicar</a>
    </article>
  `).join('');

  jobList.innerHTML = jobsHTML;
}

function filterJobs() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedTechnology = technologyFilter.value;
  const selectedLocation = locationFilter.value;

  const jobCards = jobList.querySelectorAll('.job-card');

  jobCards.forEach((card) => {
    const title = card.querySelector('.job-card__title')?.textContent.toLowerCase() ?? '';
    const cardTechnology = card.dataset.technology;
    const cardLocation = card.dataset.location;

    const matchesSearch = title.includes(searchTerm);
    const matchesTechnology = selectedTechnology === '' || cardTechnology === selectedTechnology;
    const matchesLocation = selectedLocation === '' || cardLocation === selectedLocation;

    const shouldShow = matchesSearch && matchesTechnology && matchesLocation;
    card.classList.toggle('is-hidden', !shouldShow);
  });
}

searchInput.addEventListener('input', filterJobs);
technologyFilter.addEventListener('change', filterJobs);
locationFilter.addEventListener('change', filterJobs);

// Delegación de eventos: un solo listener en el contenedor padre
jobList.addEventListener('click', (event) => {
  if (event.target.classList.contains('job-card__button')) {
    event.preventDefault();
    event.target.textContent = '¡Aplicado!';
    event.target.classList.add('is-applied');
  }
});