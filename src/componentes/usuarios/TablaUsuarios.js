import Estados from "../../enums/Estados";
import usuarioServicios from "../../servicios/usuarioServicios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './TablaUsuarios.css';
const TablaUsuarios = () => {

    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [estado, setEstado] = useState(Estados.CARGANDO);
    const [criterio, setCriterio] = useState("");


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

    return (
        <div className="container">
            <h3> Lista de usuarios</h3>
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
                                                    <a href={"/usuarios/form/"+usuario._id} className="btn btn-primary btn-sm me" >Editar</a>
                                                    {/* <button className="btn btn-primary btn-sm me" onclick={href="/categorias/form"}>Editar</button> */}
                                                    <button className="btn btn-danger btn-sm" onClick={() => { if (window.confirm('Esta seguro que desea eliminar este usuario?')) { this.deleteHandler() }; }}>Eliminar</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))

                    }

                </div>
            </div>
        </div>

    )
}
export default TablaUsuarios;