// URL base de la API de rick and morty (characters/personajes)
const BASE_URL = "https://rickandmortyapi.com/api/character";

// MANIPULAR EL DOM 
// Seleccionar los elementos del DOM
// Referencia a los elemnos del DOM: el contenedor de los personajes y los botones de la paginación
const container = document.getElementById("characters-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

//variables para llevar el control de la paginación
let currentPage = 1; // Página actual
let totalPages = 1; // Total de páginas disponibles en la API 

// función asincrona para obtener los personajes desde la API según la página indicada.
//* usamos fetch para hacer una solicitud a la API y manejar errores de red o de respuesta.

async function getCharacters(page = 1){
    try{
        // solicitar los datos a la API usando el número de la página
        const response = await fetch(`${BASE_URL}?page=${page}`)
        // lanzar un error si la respuesta no fue satisfactoria (ej. 404 o 500)
        // if(response.status !== 200){
        //     throw new Error(`Error ${response.status}: ${response.statusText}`)
        // }
        if(!response.ok) throw new Error(`HTTP Error: ${response.status} ${response.statusText}`)
        
        // extraer la data de la respuesta y almacenarla en una variable 
        // parsear la respuesta JSON para convertirla en un objeto de JavaScript
        const data = await response.json();

        // Actualiza el total de páginas disponibles (lo proporciona la API)
        totalPages = data.info.pages;

        //Renderizar los personajes en el contenedor
        renderCharacters(data.results);

        // Actualizar los botones de paginación según la página actual
        updateButtons();
    }catch(error){
        // en caso de error, se muestra un mensaje en el contenedor de los personajes
      container.innerHTML = `<p> ❌ Error al obtener personajes: ${error.message}</p>`
    }
}

// Función que renderiza un array de personajes en el contenedor HTML
// Crea tarjetas visuales para cada personaje con su información en el contenedor

function renderCharacters(characters){
 // Limpia el contenedor andtes de insertar los nuevos personajes
   container.innerHTML = ""; // vacía el contenedor de personajes
   // Iterar sobre cada personaje en el array de personajes
    characters.forEach( p => {
        // Crear un div con clase "card" para reprensentar cada personaje
        const card = document.createElement("div");
        card.className = "card"; // Añadir la clase "card" al div
 // Define el contenid HTML de la tarjeta con los datos del personaje
        card.innerHTML = `
        <img class="character-image" src="${p.image}" alt="${p.name}"  />
        <h2>${p.name}</h2>
      <p style="font-size: 1.2rem;">📛 Especie: ${p.species}</p>
      <p style="font-size: 1.2rem;">❤️ Estado: ${p.status}</p>
      <p style="font-size: 1.2rem;">🚻 Género: ${p.gender}</p>
      <p style="font-size: 1.2rem;">🌍 Origen: ${p.origin.name}</p>
      <p style="font-size: 1.2rem;">📍 Ubicación: ${p.location.name}</p>
      <p style="font-size: 1.2rem;">🎬 Episodios: ${p.episode.length}</p>
        `
        // agregar la tarjeta al contenedor de personajes
        container.appendChild(card); // Añadir la tarjeta al contenedor de personajes
    })
}

// Función que habilita o deshabilita los botones de paginación
// según la pagina actual.

function updateButtons(){
    prevBtn.disabled = currentPage === 1; // Deshabilitar el botón "anterior" si estamos en la primera página
    nextBtn.disabled = currentPage === totalPages; // Deshabilitar el botón "siguiente" si estamos en la última página
}

// Evento click para el botón "anterior"
    prevBtn.addEventListener('click', () => {
        if(currentPage > 1){
            currentPage--; // Decrementar la página actual
           getCharacters(currentPage); // Obtener los personajes de la página actual
        }
    })

// Evento click para el botón "siguiente"
nextBtn.addEventListener('click', () => {
    if(currentPage < totalPages){
        currentPage++; // Incrementar la página actual
       getCharacters(currentPage); // Obtener los personajes de la página actual
    }
})

// Llamada inicial para mostrar la primera página de personajes al cargar la app
getCharacters();