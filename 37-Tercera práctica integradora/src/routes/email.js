import { Router } from "express";
import { changeEmail,
        sendEmail } from "../controllers/email.controller.js";

const emailRouter = Router();




emailRouter.post('/',changeEmail) //Ruta para cambio de contraseña
emailRouter.post('/mail',sendEmail) //Ruta Post para envio de Email
emailRouter.get('/sendEmail',(req,res)=>{
    res.render('sendEmail')  //ruta get para renderizar pagina de envio de mail
})
emailRouter.get('/password',(req,res)=>{
    res.render('password') //Ruta get para renderizar cambio contraseña

})

export default emailRouter;