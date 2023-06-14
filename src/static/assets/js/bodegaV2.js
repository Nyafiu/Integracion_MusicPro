const templateCard = document.getElementById("template-card").content;
const templateFooter = document.getElementById("template-footer").content;
const templateCarrito = document.getElementById("template-carrito").content;
const cards = document.getElementById("cards");
const items = document.getElementById("items");
const footer = document.getElementById("footer")
const fragment = document.createDocumentFragment();
let carrito = {}

document.addEventListener("DOMContentLoaded", () => {
    fetchData();
});

const fetchData = async () => {
    try {
        const res = await fetch("api/productos/bodega");
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
    data.productos.forEach(producto => {
        console.log(producto);
        templateCard.querySelector('h1').textContent = producto.nombre;
        templateCard.querySelector('h3').textContent = producto.precio;
        templateCard.querySelector('p').textContent = producto.descripcion;
        templateCard.querySelector('img').src = producto.asset;
        templateCard.querySelector('.btn-dark').dataset.id = producto.id;
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    });
    cards.appendChild(fragment);
};

const addCarrito = e =>{
    //console.log(e.target.classList.contains('btn-dark'))
    if(e.target.classList.contains('btn-dark')){
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

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

const mostrarCarrito = () => {
    console.log(carrito)
    items.innerHTML = ''
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.nombre
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    mostrarFooter()
}

const mostrarFooter = () => {
    footer.innerHTML = ''
    if (Object.keys(carrito).length === 0){
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito Vacio</th>
        `    
        return
    }   
    const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad,0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + precio * cantidad,0)
    //console.log(nPrecio)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio
    
    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener("click", () => {
        carrito = {}
        mostrarCarrito()
    }) 
}

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
