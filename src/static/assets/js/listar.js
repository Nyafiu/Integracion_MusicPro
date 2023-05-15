const agregarProducto = document.querySelector("#agregarProducto");
const listarProducto = document.querySelector("#listarProducto");
const actualizarProducto = document.querySelector("#actualizarProducto");
const listaProducto = document.querySelector("#listarProducto");

async function getProductos() {
    const response = await fetch("/api/productos");
    const productos = await response.json();
    return productos;
}

function renderProducto(producto) {
    const productoItem = document.createElement("li");
    productoItem.innerHTML = `
    <h4><h2>Id:</h2>${producto.idProductos}</h4>
    <h4><h2>Nombre:</h2>${producto.Nombre}</h4>
    <h4><h2>Precio:</h2>${producto.Precio}</h4>
    <h4><h2>Descripcion:</h2>${producto.Descripcion}</h4>
    <h4><h2>Imagen:</h2>${producto.Imagen}</h4><br>
    <button class="btn-delete">eliminar</button>
    <button class="btn-update">actualizar</button>
`;
    const btnDelete = productoItem.querySelector(".btn-delete");
    const btnUpdate = productoItem.querySelector(".btn-update");
    btnDelete.addEventListener("click", async () => {
        if (confirm(`¿Estás seguro de eliminar este producto? ${producto.Nombre}`)) {
            const response = await fetch(`/api/productos/delete/${producto.idProductos}`, { method: "DELETE" });
            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                location.reload();
            } else {
                alert(data.error);
            }
        }
    });

    btnUpdate.addEventListener("click", async (e) => {
        e.preventDefault();
        const nombreProducto = actualizarProducto.querySelector("#nombreProducto");
        const precioProducto = actualizarProducto.querySelector("#precioProducto");
        const descripcionProducto = actualizarProducto.querySelector("#descripcionProducto");
        const imagenProducto = actualizarProducto.querySelector("#imagenProducto");

        nombreProducto.value = producto.Nombre;
        precioProducto.value = producto.Precio;
        descripcionProducto.value = producto.Descripcion;
        imagenProducto.value = producto.Imagen;

        actualizarProducto.addEventListener("submit", async (e) => {
            e.preventDefault();
            const response = await fetch(`/api/productos/update/${producto.idProductos}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nombre: nombreProducto.value,
                    precio: precioProducto.value,
                    descripcion: descripcionProducto.value,
                    imagen: null,
                }),
            });
            const data = await response.json();
            console.log(data);
        });
    });

    listaProducto.append(productoItem);
}

async function renderProductos() {
    listaProducto.innerHTML = "";
    const productos = await getProductos();
    productos.forEach(renderProducto);
}

window.addEventListener("DOMContentLoaded", renderProductos);

