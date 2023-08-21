
  const socket =io();


/*   // Función para eliminar un producto
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
} */
socket.on("cartUpdated", () => {
  // Recargar la página para reflejar los cambios en el carrito
  location.reload();
});
function deleteProduct(productId, user) {
  socket.emit("deleteProduct", { productId, user });
}



function generateOrder(cid,user) {
  console.log(cid);
  console.log('USUARIO'+ " "+user);
  socket.emit("generateOrder", cid,user)
}

socket.on("orderGenerated", (result) => {
  if (result.success) {
    alert("Orden generada exitosamente");
  } else {
    alert("Error al generar la orden");
  }
});