const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const http = require('http').Server(app);
const productos = require('./api/producto');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.engine(
	"hbs",
	handlebars({
		extname: ".hbs",
		defaultLayout: 'index.hbs',
	})
);

app.set("view engine", "hbs");
app.set("views", __dirname + '/views');

const productosRouter = require('./routes/productos');
app.use('/api', productosRouter);

const PORT = 8080;

const server = http.listen(PORT, () => {
	console.log(`servidor escuchando en http://localhost:${PORT}`);
});

server.on('error', error => {
	console.log('error en el servidor:', error);
});