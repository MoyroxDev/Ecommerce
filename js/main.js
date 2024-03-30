import { Producto } from "./Producto.js";
import { mostrarToastify } from "./toastify.js";


let productosDisponibles = await (await fetchData("js/package.json")).productos;
productosDisponibles = productosDisponibles.map(p => new Producto(p.id,p.nombre,p.precio,p.url,p.categoria,0));
let carrito = [];

const containerProductos = document.querySelector(".container-productos");
const containerBars = document.querySelector(".container-bars");
const numero = document.querySelector(".numero");
const aside = document.querySelector(".aside");

sessionStorage.setItem("productosDisponibles",JSON.stringify(productosDisponibles));
renderizarProductos(productosDisponibles,containerProductos);
addEventoCategorias();
addEventoBtnAdd();
comprobarValores();

async function fetchData(url) {
    try {
        let response = await fetch(url);
        let data = await response.json();
        return data
    } catch (error) {
        console.log(error);
    }
}

function renderizarProductos(productos,contenedor) {
    contenedor.innerHTML = "";
    productos.forEach(producto => {
        const {id, nombre, precio, url, categoria} = producto;
        contenedor.innerHTML += 
        `<div class="card-producto">
            <img src="${url}" alt="imagen-producto">
            <div class="card-content">
                <h3>${nombre}</h3>
                <p>${precio}$</p>
                <button class="btnAdd" id="${id}">Agregar</button>
            </div>
        </div>`
    });
}

function addEventoCategorias() {
    const itemCategorias = document.querySelectorAll(".item-categoria");
    const indicador = document.querySelector(".indicador")

    itemCategorias.forEach(item =>{
        item.addEventListener("click",(e) =>{
            let categoria = e.target.id;
            eliminarClase(itemCategorias,"nav-item-active");
            e.target.classList.add("nav-item-active");

            if (categoria !== "all") {
                renderizarProductos(productosDisponibles.filter(p => p.categoria === categoria),containerProductos);
                indicador.innerHTML = categoria;
            }else{
                renderizarProductos(productosDisponibles,containerProductos);
                indicador.innerHTML = "Todos los Productos";
            }
            addEventoBtnAdd();
        })
    });
}

function addEventoBtnAdd(){
    const botonesAdd = document.querySelectorAll(".btnAdd");
    botonesAdd.forEach(btn =>{
        btn.addEventListener("click",(e) =>{
            mostrarToastify("producto agregado",document.body.clientWidth);
            let id = parseInt( e.target.id);
            let productoSelect = productosDisponibles.find(p => p.id === id);

            if (!carrito.some(p => p.id === productoSelect.id)) {
                productoSelect.setCantidad(1);
                carrito.push(productoSelect);
            }else{
                let i = devolverPosicion(id,carrito);
                carrito[i].setCantidad(carrito[i].getCantidad() + 1);
            }

            numero.innerHTML = carrito.reduce((a,p) => a + p.getCantidad(),0);
            sessionStorage.setItem("carrito",JSON.stringify(carrito));
            sessionStorage.setItem("numero",numero.innerHTML);
        })
    })
}

function comprobarValores() {
    numero.innerHTML = 0;

    if (JSON.parse(sessionStorage.getItem("carrito")) !== null) {
        carrito = JSON.parse(sessionStorage.getItem("carrito")).map(p => new Producto(p.id,p.nombre,p.precio,p.url,p.categoria,p.cantidad));
    }

    if (sessionStorage.getItem("numero") !== null) {
        numero.innerHTML = sessionStorage.getItem("numero");
    }
}

function devolverPosicion(id,productos) {
    for (let index = 0; index < productos.length; index++) {
        if (productos[index].id === id) {
            return index;
        }
    }
}

function eliminarClase(items,clase) {
    items.forEach(item => item.classList.remove(clase));
}

containerBars.addEventListener("click",() =>{
    aside.classList.toggle("aside-active")
})
