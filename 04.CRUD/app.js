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
function showError(message) {
  errorMessage.textContent = message; // Asignar el mensaje de error
  errorMessage.style.display = 'block'; // Hacer visible el mensaje
}

// Función para ocultar el mensaje de error
function clearError() {
  errorMessage.textContent = ''; // Vaciar el contenido del mensaje
  errorMessage.style.display = 'none'; // Ocultar el mensaje
}

// Evento para manejar el envío del formulario (Crear o Editar un producto)
productForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evitar la recarga de la página al enviar el formulario.

    const id = inputId.value.trim(); // Obtener ID (puede estar vacío si es un nuevo producto)
  const name = inputName.value.trim(); // Obtener nombre del producto
  const price = parseFloat(inputPrice.value.trim()); // Convertir el precio a número

   // Validación básica: no permitir campos vacíos
  if (!name || isNaN(price)) {
    showError('Por favor, ingresa todos los campos correctamente.');
    return;
  }

  // crear un objeto con la información del producto
  const payload = { name, price};

  try{
    let response;
    if(id){
        // si el producto tiene un ID, se actualiza (método PUT)
        response = await fetch(`${API_URL}/${id}`, {
         method: 'PUT',
         headers: {'Content-Type': 'application/json' },
         body: JSON.stringify(payload),
        });
    }else {
        // si no tiene unID, se crea un nuevo producto (método POST)
        // Obtener la lista de productos actuales para determinar el nuevo ID
   const allProductsRes = await fetch(API_URL);
      const allProducts = await allProductsRes.json();
        // Al tener la lista de productos 
        // generar un nuevo ID
        const newId = allProducts.length ? Math.floor(Math.max(...allProducts.map(p => Number(p.id))) + 1) : 1;
        // Enviar la solicitud para crear un nuevo producto
        response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: newId, ...payload }),
      });
  }
   // manejo de errores en la respuesta del servidor
   if (!response.ok) throw new Error(`Status: ${response.status}`);
   clearError(); // Limpiar el mensaje de error
   await getProducts(); // Actualizar la lista de productos
   productForm.reset(); // Limpiar el formulario después de la operación
   }catch(error){
    showError('Error al guardar el producto: ' + error.message); // mostrar mensaje de error
  }
})


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

     // Asignar eventos a los botones de edición y eliminación
  document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-id');
      editProduct(id); // Cargar datos del producto en el formulario
    });
  });

  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-id');
      deleteProduct(id); // Eliminar el producto
    });
  });

}

// Función para eliminar un producto mediante su ID
 async function deleteProduct(id){
    // asegurarme que el id es un número
     const idNumber = Number(id);
    // confirmar antes de eliminar el producto
    if(!confirm('Estás seguro que deseas eliminar este producto')) return;
    try{
     // hacer una solicitud DELETE a la API para eliminar el producto
     const response = await fetch(`${API_URL}/${idNumber}`, { method: 'DELETE' });
     // manejo de errores en la respuesta del servidor
     if(!response.ok) throw new Error(`Status: ${response.status}`);
     clearError(); // Limpiar el mensaje de error
     // si la respuesta es correcta, actualizar la lista de productos
     await getProducts(); // recargar la lista de productos después de eliminar un producto
    }catch(error){
     showError('Error al eliminar el producto: ' + error.message); // mostrar mensaje de error
    }
 }

// Función para obtener un producto y cargar sus datos en el formulario para su edición
async function editProduct(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const product = await response.json();
    inputId.value = product.id; // Rellenar el campo ID
    inputName.value = product.name; // Rellenar el campo nombre
    inputPrice.value = product.price; // Rellenar el campo precio
  } catch (error) {
    showError('Error al cargar producto: ' + error.message); // Mostrar mensaje de error
  }
}

// Evento para buscar productos por su ID
searchBtn.addEventListener('click', async () => {
  const id = searchInput.value.trim();
  if (!id) return; // Evitar búsquedas con campos vacíos

  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Producto no encontrado'); // Manejo de error si no se encuentra el producto
    const product = await response.json();
    renderProducts([product]); // Mostrar solo el producto buscado
  } catch (error) {
    showError('Error al buscar producto: ' + error.message); // Mostrar mensaje de error
  }
});


//Evento para limpiar el formulario de busqueca y recargar todos los productos 
resetBtn.addEventListener('click', () => {
    productForm.reset(); // Limpiar el formulario
    inputId.value = ''; // Limpiar el campo de búsqueda
    getProducts(); // Recargar todos los productos
})

// Cargar los productos cuando la página se inicia
getProducts();
