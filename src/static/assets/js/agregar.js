const agregarProducto = document.querySelector('#agregarProducto')


/*"AgregarProductos" es un evento que detecta en el formulario el boton "enviar" que es de tipo submit 
el cual saca del formulario el nombre, precio, descripcion e imagen esto es llevado con el fetch a la api y es pasado a json
siendo agregado a la base de datos*/
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
    console.log(data)

})