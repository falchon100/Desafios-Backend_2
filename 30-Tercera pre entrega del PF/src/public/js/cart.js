
  const socket =io();


  // Función para eliminar un producto
function deleteProduct(productId, user) {
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