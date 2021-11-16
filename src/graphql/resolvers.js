import {productsPersistencia} from '../persistencia/productos'



  export const createPost = async ({ postInput }, req) => {
     
         const newProduct = {
            title: postInput.title,
            price: postInput.price,
            thumbnail: postInput.thumbnail
         }
         
        const product =  await  productsPersistencia.add(newProduct)
        
     return  product
        }

        export const posts  =  async ({ postInput }, req) => {
         
         const products = await productsPersistencia.getAll()
         
         return products
    }
 

 


