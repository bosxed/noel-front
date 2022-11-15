import axios from "axios";

const URI = "https://noel-api.herokuapp.com/";

const usuarioServicios = {};


usuarioServicios.obtenerUsuario = () => {
    return axios.get(URI+"usuarios");
};

usuarioServicios.cargarUsuario = (id) => {
    return axios.get(URI+"usuarios/"+id );
};

usuarioServicios.buscarUsuarioPorCriterios = (criterio) => {
    return axios.get(URI+"usuarios?q=" + criterio);
};

usuarioServicios.guardarUsuario= (usuario) => {
    return axios.post(URI+"usuarios", usuario);
};

usuarioServicios.editarUsuario= (id,usuario) => {
    return axios.put(URI+"usuarios/"+id, usuario);
};

usuarioServicios.EliminarUsuario= (id,usuario) => {
    return axios.delete(URI+"usuarios/"+id, usuario);
};
export default usuarioServicios;