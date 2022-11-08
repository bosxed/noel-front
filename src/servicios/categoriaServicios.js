import axios from "axios";


const categoriaServicios = {};


categoriaServicios.obtenerCategorias = () => {
    return axios.get("http://localhost:8000/categorias");
};

categoriaServicios.cargarCategorias = (id) => {
    return axios.get("http://localhost:8000/categorias/"+id );
};

categoriaServicios.buscarCategoriasPorCriterios = (criterio) => {
    return axios.get("http://localhost:8000/categorias?q=" + criterio);
};

categoriaServicios.guardarCategoria = (categoria) => {
    return axios.post("http://localhost:8000/categorias", categoria);
};

categoriaServicios.editarCategoria = (id,categoria) => {
    return axios.put("http://localhost:8000/categorias/"+id, categoria);
};

categoriaServicios.EliminarCategoria = (id,categoria) => {
    return axios.delete("http://localhost:8000/categorias/"+id, categoria);
};
export default categoriaServicios;