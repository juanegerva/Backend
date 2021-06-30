const fs = require('fs')

class Carrito{

    constructor(){
        this.carrito = [];
        this.id = 0;
    }

    listarTodos(){        
        return this.carrito;
    }

    listarPorId(id){
        let found = this.carrito.find(element => element.id === id);
        if(found==undefined){
            found = {mensaje: "Carrito no encontrado"};
        }
        return found;
    }

    guardarCarrito(obj){
        try {
            //TODOS : Solo recibir el id del producto, con el cual llamar a listarPorId de Productos y eso pasarselo al carrito
            this.carrito.push({id:this.id++,timestamp:new Date().toISOString(),productos: {...obj}});
            fs.writeFileSync('./src/assets/carrito.txt', JSON.stringify(this.carrito, null, '\t'));
            return this.carrito;    
        } catch (error) {
            return [{
                error: error
            }];
        }
    }

    borrarCarrito(id){
        try {
            const carrito = this.carrito.find(item => item.id == id);
            this.carrito = this.carrito.filter(a => a.id != id);
            return carrito;
        } catch (error) {
            return [{
                error: error
            }];
        }
    }

    /* actualizarCarrito(id, obj){
        try {
            const indice = this.carrito.findIndex(item => item.id == id);
            this.carrito[indice] = obj;
            return this.carrito[indice];
        } catch (error) {
            return [{
                error: error
            }];
        }
    } */
}

//exporto una instancia de la clase
module.exports = new Carrito();