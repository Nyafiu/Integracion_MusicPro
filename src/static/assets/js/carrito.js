const templateCard = document.getElementById("template-card").content;
const templateFooter = document.getElementById("template-footer").content;
const templateCarrito = document.getElementById("template-carrito").content;
const cards = document.getElementById("cards");
const items = document.getElementById("items");
const footer = document.getElementById("footer");
const fragment = document.createDocumentFragment();
let carrito = {};


// Asigna el evento de clic al botón


const fechaEntrega = new Date();
fechaEntrega.setDate(fechaEntrega.getDate() + 7);
const diaEntrega = fechaEntrega.getDate();
const mesEntrega = fechaEntrega.getMonth() + 1;
const anioEntrega = fechaEntrega.getFullYear();
const fechaEntregaC = `${anioEntrega}-${mesEntrega < 10 ? '0' + mesEntrega : mesEntrega}-${diaEntrega < 10 ? '0' + diaEntrega : diaEntrega}`;

const fechaActual = new Date();
const dia = fechaActual.getDate();
const mes = fechaActual.getMonth() + 1;
const anio = fechaActual.getFullYear();
const fechaCompleta = `${anio}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`;


const templateBoleta = document.createElement("template");
templateBoleta.innerHTML = `
    <div class="boleta">
        <h2>Boleta de compra</h2>
        <h4>Id boleta:</h4>
        <p id="id-boleta"></p>
        <h4>Domicilio de entrega:</h4>
        <p id="domicilio-boleta"></p>
        <hr>
        <h5>Fecha compra:</h5>
        <p id="fecha-boleta"></p>
        <h5>Fecha entrega:</h5>
        <p>Entrega entre 5 a 7 dias</p>
        <h5>Producto:</h5>
        <div id="boleta-items"></div>
        <hr>
        <p>Total a pagar: $<span id="boleta-total"></span></p>
    </div>
`;


document.addEventListener("DOMContentLoaded", () => {
    fetchData();
});

const fetchData = async () => {
    try {
        const res = await fetch("api/productos");
        const data = await res.json();

        mostrarBodega(data);
} catch (error) {
        console.log(error);
    }
};

cards.addEventListener("click", e =>{
    addCarrito(e)
})

items.addEventListener("click", e =>{
    btnAccion(e)
})

const mostrarBodega = data => {
    data.productos.forEach(productos => {
        console.log(productos);
        templateCard.querySelector('h1').textContent = productos.Nombre;
        templateCard.querySelector('h3').textContent = productos.Precio;
        templateCard.querySelector('p').textContent = productos.Descripcion;
        templateCard.querySelector('img').src = `/static/uploads/${productos.Imagen}`;
        templateCard.querySelector('.btn-dark').dataset.id = productos.idProductos;
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    });
    cards.appendChild(fragment);
};

const mostrarCarrito = () => {
    console.log(carrito)
    indice = 1
    items.innerHTML = ''
    Object.values(carrito).forEach(productos => {
        templateCarrito.querySelector('th').textContent = indice++
        templateCarrito.querySelectorAll('td')[0].textContent = productos.nombre
        templateCarrito.querySelectorAll('td')[1].textContent = productos.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = productos.id
        templateCarrito.querySelector('.btn-danger').dataset.id = productos.id
        templateCarrito.querySelector('span').textContent = productos.cantidad * productos.precio
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
        
})
    items.appendChild(fragment)
    mostrarFooter()
}

function generarIdAleatoria(longitud) {
    let id = '';
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < longitud; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
        id += caracteres.charAt(indice);
    }

    return id;
}  
  // Ejemplo de uso:
const idAleatoria = generarIdAleatoria(8);

const addCarrito = e =>{
    console.log(e.target.classList.contains('btn-dark'))
    if(e.target.classList.contains('btn-dark')){
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = objeto => {
    console.log(objeto)
    const productos = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        nombre: objeto.querySelector('h1').textContent,
        precio: objeto.querySelector('h3').textContent,
        cantidad: 1
    }
    if(carrito.hasOwnProperty(productos.id)) {
        productos.cantidad = carrito[productos.id].cantidad + 1
    }
    carrito[productos.id] ={...productos}
    mostrarCarrito()
}
const mostrarFooter = () => {
    footer.innerHTML = '';
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
            <th scope="row" colspan="5">Carrito Vacío</th>
        `;
        return;
    }

    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0);
    const nPrecio = Object.values(carrito).reduce((acc, { cantidad, precio }) => acc + precio * cantidad, 0);

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad;
    templateFooter.querySelector('span').textContent = nPrecio.toFixed(2);

    const clone = templateFooter.cloneNode(true);
    fragment.appendChild(clone);
    footer.appendChild(fragment);

    const btnVaciar = document.getElementById('vaciar-carrito');
    btnVaciar.addEventListener("click", () => {
        carrito = {};
        mostrarCarrito();
    });

    const btnGenerarBoleta = document.getElementById('btn-generar-boleta');
    btnGenerarBoleta.addEventListener("click", mostrarBoleta);
};

const btnAccion = e => {
    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = {...producto}
        mostrarCarrito()
    }

    if(e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if(producto.cantidad === 0){
            delete carrito[e.target.dataset.id]
        }
        mostrarCarrito()
    }
    e.stopPropagation()
}

const mostrarBoleta = () => {
    const boletaContainer = document.getElementById("boleta");
    boletaContainer.innerHTML = "";

    // Obtener el valor del campo de entrada (input)
    const domicilioInput = document.querySelector(".domicilio");
    const domicilio = domicilioInput.value;

    const boletaItems = Object.values(carrito).map((producto) => `
        <p>${producto.nombre} - Cantidad: ${producto.cantidad}</p>
    `).join("");

    const boletaTotal = Object.values(carrito).reduce((total, producto) => {
        return total + (producto.cantidad * producto.precio);
    }, 0);

    const clone = templateBoleta.content.cloneNode(true);
    clone.getElementById("boleta-items").innerHTML = boletaItems;
    clone.getElementById("boleta-total").textContent = boletaTotal.toFixed(2);
    clone.getElementById("fecha-boleta").textContent = fechaCompleta;
    clone.getElementById("id-boleta").textContent = idAleatoria;

    // Mostrar el domicilio en la boleta
    clone.getElementById("domicilio-boleta").textContent = domicilio;

    boletaContainer.appendChild(clone);
};

const domicilioInput = document.querySelector(".domicilio");