import {Router} from "express";
import UserDao from "../DAO/UserDao.js";
import __dirname from "../utils/dirname.js";
import uploader from "../utils/upload.js";


const userRouter = Router();
const userDao = new UserDao;

userRouter.get("/premium/:uid",async(req,res)=>{
    const uid = req.params.uid
    let user = await userDao.getByEmail(uid)
    if(user.role == 'user'){
        user.role = 'premium'
        res.redirect('/products')
    }else{
        user.role = 'user'
        res.redirect('/products')
    }
    user.save()
})

userRouter.post("/:uid/documents",uploader.any('image','profileImage','productImage'),async(req,res)=>{
    const uid = req.params.uid
    const files = req.files;
    console.log("file    "+JSON.stringify(files));
    if (!files) {
        return res.status(400).json({ error: "No se ha proporcionado un archivo" });
      }
    let user = await userDao.getByEmail(uid)

    const imageInfo = {
        name: files.originalname,
        reference: files.filename,
      };


    user.documents.push(imageInfo)
    user.save()
    res.send(uid)
})



export default userRouter;