const producto = document.getElementById("bodega-list")
letCarrito = {}

$(document).ready(function() {
    // Hacer la solicitud a la API y manipular la respuesta
    fetch("api/productos/bodega")
        .then(response => response.json())
        .then(data => {
            // Verificar si data contiene el array de productos
            if (Array.isArray(data.productos)) {
                // Manipular los datos obtenidos
                const bodegaList = document.getElementById("bodega-list");
                data.productos.forEach(producto => {
                    const listItem = document.createElement("li");
                    listItem.innerHTML = `
                        <img src="${producto.asset}" alt="${producto.nombre}">
                        <h3>${producto.nombre}</h3>
                        <p>Código: ${producto.codigo}</p>
                        <p>Descripción: ${producto.descripcion}</p>
                        <p>Precio: ${producto.precio}</p>
                        <p><button class="btn btn-dark">Agregar</button><p>
                    `; 
                    bodegaList.appendChild(listItem);
                });
            } else {
                console.error("La respuesta de la API no contiene un array de productos válido");
            }
        })
        .catch(error => console.error(error));
});

producto.addEventListener("click", e => {
    addCarrito(e)
})

const addCarrito = e =>{
    //console.log(e.target)
    //console.log(e.target.classList.contains('btn-dark'))
    if(e.target.classList.contains('btn-dark')){
        console.log(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = objeto => {

}