import {Router} from "express";
import __dirname from "../utils/dirname.js";
import uploader from "../utils/upload.js";
import { updateCtrl,handlePremium, getUsers, deleteInactive } from "../controllers/user.controller.js";


const userRouter = Router();


userRouter.get("/premium/:uid",handlePremium)

userRouter.post("/:uid/documents", uploader.any(),updateCtrl);

userRouter.get('/',getUsers)

userRouter.delete('/',deleteInactive)

export default userRouter;


/* userRouter.post("/:uid/documents", uploader.any(),updateCtrl); */