import CartsDao from "../DAO/CartDao.js";
import ProductDao from "../DAO/ProductDao.js";
import TicketDao from "../DAO/TicketDao.js";
import crypto from 'node:crypto'

const productsDao= new ProductDao;
const cartDao = new CartsDao;
const ticketDao = new TicketDao;
//GETS
export const getCarts_Ctrl = async (req, res) => {
    res.send(await cartDao.readCarts());
 }

 export const getCartsId_Ctrl = async (req, res) => {
    try {
      const id = req.params.cid;
      const response = await cartDao.getCartsById(id);
      res.send( response );
    } catch (error) {
      res.status(404).send({ error: 'El carrito no existe' });
    }
  }

//POST


export const generateOrder = async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartDao.getCartsById(cid);
    if (!cart || cart.length === 0) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const products = cart[0].carts;
    const productsToProcess = [];
    const productsNotProcessed = [];

    // Verificar el stock de los productos y separarlos en procesados y no procesados
    for (const product of products) {
      const existingProduct = await productsDao.getProductById(product.products._id);
      if (!existingProduct || existingProduct.stock < product.quantity) {
        productsNotProcessed.push(product.products._id);
      } else {
        productsToProcess.push(product);
      }
    }

    // Calcular el total de la compra
    const totalSum = productsToProcess.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.products.price * currentValue.quantity;
    }, 0);

    // Crear el ticket si hay productos para procesar
    if (productsToProcess.length > 0) {
      const ticketData = {
        code: crypto.randomUUID(),
        purchase_datetime: new Date(),
        amount: totalSum,
        purchaser: req.user//email del usuario
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
      await cartDao.deleteCart(cid);
    }

    res.status(200).json({ status: 'Compra generada con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al generar la compra' });
  }
};


/* export const generateOrder = async(req,res)=>{
  const {cid} = req.params;  //envio el cartId 
  const carrito = await cartDao.getCartsById(cid)
  if (!carrito || carrito.length === 0) {
    return res.status(404).json({ error: 'Carrito no encontrado' });
  }
 
    const totalSum = carrito[0].carts.reduce((accumulator, currentValue) => { //sumo las cantidades del array de carrito y multiplico por cantidad
      return accumulator + currentValue.products.price * currentValue.quantity;
    }, 0);

  let products = {
    code: crypto.randomUUID(),
    purchase_datetime: new Date(),
    amount: totalSum,
    purchaser: req.user//email del usuario
}
  await ticketDao.createTicket(products)

  res.status(200).send({status:'se creo correctamente'})
} */


  export const postCarts_Ctrl =  async (req, res) => {
    await cartDao.addCarts()
    res.status(200).send({status:'Se agrego correctamente un carrito'} )};

  export const postCartsProd_Ctrl =  async (req, res) => {
        try {
          let cartId = req.params.cid;
          let productId = req.params.pid;
          const response = await cartDao.addProductToCart(cartId, productId)
          res.send(response)
        } catch (error) {
          res.status(404).send({ error: 'El carrito no existe' });
        }
        }
//DELETE
export const deleteCarts_Ctrl =  async (req, res) => {
    let cartId = req.params.cid;
   if (await cartDao.deleteCart(cartId)){
       res.json({status:'Success', msg:'Carrito eliminado'});
   }else
   res.json({status:'Failure', msg:'No existe el carrito a eliminar'})
  }

export const deleteCartsProd_Ctrl =  async (req, res) => {
    let cartId = req.params.cid;
    let productId = req.params.pid;
    const response = await cartDao.deleteProductToCart(cartId, productId)
    if (response!== "no existe ese producto"){
      res.status(200).send({status:`Se borro correctamente una cantidad del producto ${productId}`}  )
    }
    res.send(await cartDao.deleteProductToCart(cartId, productId));
  }

//UPDATE
export const putCarts_Ctrl =  async (req, res) => {
    let cartId = req.params.cid;
    let product = req.body;
    res.send(await cartDao.updateCart(cartId, product));
  }

export const putCartsProd_Ctrl =  async (req, res) => {
    let cartId = req.params.cid;
    let productId = req.params.pid;
    let quantity = req.body.quantity;
    res.send(await cartDao.updateproductToCart(cartId, productId, quantity));
  }