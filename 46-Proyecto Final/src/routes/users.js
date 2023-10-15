import {Router} from "express";
import __dirname from "../utils/dirname.js";
import uploader from "../utils/upload.js";
import { updateCtrl,handlePremium, getUsers, deleteInactive, setUsers } from "../controllers/user.controller.js";
import { requireAuthAdmin } from "../middleware/auth.js";


const userRouter = Router();


userRouter.get("/premium/:uid",handlePremium)

userRouter.post("/:uid/documents", uploader.any(),updateCtrl);

userRouter.get('/',getUsers)

userRouter.delete('/',deleteInactive)

userRouter.get('/setusers',requireAuthAdmin,setUsers)

export default userRouter;


/* userRouter.post("/:uid/documents", uploader.any(),updateCtrl); */