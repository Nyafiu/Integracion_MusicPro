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
    listaProducto.classList.add("lista");
    productoItem.innerHTML = `
        <h2>Id: <span class="cursiva">${producto.idProductos}</span></h2>
        <h2>Nombre: <span class="cursiva">${producto.Nombre}</span></h2>
        <h2>Precio: <span class="cursiva">${producto.Precio}</span></h2>
        <h2>Descripcion: <span class="cursiva">${producto.Descripcion}</span></h2>
        <h2>Stock: <span class="cursiva">${producto.Stock}</span></h2>
        <h2>Categoria: <span class="cursiva">${producto.Categoria}</span></h2>
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
        const stockProducto = actualizarProducto.querySelector('#stockProducto');
        const categoriaProducto = actualizarProducto.querySelector('#categoriaProducto');

        nombreProducto.value = producto.Nombre;
        precioProducto.value = producto.Precio;
        descripcionProducto.value = producto.Descripcion;
        imagenProducto.src = `/api/productos/uploads/${producto.Imagen}`;
        stockProducto.value = producto.Stock;
        categoriaProducto.value = producto.Categoria;
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
