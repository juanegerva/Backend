const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const productos = require("./api/producto");
const http = require("http").Server(app);
const io = require("socket.io")(http);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

let messages = [
	{ author: "Juan", text: "¡Hola! ¿Que tal?" },
	{ author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
	{ author: "Ana", text: "¡Genial!" },
];

//chat
io.on("connection", function (socket) {
	console.log("Un cliente se ha conectado");
	socket.emit("messages", messages);

	socket.on("new-message", function (data) {
		messages.push(data);
		io.sockets.emit("messages", messages);
	});
});

//hbs
app.engine(
	"hbs",
	handlebars({
		extname: ".hbs",
		defaultLayout: "index.hbs",
	})
);
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

io.on("connection", async (socket) => {
	console.log("Nuevo cliente conectado!");
	socket.emit("productos", productos.listar());
	socket.on("update", (data) => {
		io.sockets.emit("productos", productos.listar());
	});
});

const productosRouter = require("./routes/productos");
app.use("/api", productosRouter);

const port = 8080;

// pongo a escuchar el servidor en el puerto indicado
http.listen(port, () => {
	console.log(`servidor corriendo en http://localhost:${port}`);
});

// en caso de error, avisar
http.on("error", (error) => {
	console.log("error en el servidor:", error);
});
