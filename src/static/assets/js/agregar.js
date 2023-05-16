const agregarProducto = document.querySelector('#agregarProducto')

agregarProducto.addEventListener('submit', async e => {
    e.preventDefault()

    const nombre = agregarProducto['nombreProducto'].value
    const precio = agregarProducto['precioProducto'].value
    const descripcion = agregarProducto['descripcionProducto'].value

    // Obtener la imagen seleccionada por el usuario
    const imagenInput = agregarProducto['imagenProducto']
    const imagenFile = imagenInput.files[0]
  
    // Leer la imagen como base64
    const reader = new FileReader()
    reader.onloadend = async function () {
        // Convertir la imagen a base64
        const imagenBase64 = reader.result.split(',')[1]

        // Enviar los datos al servidor
        const response = await fetch('/api/productos/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre,
                precio,
                descripcion,
                imagen: imagenBase64 // Agregar la imagen en base64 al objeto JSON
            })
        })

        const data = await response.json()

        if (response.ok) {
            alert("El producto se agregó correctamente")
            document.getElementById("agregarProducto").reset()
        } else {
            alert("Hubo un error al agregar el producto")
        }
    }
  
    // Leer la imagen como base64
    reader.readAsDataURL(imagenFile)
})
