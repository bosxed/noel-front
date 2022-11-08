import axios from "axios";


const categoriaServicios = {};


categoriaServicios.obtenerCategorias = () => {
    return axios.get("http://localhost:8000/categorias");
};

categoriaServicios.buscarCategoriasPorCriterios = (criterio) => {
    return axios.get("http://localhost:8000/categorias?q=" + criterio);
};

export default categoriaServicios;