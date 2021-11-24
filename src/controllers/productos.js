import faker from 'faker'
import Joi from 'joi'

import { productsPersistencia } from "../persistencia/productos"

class Producto {
    validar(req, res, next) {
        const productSchema = Joi.object({
          title: Joi.string().alphanum().required(),
          price: Joi.number().required(),
          thumbnail: Joi.string().required()
        });
        const { error } = productSchema.validate(req.body);
        if (error) return res.status(400).json({ msg: 'invalid body params' });
        else next();
    }

    getProducts = async(req,res) => {
        
       
       let productos = await productsPersistencia.getAll()
       
       if (productos.length === 0) {
        return res.status(404).json({ error: 'No hay productos cargados' });
        } else {
            
        res.json(
            productos
        )
       }
       
    }

    getProduct = async(req,res,next) => {
        let {id} = req.params 
     try {
         
        let product = await productsPersistencia.getProduct(id)
     
         return res.json(product)
        
     } catch (error) {
        next(error);
     }
    }

    getProductsFake = async(req,res) => {
        const { cantidad } =  req.query
        const products = []

        const fakerProducts = {
			title: faker.commerce.productName(),
			price: Number(faker.commerce.price()),
			thumbnail: faker.image.technics(),
		};

       
		if (cantidad) {
			if (Number(cantidad) !== 0) {
				for (let i = 0; i < Number(cant); i++) {
					products.push(fakerProducts);
				}
				return res.json({ products });
			}
			return res.status(404).json({ message: 'No hay productos' });
		}

		for (let i = 0; i < 10; i++) {
			products.push(fakerProducts);
		}
        
		return res.json({ products });

    }

    postProduct = async(req,res) => {
        const body = req.body
     try {
         
         const newProduct =  await productsPersistencia.add(body)
         res.json(newProduct)

     } catch (error) {
         
     }

     }

     updateProduct = async(req,res,next) => {
        const {id} = req.params 
        const body = req.body
        try {
           await productsPersistencia.getProduct(id)
            const product = await productsPersistencia.update(id,body)
          return  res.json(product)
        } catch (error) {
            next(error)
        }
        
        
            
     }

     deleteProduct = async(req,res) =>  {
        const {id} = req.params 
        try {
            await productsPersistencia.getProduct(id)
            await productsPersistencia.delete(id)
       
            res.json({
              msg: 'Producto Eliminado exitosamente',
                       
                   })
        } catch (error) {
            next(error)
        }
       
            
     }
}

export const productsController = new Producto();