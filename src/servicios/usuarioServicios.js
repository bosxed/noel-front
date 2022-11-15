import axios from "axios";


const usuarioServicios = {};


usuarioServicios.obtenerUsuario = () => {
    return axios.get("http://localhost:8000/usuarios");
};

usuarioServicios.cargarUsuario = (id) => {
    return axios.get("http://localhost:8000/usuarios/"+id );
};

usuarioServicios.buscarUsuarioPorCriterios = (criterio) => {
    return axios.get("http://localhost:8000/usuarios?q=" + criterio);
};

usuarioServicios.guardarUsuario= (usuario) => {
    return axios.post("http://localhost:8000/usuarios", usuario);
};

usuarioServicios.editarUsuario= (id,usuario) => {
    return axios.put("http://localhost:8000/usuarios/"+id, usuario);
};

usuarioServicios.EliminarUsuario= (id,usuario) => {
    return axios.delete("http://localhost:8000/usuarios/"+id, usuario);
};
export default usuarioServicios;