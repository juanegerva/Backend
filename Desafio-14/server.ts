import express from 'express';
const app = express();
import handlebars from 'express-handlebars';


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


const PORT = 8080;

app.listen(PORT, () => {
	console.log(`servidor escuchando en http://localhost:${PORT}`);
});

app.on('error', (error: any) => {
	console.log('error en el servidor:', error);
});