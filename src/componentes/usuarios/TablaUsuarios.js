import Estados from "../../enums/Estados";
import usuarioServicios from "../../servicios/usuarioServicios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './TablaUsuarios.css';
const TablaUsuarios = () => {

    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [estado, setEstado] = useState(Estados.CARGANDO);
    const [criterio, setCriterio] = useState("");
    const [idBorrar, setIdBorrar] = useState("");
    const [nombreBorrar, setNombreBorrar] = useState("");


    const cargarPagina = async () => {

        try {
            setEstado(Estados.CARGANDO);
            const respuesta = await usuarioServicios.obtenerUsuario();
            console.log(respuesta);
            setListaUsuarios(respuesta.data);
            if (respuesta.data.length === 0) {
                setEstado(Estados.VACIO);
                console.log('esta vacio');
            }
            else {
                setEstado(Estados.OK);
                console.log('esta bien');
            }
        } catch (error) {

            setEstado(Estados.ERROR);
            console.log('hubo un error');
        }
    }
    useEffect(() => {
        cargarPagina();
    }, []);



    // function ConfirmarDelete(){
    //     var respuesta =confirm("Estas seguro que deseas eliminar la categoria");
    //     if (respuesta   ==  true){
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }
    // }

    const buscarUsuario = async (event) => {
        event.preventDefault();

        try {
            const respuesta = await usuarioServicios.buscarUsuarioPorCriterios(criterio);
            console.log(respuesta);
            setListaUsuarios(respuesta.data);
            if (respuesta.data.length === 0) {
                setEstado(Estados.VACIO);
            }
            else {
                setEstado(Estados.OK);
            }
        } catch (error) {
            setEstado(Estados.ERROR);
        }
    }

    const cambiarCriterio = (event) => {
        setCriterio(event.target.value);
    }

    const confirmarBorrado = (id, nombre) => {
        setIdBorrar(id);
        setNombreBorrar(nombre);
    }

    const borrarCliente = async () => {
        try {
            await usuarioServicios.EliminarUsuario(idBorrar);
            cargarPagina();
        } catch (error) {

        }

    }
    return (
        <div className="container">
            <h3> Lista de Usuarios</h3>
            <a href="/usuarios/form" className="btn btn-sm btn-success">Nuevo</a>
            <br></br>
            <br></br>
            <br></br>
            <form action="">
                <input type="text" onChange={cambiarCriterio} value={criterio} id="criterio" name="criterio" placeholder="Buscar por"></input>
                <button className="btn btn-sm btn-primary" onClick={buscarUsuario}> Buscar</button>
            </form>

            <div className="container">
                <div className="row">
                    {
                        (estado === Estados.CARGANDO) ?
                            (
                                // <tr>
                                //     <td align="center" colSpan={4}>Cargando...</td>
                                // </tr>
                                <div className="alert alert-warning" role="alert" align="center" colSpan={4}>
                                    Cargando...
                                </div>
                            ) :
                            estado === Estados.VACIO ?
                                (
                                    // <tr>
                                    //     <td align="center" colSpan={4}>No hay datos.</td>
                                    // </tr>
                                    <div className="alert alert-warning" role="alert" align="center" colSpan={4}>
                                        No hay datos.
                                    </div>
                                ) :
                                estado === Estados.ERROR ?
                                    (
                                        // <tr>
                                        //     <td align="center" colSpan={4}>Ocurrio un error. Por favor intente mas tarde</td>
                                        // </tr>
                                        <div className="alert alert-warning" role="alert" align="center" colSpan={4}>
                                            Ocurrio un error. Por favor intente mas tarde
                                        </div>
                                    ) :
                                    listaUsuarios.map((usuario) => (

                                        <div className="col-lg-4 col-md-6 col-sm-12 mt-3" key={usuario._id}>
                                            <div className="card" style={{ width: "18rem" }} >
                                                <img src={usuario.imagen} className="card-img-top" alt="imagen" style={{ width: "286", height: "171" }}></img>
                                                <div className="card-body">
                                                    <h5 className="card-title">{usuario.nombre}</h5>
                                                    <p className="card-text">{usuario.apellido}</p>
                                                    <p className="card-text">{usuario.correo}</p>
                                                    <p className="card-text">{usuario.rol}</p>
                                                    <a href={"/usuarios/form/" + usuario._id} className="btn btn-primary btn-sm me" >Editar</a>
                                                    {/* <button className="btn btn-primary btn-sm me" onclick={href="/categorias/form"}>Editar</button> */}
                                                    <button onClick={() => { confirmarBorrado(usuario._id, usuario.nombre) }} className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#modalBorrado">Eliminar</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))

                    }

                </div>
            </div>
            <div className="modal fade" id="modalBorrado" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Borrado de usuario</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Está seguro de borrar el usuario {nombreBorrar}?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" onClick={borrarCliente} className="btn btn-danger" data-bs-dismiss="modal">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}
export default TablaUsuarios;