/* 
    // Crear el ticket si hay productos para procesar
    if (productsToProcess.length > 0) {
        const ticketData = {
          code: crypto.randomUUID(),
          purchase_datetime: new Date(),
          amount: totalSum,
          purchaser: req.body.user//email del usuario
        };
        await ticketDao.createTicket(ticketData);
  
        // Actualizar el stock de los productos y eliminarlos del carrito
        for (const product of productsToProcess) {
          await productsDao.updateProduct(product.products._id, -product.quantity);
          await cartDao.deleteProductToCart(cid, product.products._id);
        }
      }
  
      // Actualizar el carrito con los productos no procesados
      if (productsNotProcessed.length > 0) {
        await cartDao.updateCart(cid, { carts: productsNotProcessed });
      } else {
     await cartDao.resetCart(cid);
      }
  
      res.status(200).json({ status: 'Compra generada con éxito' });
    } catch (error) {
      res.status(500).json({ error: 'Error al generar la compra' });
    } */