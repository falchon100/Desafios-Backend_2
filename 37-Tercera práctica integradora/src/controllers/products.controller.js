import ProductDao from "../DAO/ProductDao.js";
import CustomError from "../services/errors/customError.js";
import EErrors from "../services/errors/enums.js";
import { generateProductErrorInfo } from "../services/errors/info.js";


const productDao = new ProductDao();


//GET
export const getProduct_Ctrl =  async (req, res) => {
    const { limit } = req.query;
    const productos = await productDao.getProducts();
    console.log(productos);
    limit ? res.send(productos.slice(0, limit)) : res.send(productos);
  }

export const getProductId_Ctrl =  async (req, res) => {
    try {
      const id = req.params.pid;
      const response = await productDao.getProductById(id);
  
      if (response.status !== "Exitoso") {
        return res.status(404).send(response);
      } else {
        res.status(200).send(response);
      }
    } catch (error) {
      console.log(error);
    }
  }  

//POST


export const postProduct_Ctrl = async (req, res) => {
  try {    
    let { title, description, code, price, stock, category, thumbnails } =req.body;
  if (!title||!description||!code||!price||!stock||!category){
    CustomError.createError({
      name:`Error al registrar producto`,
      cause: generateProductErrorInfo({title, description, code, price, stock, category}),
      message: 'Error al intentar registrar un producto',
      code: EErrors.INVALID_TYPES
    })
    //ACA MANDO EL ERROR
  }else{
      const response =  await productDao.addProduct(title,description,code,price,stock,category,thumbnails);
        res.send({status:'success',payload:response})
  }
  
  } catch (error) {
    res.status(400).json({ status: 'error', error: error.message });
  }

  }
  
//UPDATE
export const PutProduct_Ctrl =  async (req, res) => {
    let producto = req.body;
    let id = req.params.id;
    const response = await productDao.updateProduct(id, producto);
    /*  const response = await producto.updateProduct(id, productoo); */
    if (response.status !== "producto actualizado") {
      res.status(404).send(response);
    } else {
      res.status(200).send(response);
    }
  }

//DELETE
export const DeleteProduct_Ctrl =  async (req, res) => {
    const id = req.params.pid;
    const response = await productDao.deleteProduct(id);
    if (response.status !== "Exitoso") {
      res.status(404).send(response);
    } else {
      res.status(200).send(response);
    }
  }



  