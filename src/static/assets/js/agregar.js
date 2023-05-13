const agregarProducto = document.querySelector('#agregarProducto')

agregarProducto.addEventListener('submit', async e => {
    e.preventDefault()

    const nombre = agregarProducto['nombreProducto'].value
    const precio = agregarProducto['precioProducto'].value
    const descripcion = agregarProducto['descripcionProducto'].value
    const imagen = agregarProducto['imagenProducto'].value

    const response = await fetch('/api/productos/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre,
            precio,
            descripcion,
            imagen
        })
    })

    const data = await response.json()
    console.log(data)

})