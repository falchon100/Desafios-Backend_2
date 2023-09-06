import { Router } from "express";
import { changeEmail,
        sendEmail } from "../controllers/email.controller.js";

const emailRouter = Router();


emailRouter.get('/password',(req,res)=>{
    res.render('password')

})

emailRouter.post('/',changeEmail)
emailRouter.get('/mail',sendEmail)



export default emailRouter;