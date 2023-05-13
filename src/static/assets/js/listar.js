const listarProducto = document.querySelector('#listarProducto')

window.addEventListener('DOMContentLoaded', async () =>{
    const response = await fetch('/api/productos');
    const productos = await response.json()
    renderProductos(productos);
})

function renderProductos(productos){
    const listaProducto = document.querySelector('#listarProducto')
    listaProducto.innerHTML = ''

    productos.forEach(producto => {
        const productoItem = document.createElement('li')
        productoItem.innerHTML = `
            <h4><h2>Id:</h2>${producto.IdProducto}</h4>
            <h4><h2>Nombre:</h2>${producto.Nombre}</h4>
            <h4><h2>Precio:</h2>${producto.Precio}</h4>
            <h4><h2>Descripcion:</h2>${producto.Descripcion}</h4>
            <h4><h2>Imagen:</h2>${producto.Imagen}</h4>
        `;
        listaProducto.append(productoItem);
    })
}

