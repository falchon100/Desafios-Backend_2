
  const socket =io();

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
    location.reload();
  } else {
    console.log("resultado"+ result.success);
    alert("Error al generar la orden");
  }
});