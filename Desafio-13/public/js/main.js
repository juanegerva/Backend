const socket = io.connect();

//defino la funcion para enviar mensaje del chat al socket
function addMessage(e) {
	let mensaje = {
		author: document.getElementById("username").value,
		text: document.getElementById("texto").value,
	};
	socket.emit("new-message", mensaje);
	return false;
}
// si recibo productos, los muestro usando handlebars
socket.on("productos", function (productos) {
	console.log("productos socket client");
	document.getElementById("datos").innerHTML = data2TableHBS(productos);
});

//render mensajes del chat
socket.on("messages", function (data) {
	console.log(data);
});
function render(data) {
	let html = data
		.map(function (elem, index) {
			return `<div>
		<strong>${elem.author}</strong>
		<em>${elem.text}</em></div>`;
		})
		.join(" ");
	document.getElementById("messages").innerHTML = html;
}
socket.on("messages", function (data) {
	render(data);
});

//form de productos
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
	event.preventDefault();
	const data = {
		title: form[0].value,
		price: form[1].value,
		thumbnail: form[2].value,
	};

	fetch("/api/productos/guardar", {
		headers: {
			"Content-Type": "application/json",
		},
		method: "POST",
		body: JSON.stringify(data),
	})
		.then((respuesta) => respuesta.json())
		.then((productos) => {
			form.reset();
			socket.emit("update", "ok");
		})
		.catch((error) => {
			console.log("ERROR", error);
		});
});

function data2TableHBS(productos) {
	const plantilla = `
        <style>
            .table td,
            .table th {
                vertical-align: middle;
            }
        </style>

        {{#if productos.length}}
        <div class="table-responsive">
            <table class="table table-dark">
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Foto</th>
                </tr>
                {{#each productos}}
                <tr>
                    <td>{{this.title}}</td>
                    <td>$ {{ this.price }}</td>
                    <td><img width="50" src={{this.thumbnail}} alt="not found"></td>
                </tr>
                {{/each}}
            </table>
        </div>
        {{/if}}
    `;

	console.log(productos);
	var template = Handlebars.compile(plantilla);
	let html = template({
		productos: productos,
		hayProductos: productos.length,
	});
	return html;
}
