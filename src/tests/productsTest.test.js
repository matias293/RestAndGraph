
import supertest from 'supertest';
import mongoose from 'mongoose';
import { MongoDB } from '../db/connection';
import  Product  from '../models/product';
import Server from '../services/server';
import { expect } from 'chai';
import Config from '../config/index'

const mockData = [
  {
    _id: '61926b43443b578070e0b1f1',
    title: 'Play',
    price: 123,
    thumbnail: 'url',
    __v: 0
},
{
    _id: '6195bc63027cc3f4d6787841',
    title: 'Xxbox',
    price: 13,
    thumbnail: 'asda',
    __v: 0
},
{
    _id: '6196a510e5f7ea7d5b67ef2a',
    title: 'PC',
    price: 123,
    thumbnail: 'url',
    __v: 0
}
      ]

describe('Test de productos', ()=> {
  let connection;
  let newMongo;
    let request
    beforeAll(async () => {
      
      
      mongoose.connect(Config.MONGO_TEST)
     
       await Product.insertMany(mockData)
      
      request= supertest(Server)
    });

    afterAll(async () => {
        await Product.deleteMany()
        await mongoose.disconnect();
        Server.close()
       
    });

 
    
    //   test('Deberia recibir un mensaje que no existen productos disponible', async () => {
    //    const msge = {error: 'No hay productos cargados'}
    //     jest
    //       .spyOn(Product, 'find')
    //       .mockImplementationOnce(() => Promise.resolve(msge) );
    
       
    //     const response = await request.get('/api/productos/listar');
       
    //     expect(response.body.productos).to.deep.equal(msge);
    //   });
 
     test('Deberia recibir un array con productos ', async () => {
        
        
        jest
          .spyOn(Product, 'find')
          .mockImplementationOnce(() => Promise.resolve(mockData) );
    
        
        const response = await request.get('/api/productos/listar/');
       
        expect(response.body).to.deep.equal(mockData);
        
      });

      test('Deberia recibir un 404 si busco un producto con un id inexistente', async () => {
      //  const msge =  { error: 'No existe producto con ese id' }
        
        jest
        .setTimeout(300000)
          .spyOn(Product, 'find')
          .mockImplementationOnce(() => Promise.resolve(msge) );
    
        
        const response = await request.get('/api/productos/listar/6195bc63027cc3f4d6787842');
        
        expect(response.status).to.eql(404);
        
      });

      test('Deberia recibir un objeto con un producto cuando se busca por id', async () => {
        const mockObject = 
        {
          _id: '6196a510e5f7ea7d5b67ef2a',
          title: 'PC',
          price: 123,
          thumbnail: 'url',
          __v: 0
      }
        
        jest
          .spyOn(Product, 'find')
          .mockImplementationOnce(() => Promise.resolve(mockData) );
    
        
        const response = await request.get('/api/productos/listar/6196a510e5f7ea7d5b67ef2a');
       
         expect(response.body).to.deep.equal(mockObject);
      });

      test('deberia crear un producto correctamente', async () => {
        const body = { 
              title: 'PC',
               price: 123,
              thumbnail:'url' 
            };
        // jest.spyOn(Product.prototype, 'save').mockResolvedValueOnce(body);
        
        const response = await request.post('/api/productos/agregar').send(body);
        
        expect(response.status).to.eql(200);
        
        const newProduct = response.body;

        expect(newProduct).to.include.keys('title', 'price','thumbnail');
    
        expect(newProduct.title).to.equal(body.title);
        expect(newProduct.price).to.equal(body.price);
        expect(newProduct.thumbnail).to.equal(body.thumbnail);
      });


      test('deberia recibir un error 400 al querer crear un producto y mandar mal el body', async () => {
        const body = {};
        const response = await request.post('/api/productos/agregar').send(body);
        expect(response.status).to.eql(400);
    
        const expectedBody = {
          msg: 'invalid body params',
        };
    
        expect(response.body).to.deep.equal(expectedBody);
      });

      test('Debe actualizar y devolver un producto', async () => {
        const body = {
          title: 'Teclado',
          price: 23,
          thumbnail:'htttps'
        };
        
        const response = await request.put('/api/productos/actualizar/61926b43443b578070e0b1f1').send(body)
        
    
        const expectedBody = {
          title: 'Teclado',
          price: 23,
          thumbnail:'htttps',
          _id:'61926b43443b578070e0b1f1',
          __v:0
        }
   
         expect(response.body).to.deep.equal(expectedBody);
      });

      test('Debe eliminar un producto', async () => {
      
        
        const response = await request.delete('/api/productos/borrar/6196a510e5f7ea7d5b67ef2a')
        
        
        let expectedMessage = {
          msg:'Producto Eliminado exitosamente'
        }
   
         expect(response.body).to.deep.equal(expectedMessage);
      });
    
     
     
    
})

