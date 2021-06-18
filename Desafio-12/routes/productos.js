//Acá debo definir las rutas asociadas a productos

const express = require('express');
const router = express.Router();

//Instancia de la clase Productos de api (viene instanciado desde el export)
const objProductos = require('../api/productos');

//Ruta de Bienvenida
router.get('/', (req, res) => {
    //res.send('Bienvenido al servidor express');
});

//Rutas de Productos
router.get('/productos', (req, res) => {
    try {
        res.status(200).send(objProductos.listarTodos());    
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/productos/vista', (req, res) => {
    if(objProductos.productos.length > 0) {
        hayProductos=true;
    }else{
        hayProductos=false;
    }
    res.render('main', { productos: objProductos.listarTodos(), hayProductos});
});

router.get('/productos/:id', (req, res) => {
    try {
        res.send(objProductos.listarPorId(parseInt(req.params.id)));
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/productos/guardar/',(req, res)=>{
    try {
        objProductos.guardarProd(req.body);
        //res.redirect('/');
        res.send(req.body);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.put('/productos/actualizar/:id',(req,res)=>{
    try {
        let update = {
            title: req.body.title,
            price: req.body.price,
            thumbnail: req.body.thumbnail
        };
        res.send(objProductos.actualizarProd(req.params.id, update));
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete('/productos/borrar/:id',(req,res)=>{
    try {
        res.send(objProductos.borrarProd(req.params.id));
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
