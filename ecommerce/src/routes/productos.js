const express = require('express');
const router = express.Router();

//Instancia de la clase Productos de api (viene instanciado desde el export)
const objProductos = require('../api/productos');

//Middleware Locales

function acceso (req, res, next) {
    if (req.body.administrador !== true) {
        res.status(401).send({ error: -1, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no autorizado` })
    } else {
        next();
    }
};

//Rutas de Productos
router.get('/productos', (req, res) => {
    try {
        res.status(200).send(objProductos.listarTodos());    
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/productos/:id', (req, res) => {
    try {
        res.send(objProductos.listarPorId(parseInt(req.params.id)));
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/productos/guardar/',acceso, (req, res)=>{
    try {
        objProductos.guardarProd(req.body);
        //res.redirect('/');
        res.send(req.body);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.put('/productos/actualizar/:id',acceso,(req,res)=>{
    try {
        let update = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            codigo: req.body.codigo,
            foto: req.body.foto,
            precio: req.body.precio,
            stock: req.body.stock
        };
        res.send(objProductos.actualizarProd(req.params.id, update));
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete('/productos/borrar/:id',acceso,(req,res)=>{
    try {
        res.send(objProductos.borrarProd(req.params.id));
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//Exporto 
module.exports = router;