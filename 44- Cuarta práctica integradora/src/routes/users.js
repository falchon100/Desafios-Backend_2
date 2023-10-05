import {Router} from "express";
import __dirname from "../utils/dirname.js";
import uploader from "../utils/upload.js";
import { updateCtrl,handlePremium } from "../controllers/user.controller.js";


const userRouter = Router();


userRouter.get("/premium/:uid",handlePremium)

userRouter.post("/:uid/documents", uploader.any(),updateCtrl);


export default userRouter;


/* userRouter.post("/:uid/documents", uploader.any(),updateCtrl); */