export class Producto{
    constructor(id,nombre,precio,url,categoria,cantidad){
        this.id = id,
        this.nombre = nombre,
        this.precio = precio,
        this.url = url,
        this.categoria = categoria,
        this.cantidad = cantidad;
    }

    setId(id){
        this.id = id;
    }

    setNombre(nombre){
        this.nombre = nombre;
    }

    setPrecio(precio){
        this.precio = precio
    }

    setUrl(url){
        this.url = url;
    }

    setCategoria(categoria){
        this.categoria = categoria;
    }

    setCantidad(cantidad){
        this.cantidad = cantidad;
    }

    getId(){
        return this.id;
    }

    getNombre(){
        return this.nombre;
    }

    getPrecio(){
        return this.precio;
    }

    getUrl(){
        return this.url;
    }

    getCategoria(){
        return this.categoria;
    }

    getCantidad(){
        return this.cantidad;
    }
}