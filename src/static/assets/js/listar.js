const agregarProducto = document.querySelector("#agregarProducto");
const listarProducto = document.querySelector("#listarProducto");
const actualizarProducto = document.querySelector("#actualizarProducto");

// Cuando se cargue la página, hacer una petición GET a la API y renderizar los productos
window.addEventListener("DOMContentLoaded", async () => {
    const listaProducto = document.querySelector("#listarProducto");
    const response = await fetch("/api/productos");
    const productos = await response.json();
    renderProductos(productos);

    function renderProductos(productos) {
        listaProducto.innerHTML = "";
        productos.forEach((producto) => {
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
                if (
                    confirm(`¿Estás seguro de eliminar este producto? ${producto.Nombre}`)
                ) {
                    const response = await fetch(
                        `/api/productos/delete/${producto.idProductos}`,
                        {
                            method: "DELETE",
                        }
                    );
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
                // Buscar los elementos del formulario
                e.preventDefault();
                const nombreProducto =
                    actualizarProducto.querySelector("#nombreProducto");
                const precioProducto =
                    actualizarProducto.querySelector("#precioProducto");
                const descripcionProducto = actualizarProducto.querySelector(
                    "#descripcionProducto"
                );
                const imagenProducto =
                    actualizarProducto.querySelector("#imagenProducto");

                // Cargar los valores del producto en el formulario
                nombreProducto.value = producto.Nombre;
                precioProducto.value = producto.Precio;
                descripcionProducto.value = producto.Descripcion;
                imagenProducto.value = producto.Imagen;

                // Cuando se envíe el formulario, hacer la petición PUT a la API
                actualizarProducto.addEventListener("submit", async (e) => {
                    e.preventDefault();
                    const response = await fetch(`/api/productos/update/${producto.idProductos}`,
                        {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                nombre: nombreProducto.value,
                                precio: precioProducto.value,
                                descripcion: descripcionProducto.value,
                                imagen:null,
                            }),
                        }
                    );
                    const data = await response.json();
                    console.log(data);
                });
            });
            listaProducto.append(productoItem);
        });
    }
});
