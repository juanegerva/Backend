const express = require('express');
const path = require('path')

const administrador = false;

//Creo la app
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));//Sirve para procesar el body de los post y llevarlo a un objeto body (req.body.)
app.use(express.static(path.join(__dirname + '/public')));


//Protejo el servidor ante cualquier exception no tratada
app.use((err,req,res,next) => {
    console.log(err.message);
    return res.status(500).send('Algo se rompio en el servidor');
});


//Importo mis rutas
const productosRouter = require('./src/routes/productos.js');//No es necesario usar .js
const carritoRouter = require('./src/routes/carrito.js');//No es necesario usar .js
app.use('/api',productosRouter);
app.use('/api', carritoRouter);



/* app.use((req, res, next) => {
    console.log('Fecha/Hora', new Date().toLocaleString());
    next();
});
 */
//obtengo el puerto del .env si existe, sino uso el 8080
const PORT = process.env.PORT || 8080;

//pongo a escuchar al servidor
const server = app.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});


// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});

module.exports = server;