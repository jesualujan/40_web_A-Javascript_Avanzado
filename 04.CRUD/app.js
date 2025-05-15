// URL DE LA API REST DONDE SE ALMACENAN LOS PRODUCTOS
const API_URL = 'http://localhost:3000/products';

// Referencia a los elementos del DOM que interactuan con el usuario
const productForm = document.getElementById('product-form');
const productTable = document.getElementById('product-table');
const resetBtn = document.getElementById('reset-btn');
const searchBtn = document.getElementById('search-btn');
const errorMessage = document.getElementById('error-message'); // Elemento para mostrar mensajes de error

// Inputs del formulario para ingresar información sobre los productos 
const inputId = document.getElementById('product-id'); // ID del producto 
const inputName = document.getElementById('product-name'); // Nombre del producto
const inputPrice = document.getElementById('product-price'); // Precio del producto
const searchInput = document.getElementById('search-id'); // Input para buscar un producto por ID

// Funciónn para mostrar mensajes de error
function showError(message){
    errorMessage.textContent = message; // asignar el mensaje de error
    errorMessage.style.display = 'block'; // mostrar el mensaje de error
}

// Función para ocultar el mensaje de error
function clearError() {
    errorMesssage.textContent = ''; // limpiar el mensaje de error
    errorMessage.style.display = 'none'; // ocultar el mensaje de error
}


// Funcion para obtener la lista de productos desde el servidor y mostrarlos en la tabla 
async function getProducts() {
    try {
        const response = await fetch(API_URL); // hacer una solicitud/petición GET a la API
        const products = await response.json(); // convertir la respuesta a JSON
        renderProducts(products); // llamar a la función para mostrar los productos en la tabla
    }catch(error){
      showError('Error al cargar los productos: ' + error.message) // Muestra un mensaje de error si ocurre un error al cargar los productos
    }
}

//Función para mostrar los productos en la tabla 
function renderProducts(products){
   productTable.innerHTML = ""; // limpiar la tabla antes de agregar los productos
   //voy a iterar sobre cada producto y crear una fila en la tabla
   products.forEach(p => {
     const row = document.createElement('tr');// crear una fila por cada producto
     row.innerHTML = `
      <td>${p.id}</td>
      <td>${p.name}</td>
      <td>${p.price}</td>
      <td>
       <button class="btn btn-outline-warning btn-sm edit-btn" data-id="${p.id}" >Editar</button>
       <button class="btn btn-outline-danger btn-sm delete-btn" data-id="${p.id}" >Eliminar</button>
      </td>
     `
     productTable.appendChild(row); // agregar la fila a la tabla
   })
}

// Evento para manejar el envío del formulario (Crear o Editar un producto)
productForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evitar la recarga de la página al enviar el formulario.

    // validación básica: no permitir campos vacíos
    if (!name || isNaN(price)){
        showError('Por favor, ingresa todos los campos correctamente.');
        return;
    }
})



// Cargar los productos cuando la página se inicia
getProducts();
