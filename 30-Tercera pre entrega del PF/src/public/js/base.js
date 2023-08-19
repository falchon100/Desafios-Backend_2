// Función para agregar un producto al carrito
function addToCart(productId, user) {
alert('agregado correctamente')
  const url = `/api/carts/${user}/product/${productId}`;
  fetch(url, {
    method: 'POST',
  })
  .then(response => response.json())
  .then(data => {
    console.log(data); // Manejar la respuesta del servidor
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

// Función para eliminar un producto
function deleteProduct(productId) {
  const url = `/api/carts/${user}/product/${productId}`;
  fetch(url, {
    method: 'DELETE',
  })
  .then(response => response.json())
  .then(data => {
    console.log(data); // Manejar la respuesta del servidor
  })
  .catch(error => {
    console.error('Error:', error);
  });
}