let todosLosProductos = [];
let paginaActual = 1;
const productosPorPagina = 10;

const templateCard = document.getElementById("template-card").content;
const templateFooter = document.getElementById("template-footer").content;
const templateCarrito = document.getElementById("template-carrito").content;
const cards = document.getElementById("cards");
const items = document.getElementById("items");
const footer = document.getElementById("footer");
const fragment = document.createDocumentFragment();
let carrito = {};

cards.addEventListener("click", e => {
    addCarrito(e);
});

items.addEventListener("click", e => {
    btnAccion(e);
});

const fetchData = async () => {
    try {
        const res = await fetch("api/productos/bodega");
        const data = await res.json();

        todosLosProductos = data.productos; // Asignar los datos de productos a la variable todosLosProductos

        mostrarBodega();
    } catch (error) {
        console.log(error);
    }
};

const mostrarBodega = () => {
    if (!Array.isArray(todosLosProductos)) {
        console.error("La variable todosLosProductos no es un array válido");
        return;
    }

    const productosParaMostrar = todosLosProductos.slice((paginaActual - 1) * productosPorPagina, paginaActual * productosPorPagina);

    productosParaMostrar.forEach(producto => {
        templateCard.querySelector('h1').textContent = producto.nombre;
        templateCard.querySelector('h3').textContent = producto.precio;
        templateCard.querySelector('p').textContent = producto.subcategoria;
        templateCard.querySelector('img').src = producto.imagen;
        templateCard.querySelector('.btn-dark').dataset.id = producto._id;
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    });

    cards.appendChild(fragment);
};

function mostrarMasProductosAlFinalizarScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        paginaActual++;
        mostrarBodega();
    }
}



const mostrarCarrito = () => {
    console.log(carrito)
    indice = 1
    items.innerHTML = ''
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = indice++
        templateCarrito.querySelectorAll('td')[0].textContent = producto.nombre
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    items.appendChild(fragment);
    mostrarFooter();
};

const mostrarFooter = () => {
    footer.innerHTML = '';

    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
            <th scope="row" colspan="5">Carrito Vacio</th>
        `;

        return;
    }

    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0);
    const nPrecio = Object.values(carrito).reduce((acc, { cantidad, precio }) => acc + precio * cantidad, 0);

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad;
    templateFooter.querySelector('span').textContent = nPrecio;

    const clone = templateFooter.cloneNode(true);
    fragment.appendChild(clone);
    footer.appendChild(fragment);

    const btnVaciar = document.getElementById('vaciar-carrito');
    btnVaciar.addEventListener("click", () => {
        carrito = {};
        mostrarCarrito();
    });
};

const setCarrito = objeto => {
    const producto = {
        id: objeto.querySelector(".btn-dark").dataset.id,
        nombre: objeto.querySelector("h1").textContent,
        precio: objeto.querySelector("h3").textContent,
        cantidad: 1
    }    
    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = {...producto}
    mostrarCarrito()
    mostrarFooter()
}
const btnAccion = e => {
    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id];
        producto.cantidad++;
        carrito[e.target.dataset.id] = { ...producto };
        mostrarCarrito();
    }

    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id];
        producto.cantidad--;

        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id];
        }

        mostrarCarrito();
    }

    e.stopPropagation();
};

document.addEventListener("DOMContentLoaded", () => {
    fetchData();
    window.addEventListener('scroll', mostrarMasProductosAlFinalizarScroll);
});

