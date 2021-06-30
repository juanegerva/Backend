const express = require('express');
const router = express.Router();

//Instancia de la clase Productos de api (viene instanciado desde el export)
const objCarrito = require('../api/carrito'); 

//Las rutas del carrito

router.get('/carrito', (req, res) =>{
    try {
        res.status(200).send(objCarrito.listarTodos());    
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/carrito/:id', (req, res) => {
    try {
        res.send(objCarrito.listarPorId(parseInt(req.params.id)));
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/carrito/guardar/',(req, res)=>{
    try {
        objCarrito.guardarCarrito(req.body);
        //res.redirect('/');
        res.send(req.body);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.put('/carrito/actualizar/:id',(req,res)=>{
    try {
        let update = {
            fecha: req.body.fecha
        };
        res.send(objcarrito.actualizarCarrito(req.params.id, update));
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete('/carrito/borrar/:id',(req,res)=>{
    try {
        res.send(objcarrito.borrarCarrito(req.params.id));
    } catch (error) {
        res.status(500).send(error.message);
    }
});
//Exporto 
module.exports = router;