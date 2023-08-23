import CartsDao from "../DAO/CartDao.js";
import { productModel } from "../DAO/model/products.model.js";

const cartDao = new CartsDao();

export const base_Ctrl = async(req,res)=>{
    res.render("base",{style:'base.css'})
  }

export const realTimeProducts_Ctrl=  async (req, res) => {
    res.render("realTimeProducts");
  }

export const chat_Ctrl =  async (req, res) => {
    res.render("chat");
  }

export const product_Ctrl =  async (req, res) => {
    const page = parseInt(req.query.page) || 1; // EN CASO DE NO RECIBIR PAGINA SE MUETRA 1 
    const limit =parseInt(req.query.limit) || 10 ; // EN CASO DE NO RECIBIR LIMITE SE MUESTRA 10
    const category  = req.query.category;
    const sort = req.query.sort;
    const user = req.session.user;
    const admin = req.session.admin;
    const cart = req.session.cart  
    // Genero opcciones de paginacion para poder ordenar por precio , y ademas le paso los querys 
    const options = {
      page: page, 
      limit: limit, 
      sort: { price: sort === 'desc' ? -1 : 1 },
      lean: true,
  }; 
  
  const filter = {};
  if (category) {
    filter.category = category;
  }
  
    let result = await productModel.paginate(filter, options);
  
    //guardo los metodos de paginate en data para poder utilizar en la vista
  const data = {
    admin,
    cart:cart,
    user:user,
    status: 'success',
    payload: result.docs,
    totalPages: result.totalPages,
    prevPage: result.hasPrevPage ? result.prevPage : null, 
    nextPage: result.hasNextPage ? result.nextPage : null, 
    page: result.page,
    hasPrevPage: result.hasPrevPage, 
    hasNextPage: result.hasNextPage, 
    prevLink:result.prevLink = result.hasPrevPage?`http://localhost:8080/products?page=${result.prevPage}&limit=${limit}`:'', 
    nextLink:result.nextLink = result.hasNextPage?`http://localhost:8080/products?page=${result.nextPage}&limit=${limit}`:''
  }
  
  // SI LA PAGINA ES MAYOR A LAS PAGINAS QUE TENGO EN DATA ENVIO ERROR  SINO RENDERIZO LA DATA
  if (page> data.totalPages){
    res.status(500).send('No existe esa cantidad de paginas');
  }else{
  // en la view products le envio la data con los datos de paginacion 
  res.render("products",data)
  }}

export const cardId_Ctrl =  async(req, res) => {
    try {
        let id = req.params.cid;
        const user = req.session.user;
        const cart = await cartDao.getCartsById(id);
        if (cart.length===0){
          return res.json({status:'failed',msg:'no se encontro carrito'})
        }
        res.render("carts", { cart: JSON.parse(JSON.stringify(cart[0])),user});
    } catch (error) {
        console.log(error);
    }
  }