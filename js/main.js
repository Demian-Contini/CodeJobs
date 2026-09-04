// Array de datos de empleos (simula lo que en el futuro vendría de una API/base de datos)
const jobs = [
  {
    title: "Ingeniero de Software",
    company: {
      name: "Tech Solutions Inc.",
      location: "Remoto"
    },
    description: "Buscamos un ingeniero de software con experiencia en desarrollo web y conocimientos en JavaScript, React y Node.js."
  },
  {
    title: "Analista de Datos",
    company: {
      name: "Data Driven Co.",
      location: "Ciudad de México"
    },
    description: "Estamos buscando un analista de datos con experiencia en el manejo de grandes conjuntos de datos."
  },
  {
    title: "Desarrollador de Aplicaciones Móviles",
    company: {
      name: "Mobile Apps Ltd.",
      location: "Guadalajara"
    },
    description: "Buscamos un desarrollador de aplicaciones móviles con experiencia en iOS y/o Android."
  },
  {
    title: "Ingeniero de DevOps",
    company: {
      name: "Cloud Services SA",
      location: "Remoto"
      // nota: a este objeto le falta "salary" a propósito, para probar Optional Chaining
    },
    description: "Estamos buscando un ingeniero de DevOps con experiencia en infraestructuras en la nube."
  }
];

// Pruebas de Optional Chaining
console.log(jobs[0].company?.name);        // "Tech Solutions Inc."
console.log(jobs[3].salary?.min);           // undefined, sin romper la app
console.log(jobs[3].company?.name);         // "Cloud Services SA"

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