import axios from "axios";

const URI = "http://localhost:8000/";
// const URI = "https://noel-api.herokuapp.com/";

const categoriaServicios = {};


categoriaServicios.obtenerCategorias = () => {
    return axios.get(URI+"categorias");
};

categoriaServicios.cargarCategorias = (id) => {
    return axios.get(URI+"categorias/"+id );
};

categoriaServicios.buscarCategoriasPorCriterios = (criterio) => {
    return axios.get(URI+"categorias?q=" + criterio);
};

categoriaServicios.guardarCategoria = (categoria) => {
    return axios.post(URI+"categorias", categoria);
};

categoriaServicios.editarCategoria = (id,categoria) => {
    return axios.put(URI+"categorias/"+id, categoria);
};

categoriaServicios.EliminarCategoria = (id,categoria) => {
    return axios.delete(URI+"categorias/"+id, categoria);
};
export default categoriaServicios;