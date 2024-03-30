import { Producto } from "./Producto.js";
import { mostrarToastify } from "./toastify.js";

const productosDisponibles = JSON.parse(sessionStorage.getItem("productosDisponibles"));
let productosCarrito = JSON.parse(sessionStorage.getItem("carrito"));

const indicadorCarrito = document.querySelector(".indicadorCarrito");
const containerBars = document.querySelector(".container-bars");
const btnComprar = document.querySelector(".btn-comprar")
const btnVaciar = document.querySelector(".btnVaciar");
const aside = document.querySelector(".aside");
const tabla = document.querySelector(".table");

comprobarValores();

function comprobarValores(){
    if (productosCarrito !== null) {
        productosCarrito = productosCarrito.map(p => new Producto(p.id,p.nombre,p.precio,p.url,p.categoria,p.cantidad));
        indicadorCarrito.innerHTML = "";
        renderizarTabla(productosCarrito,tabla);
        comprobarPrecio(true)
    }

    if(productosCarrito === null || productosCarrito.length === 0){
        indicadorCarrito.innerHTML = "Tu carrito está vacío.";
        comprobarPrecio(false);
    }
}

function renderizarTabla(productos,tabla) {
    tabla.innerHTML = "";

    productos.forEach( producto => {
        const {id, nombre, precio, url, categoria, cantidad} = producto;
        tabla.innerHTML +=
        `
        <tr>
            <td>
                <img src="${url}" alt="">
            </td>
            <td>
                <h5>Titulo</h5>
                <h3>${nombre}</h3>
            </td>
            <td>
                <h5>Cantidad</h5>
                <p>${cantidad}</p>
            </td>
            <td>
                <h5>Precio</h5>
                <p>$${precio}</p>
            </td>
            <td>
                <button class="btn-delete" id="${id}">
                    <i class="bi bi-trash-fill"></i>
                </button>
            </td>
        </tr>
        `
    });

    addEventoBtnDeleta();
}

function addEventoBtnDeleta() {
    let bontonesEliminar = document.querySelectorAll(".btn-delete");

    bontonesEliminar.forEach(btn => {
        btn.addEventListener("click",(e) =>{
            mostrarToastify("producto eliminado",document.body.clientWidth);
            let id = parseInt(e.target.id);
            let i = devolverPosicion(id,productosCarrito);

            if (productosCarrito.find(p => p.id === id).getCantidad() === 1) {
                productosCarrito.splice(i,1);
            }else{
                productosCarrito[i].setCantidad(productosCarrito[i].getCantidad() - 1);
            }

            sessionStorage.setItem("carrito",JSON.stringify(productosCarrito));
            sessionStorage.setItem("numero",productosCarrito.reduce((a,p) => a + p.getCantidad(),0));
            comprobarValores();
        })
    })
}

function comprobarPrecio(key) {
    const carritoAcciones = document.querySelector(".carrito-acciones");
    const precio = document.querySelector(".precio");

    switch (key) {
        case true:
            carritoAcciones.style.display = "flex";    
            precio.innerHTML = productosCarrito.reduce((a,p) => a + (p.getPrecio() * p.getCantidad()),0).toFixed(2) + "$";
            break;
    
        case false:
            carritoAcciones.style.display = "none";   
            precio.innerHTML = ""; 
            break
    }
}

btnVaciar.addEventListener("click",() =>{
    Swal.fire({
        title: '¿Estás seguro?',
        icon: 'question',
        html: `Se van a borrar ${productosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            productosCarrito.splice(0,productosCarrito.length);
            sessionStorage.setItem("carrito",JSON.stringify(productosCarrito));
            sessionStorage.setItem("numero",productosCarrito.reduce((a,p) => a + p.getCantidad(),0));
            comprobarValores();
        }
      })
});

btnComprar.addEventListener("click",() =>{
    productosCarrito.splice(0,productosCarrito.length);
    sessionStorage.clear();
    comprobarValores();
    indicadorCarrito.innerHTML = "Muchas gracias por tu compra."
})

function devolverPosicion(id,productos) {
    for (let index = 0; index < productos.length; index++) {
        if (productos[index].id === id) {
            return index;
        }
    }
}

containerBars.addEventListener("click",() =>{
    aside.classList.toggle("aside-active")
})

