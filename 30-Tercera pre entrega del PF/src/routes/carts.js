import { Router } from "express";
import { 
  deleteCartsProd_Ctrl,
  deleteCarts_Ctrl,
  generateOrder,
  getCartsId_Ctrl,
  getCarts_Ctrl,
  getResetcart,
  postCartsProd_Ctrl,
  postCarts_Ctrl,
  putCartsProd_Ctrl,
  putCarts_Ctrl } from "../controllers/carts.controller.js";

const cartsRouter = Router();

export default cartsRouter;
//GETS/* getCartsId_Ctrl */
cartsRouter.get("/", getCarts_Ctrl);
cartsRouter.get("/:cid",getCartsId_Ctrl);
//POST
cartsRouter.post("/",postCarts_Ctrl);
cartsRouter.post("/:cid/product/:pid",postCartsProd_Ctrl);
cartsRouter.post("/:cid/purchase",generateOrder)
cartsRouter.post("/purchase",generateOrder)
//DELETE
cartsRouter.delete("/:cid/product/:pid",deleteCartsProd_Ctrl);
cartsRouter.delete("/:cid",deleteCarts_Ctrl);

//UPDATE
cartsRouter.put("/:cid",putCarts_Ctrl);
cartsRouter.put("/:cid/product/:pid", putCartsProd_Ctrl);

