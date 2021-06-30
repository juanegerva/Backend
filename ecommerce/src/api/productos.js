const fs = require('fs');

class Productos{
    constructor(){
        this.productos = [];
        this.id = 0;
    }

    listarTodos(){        
        return this.productos;
    }
    
    listarPorId(id){
        let found = this.productos.find(element => element.id === id);
        if(found==undefined){
            found = {mensaje: "Producto no encontrado"};
        }
        return found;
    }

    guardarProd(obj){
        //TODO: leer los registros desde el filesystem
        try {
            this.productos.push({id:this.id++,timestamp:new Date().toISOString(), ...obj});
            fs.writeFileSync('./src/assets/productos.txt', JSON.stringify(this.productos, null, '\t'));
            return this.productos;    
        } catch (error) {
            return [{
                error: error
            }];
        }
    }

    borrarProd(id){
        try {
            const producto = this.productos.find(item => item.id == id);
            this.productos = this.productos.filter(a => a.id != id);
            return producto;
        } catch (error) {
            return [{
                error: error
            }];
        }
    }

    actualizarProd(id, obj){
        try {
            const indice = this.productos.findIndex(item => item.id == id);
            /* this.productos[indice].title = obj.title;
            this.productos[indice].price = obj.price;
            this.productos[indice].thumbnail = obj.thumbnail; */
            this.productos[indice] = obj;
            return this.productos[indice];
        } catch (error) {
            return [{
                error: error
            }];
        }
    }
    
}

//exporto una instancia de la clase
module.exports = new Productos();