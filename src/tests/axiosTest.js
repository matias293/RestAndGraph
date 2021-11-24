const axios = require('axios')
const productos = async() => {
    try {
        const resp = await axios.get('http://localhost:8080/api/productos/listar')
        console.log(resp.data);
       } catch (error) {
        console.log(error);
       }
}

const producto = async() => {
    try {
        const resp = await axios.get('http://localhost:8080/api/productos/listar/619d71d37a9b6b65ced0ba2e')
        console.log(resp.data);
       } catch (error) {
        console.log(error);
       }
        
}

const newProducto = async() => {
    const newProduct = {
          title:'Pc',
          price:5342,
          thumbnail:'url'
    }
    try {
        const resp = await axios.post('http://localhost:8080/api/productos/agregar',newProduct)
        console.log(resp.data);
       } catch (error) {
        console.log(error);
       }
        
}

const updateProducto = async() => {
    const updateProduct = {
        title:'Pc',
        price:5342,
        thumbnail:'url'
  }
    try {
        const resp = await axios.put('http://localhost:8080/api/productos/actualizar/619d71d37a9b6b65ced0ba2e',updateProduct)
        console.log(resp.data);
       } catch (error) {
        console.log(error);
       }
}

const deleteProducto = async() => {
    
    try {
        const resp = await axios.delete('http://localhost:8080/api/productos/borrar/619d71d37a9b6b65ced0ba2e')
        console.log(resp.data);
       } catch (error) {
        console.log(error);
       }
}






productos()

producto()

newProducto()

updateProducto()

deleteProducto()