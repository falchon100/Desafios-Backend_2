import { Router } from "express";
import { requiereAuth, requireLogin } from "../middleware/auth.js";
import {  
  base_Ctrl,
  cardId_Ctrl,
  chat_Ctrl,
  product_Ctrl,
  realTimeProducts_Ctrl } from "../controllers/views.controller.js";
import { sendMail } from "../services/errors/email.js";

const views = Router();

// VISTAS GET
views.get('/',base_Ctrl)
views.get("/realtimeproducts",realTimeProducts_Ctrl);
// SOLO EL USUARIO PEUDE ENVIAR MENSAJES AL CHAT
views.get("/chat",requiereAuth,chat_Ctrl);
views.get("/products",requireLogin,product_Ctrl);
views.get("/carts/:cid",cardId_Ctrl)


// PRUEBA EMAIL 
views.get('/mail',async(req,res)=>{
  let email = req.query.email
  let options = {
    from: 'test email <ovnicrofordz@gmail.com>',
    to: email,
    subject: 'Correo de prueba ',
    html:`<div>
    <h1>Bienvenido </h1>
    <p>si usted necesita cambiar el password clickee el siguiente link:</p>
    <p>http://localhost:8080/password</p>
    </div>`

  }
let result = await sendMail(options)
  console.log(result);
  res.send(result)
})


views.get('/password',(req,res)=>{
  res.render('password')
})

// TEST DE LOGGER
views.get('/loggerTest',(req,res)=>{
  req.logger.warn('este es un mensaje de tipo warn de')
  req.logger.info('este es un mensaje de tipo info de')
  req.logger.error('este es un mensaje de tipo error de')
  req.logger.http('este es un mensaje de tipo http')
  req.logger.warn('este es un mensaje de tipo warning')
  req.logger.debug('este es un mensaje de tipo debug')
  res.send('enviando Loggers por consola')
})

export default views;
