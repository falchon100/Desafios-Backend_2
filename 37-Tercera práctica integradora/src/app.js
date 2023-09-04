import express from "express";
import cartsRouter from "./routes/carts.js";
import productsRouter from "./routes/products.js";
import handlebars from "express-handlebars";
import views from "./routes/views.js";
import { Server } from "socket.io";
import ProductManager from "./DAO/ProductManager.js";
import mongoose from "mongoose";
import MessageDao from "./DAO/MessageDao.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import sessionRouter from "./routes/session.js";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import config from "./config/config.js";
import cookieParser from "cookie-parser";
import CartsDao from "./DAO/CartDao.js";
import mockRouter from "./routes/mock.js";
import errorHandler from './middleware/errors/errors.js'
import winston from 'winston'
import { addLogger, logger } from "./utils/logger.js";

const app = express();
const PORT = config.port || 8081;
app.use(addLogger)

const cartDao = new CartsDao();
const server = app.listen(PORT, () => logger.info("creando servidor en http://localhost:"+PORT));
// io sera el servidor para trabajar con socket
const io = new Server(server);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(errorHandler)


// configuracion de session y mongoStore
app.use(session({
  store: MongoStore.create({
    mongoUrl: config.MONGO_URL,
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    ttl: 3600
}), 
  secret: config.KEY_SECRET, //Defino la clave de encripción
  resave:true, //resave, define si la sesion caduca por inactidad
  saveUninitialized:false //Permite guardar cualquier sesion, aún cuando no tenga información.
}))
initializePassport(); //inicializo passport
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());


//establezco los endpoints de los Routers
app.use("/mockingproducts",mockRouter)
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

//configuro handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", "./views");
app.set("view engine", "handlebars");
app.use("/", views);
app.use(express.static("public"));

mongoose
  .connect(
    config.MONGO_URL
  )
  .then(() => logger.info("database connect "))
  .catch((error) => logger.error(error));

// el on significa que esta escuchando que pase algo en este caso escucha connection y trasmite el mensaje nuevo cliente conectado
io.on("connection", async (socket) => {
  logger.info("nuevo cliente conectado");

  // Envio la lista productos a traves de listProduct
  const product = await productos.getProducts();
  socket.emit("listProduct", product);

  socket.on("historial", async () => {
    io.emit("messageLogs", await Messages.getMessages());
  });

  socket.on("message", async (data) => {
    await Messages.addMessages(data.user, data.message);
    io.emit("messageLogs", await Messages.getMessages());
  });

  // escucho el eliminarProducto que trae el Id cliqueado para poder borrarlo
  socket.on("eliminarProducto", async (id) => {
    await productos.deleteProduct(id);
  });

  //escucho los datos del socket que me trae todos los values para poder agregar un nuevo producto
  socket.on("addproduct", async (data) => {
    await productos.addProduct(
      data.title,
      data.description,
      data.code,
      data.price,
      data.stock,
      data.category,
      data.thumbnails
    );
  });

  socket.on("generateOrder", async (cid,user) => {
    try {
      const response = await fetch(`http://localhost:8080/api/carts/${cid}/purchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({ user }) 
      });
  
      if (response.ok) {
        // Orden generada exitosamente
        socket.emit("orderGenerated", { success: true });
      } else {
        // Error al generar la orden
        socket.emit("orderGenerated", { success: false });
      }
    } catch (error) {
      logger.error(error);
      socket.emit("orderGenerated", { success: false });
    }
  });

  socket.on("deleteProduct", async ({ productId, user }) => {
    try {
      // Realizar la eliminación del producto del carrito
      await cartDao.deleteProductToCart(user, productId);
  
      // Emitir evento de actualización del carrito
      socket.emit("cartUpdated");
  
      // Emitir mensaje de éxito a quien eliminó el producto
      socket.emit("productDeleted", { success: true });
    } catch (error) {
      logger.error(error);
      // Emitir mensaje de error a quien eliminó el producto
      socket.emit("productDeleted", { success: false });
    }
  });
});

// 
app.use('/api/sessions', sessionRouter)

// 


//inicializo la clase
const productos = new ProductManager();
const Messages = new MessageDao();
