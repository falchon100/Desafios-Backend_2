import chai from "chai";
import supertest from "supertest";
import { faker } from '@faker-js/faker';
import session  from 'supertest-session';
import app from '../app.js'



const expect = chai.expect;
const requester = supertest("http://localhost:8080");
const testSession = session(app);

let prodID = "";
let cartId = "";

describe('Testing de Routers product, carts, sessions',()=>{

    /*  describe('Test de Products', async()=>{
        it('El endpoint get api/products debe obtener todos los productos',async()=>{
            const {status,ok,_body} = await requester.get('/api/products')
            expect(status).to.equal(200);
            expect(ok).to.be.true;
            expect(_body).to.be.an('array');
        })

        it('El endpoint POST api/products debe crear un producto en la db',async()=>{
            const login = await testSession.post("/api/sessions/login").send({
                email:"adminCoder@coder.com",
                password:"adminCod3r123"
            });
            expect(login.status).to.equal(302)
            expect(login.header["location"]).to.equal("/products")

            const response = await testSession.post('/api/products').send({
                title:faker.commerce.product(),
                description:faker.commerce.productDescription(),
                code:faker.string.alpha(15),
                price:faker.commerce.price({ min: 100, max: 10000 }),
                stock:faker.string.numeric({ length:  { min: 1, max: 2 }, exclude: ['0'] }),
                category:faker.commerce.department(),
                thumbnails:faker.image.urlLoremFlickr({ category: 'product' })
            })
            expect(response.status).to.equal(200)
            expect(response._body.status).to.be.equals("success")
            prodID = response._body.payload._id;
           console.log(prodID);
        })

        it('el endpoint GET en /api/products:id debe devolver el producto de la db',async()=>{
            const response = await requester.get(`/api/products/${prodID}`); 
            expect(response.status).to.equal(200);  
            expect(response.body._id).to.be.equal(prodID);
            expect(response.body).to.have.property('title');
            expect(response.body).to.have.property('description');
            expect(response.body).to.have.property('price');
        })

        it('el endpoint delete en /api/products:id debe eliminar el producto de la db',async()=>{
            const response = await testSession.delete(`/api/products/${prodID}`);
            expect(response.status).to.equal(200);
            expect(response._body.status).to.be.equals('Exitoso')
        })  
     }) */

       //TEST DE CARTS

/*      describe('Test de Carts', async()=>{

        it('El endpoint Post api/carts debe crear un carrito ',async()=>{
            const response = await requester.post('/api/carts')
            expect(response.status).to.equal(200)
            expect(response.body.status).to.equal('Se agrego correctamente un carrito')
        })


        it('El endpoint get api/carts debe obtener todos los carritos', async () => {
            const response = await requester.get('/api/carts');
            expect(response.status).to.equals(200);
            expect(response.ok).to.be.true;
            expect(response.error).to.be.false;
            expect(response.type).to.be.equals('application/json');
            
            // obtengo el ultimo carrito
            const lastCart = response.body[response.body.length - 1];
            // guardo el id del ultimo carrito 
             cartId = lastCart._id;
             console.log(cartId);
        });
            //muestro el id generado
        it('El endpoint get api/carts/id debe obtener el carrito con ese id', async ()=>{
            const response = await requester.get(`/api/carts/${cartId}`)
            expect(response.body[0]).to.have.property("_id")
            expect(response.status).to.equal(200)
            expect(response.ok).to.be.true;
        })
            //elimino el id generado
        it('El endpoint Delete api/carts/id debe eliminar el carrito con ese id', async ()=>{
            const response = await requester.delete(`/api/carts/${cartId}`)
            expect(response.status).to.equal(200);
            expect(response.body.status).to.equal('Success')
        })

     }) */
})

