
import Product from '../models/product'
import logger from '../config/logger'


class Productos {
    getAll = async() =>{
      
     
      try {
    
        const products =  await Product.find()       
          return products
        
      } catch (error) {
        logger.error(error)
      }
      
      }
    
      getProduct = async(id) =>{
        
          const product = await Product.findById(id)
          if(!product){
            const error = new Error('Producto no encontrado');
            error.statusCode = 404;
            throw error;
          }
          return product
 
    }

      add = async(data) => {
        try {
          const product = new Product(data)
          const newProduct = await product.save()
          return newProduct
        } catch (error) {
          logger.error(error)
          return error
        }

      }

      update = async(id, data )=> {
      try {
        const productUpdate = await Product.findByIdAndUpdate(id,data,{new:true})
         
        return productUpdate
      } catch (error) {
        return error
      }
        
        
      }

      delete = async(id) => {
       try {
        const product = await products.findByIdAndDelete(id);
        return product
       } catch (error) {
         return error
       }
         

      }
    
}

export const productsPersistencia = new Productos();