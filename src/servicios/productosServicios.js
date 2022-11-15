import axios from "axios";

const productosServicios = {}
const URI = "https://noel-api.herokuapp.com/";
const URL = URI+"productos/";
    
productosServicios.listarProductos = () => {
    return axios.get(URL);
}

productosServicios.listarProductosDisponibles = () => {
    return axios.get(URL+"?disp=true");
}

productosServicios.filtrarProductos = (criterio) => {
    return axios.get(URL+"?q="+criterio);
}

productosServicios.filtrarProductosDisponibles = (criterio) => {
    return axios.get(URL+"?q="+criterio+"&disp=true");
}

productosServicios.cargarProducto = (id) => {
    return axios.get(URL + id);
}

productosServicios.guardarProducto = (producto) => {
    return axios.post(URL, producto);
}

productosServicios.modificarProducto = (id, producto) => {
    return axios.put(URL + id, producto);
}

productosServicios.eliminarProducto = (id) => {
    return axios.delete(URL + id);
}

export default productosServicios;