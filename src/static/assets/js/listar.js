const agregarProducto = document.querySelector("#agregarProducto");
const listaProducto = document.querySelector("#listarProducto");
const actualizarProducto = document.querySelector("#actualizarProducto"); // Agregado

async function getProductos() {
    try {
        const response = await fetch("/api/productos");
        const data = await response.json();
        console.log("Datos recibidos:", data);
        return data;
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        return [];
    }
}

function renderProducto(producto) {
    const productoItem = document.createElement("li");
    productoItem.innerHTML = `
        <h2>Id:</h2><h4>${producto.idProductos}</h4>
        <h2>Nombre:</h2><h4>${producto.Nombre}</h4>
        <h2>Precio:</h2><h4>${producto.Precio}</h4>
        <h2>Descripcion:</h2><h4>${producto.Descripcion}</h4>
        <h2>Imagen:</h2>
        <img src="/static/uploads/${producto.Imagen}" alt="Imagen del producto">
        <br>
        <button class="btn-delete">eliminar</button>
        <button class="btn-update" onclick="goToTop()">actualizar</button>
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

    btnUpdate.addEventListener("click", (e) => {
        e.preventDefault();
        const nombreProducto = actualizarProducto.querySelector("#nombreProducto");
        const precioProducto = actualizarProducto.querySelector("#precioProducto");
        const descripcionProducto = actualizarProducto.querySelector("#descripcionProducto");
        const imagenProducto = actualizarProducto.querySelector("#imagenProducto");

        nombreProducto.value = producto.Nombre;
        precioProducto.value = producto.Precio;
        descripcionProducto.value = producto.Descripcion;
        imagenProducto.src = `/api/productos/uploads/${producto.Imagen}`;
    });

    listaProducto.append(productoItem);
}

async function renderProductos() {
    listaProducto.innerHTML = "";
    const productos = await getProductos();
    productos.forEach(renderProducto);
}

window.addEventListener("DOMContentLoaded", renderProductos);

function goToTop() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    });
}
