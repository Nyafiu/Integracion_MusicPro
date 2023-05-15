const agregarProducto = document.querySelector('#agregarProducto')

agregarProducto.addEventListener('submit', async e => {
    e.preventDefault()

    const nombre = agregarProducto['nombreProducto'].value
    const precio = agregarProducto['precioProducto'].value
    const descripcion = agregarProducto['descripcionProducto'].value

    const response = await fetch('/api/productos/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre,
            precio,
            descripcion,
        })
    })

    const data = await response.json()

    if (data.error) {
        alert("Hubo un error al agregar el producto")
    } else {
        alert("El producto se agregó correctamente")
        document.getElementById("agregarProducto").reset()
    }
})
