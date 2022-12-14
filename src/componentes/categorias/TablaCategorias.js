import Estados from "../../enums/Estados";
import categoriaServicios from "../../servicios/categoriaServicios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './TablaCategorias.css';
const TablaCategorias = () => {

    const [listaCategorias, setListaCategorias] = useState([]);
    const [estado, setEstado] = useState(Estados.CARGANDO);
    const [criterio, setCriterio] = useState("");
    const [ idBorrar, setIdBorrar ] = useState("");
    const [ nombreBorrar, setNombreBorrar ] = useState("");

    const cargarPagina = async () => {

        try {
            setEstado(Estados.CARGANDO);
            const respuesta = await categoriaServicios.obtenerCategorias();
            console.log(respuesta);
            setListaCategorias(respuesta.data);
            if (respuesta.data.length === 0) {
                setEstado(Estados.VACIO);
                console.log('esta vacio');
            }
            else {
                setEstado(Estados.OK);
                console.log('esta vacioo');
            }
        } catch (error) {

            setEstado(Estados.ERROR);
            console.log('esta error');
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

    const buscarCategoria = async (event) => {
        event.preventDefault();

        try {
            const respuesta = await categoriaServicios.buscarCategoriasPorCriterios(criterio);
            console.log(respuesta);
            setListaCategorias(respuesta.data);
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

    const confirmarBorrado = (id, nombre) => {
        setIdBorrar(id);
        setNombreBorrar(nombre);
    }

    const borrarCliente = async () => {
        try {
            await categoriaServicios.EliminarCategoria(idBorrar);
            cargarPagina();
        } catch (error) {
            
        }
    }

    const cambiarCriterio = (event) => {
        setCriterio(event.target.value);
    }

    return (
        <div className="container">
            <h3> Lista de Categorias</h3>
            <a href="/categorias/form" className="btn btn-sm btn-success">Nuevo</a>
            <br></br>
            <br></br>
            <br></br>
            <form action="">
                <input type="text" onChange={cambiarCriterio} value={criterio} id="criterio" name="criterio" placeholder="Buscar por"></input>
                <button className="btn btn-sm btn-primary" onClick={buscarCategoria}> Buscar</button>
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
                                    listaCategorias.map((categoria) => (

                                        <div className="col-lg-4 col-md-6 col-sm-12 mt-3" key={categoria._id}>
                                            <div className="card" style={{ width: "18rem" }} >
                                                <img src={categoria.imagen} className="card-img-top" alt="hola" style={{ width: "286", height: "171" }}></img>
                                                <div className="card-body">
                                                    <h5 className="card-title">{categoria.nombre}</h5>
                                                    <p className="card-text">{categoria.descripcion}</p>
                                                    <a href={"/categorias/form/"+categoria._id} className="btn btn-primary btn-sm me" >Editar</a>
                                                    {/* <button className="btn btn-primary btn-sm me" onclick={href="/categorias/form"}>Editar</button> */}
                                                    
                                                    {/* <button className="btn btn-danger btn-sm" onClick={() => { if (window.confirm('Esta seguro que desea eliminar esta categoria?')) { this.deleteHandler() }; }}>Eliminar</button> */}
                                                    <button onClick={() => {confirmarBorrado(categoria._id, categoria.nombre )}} className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#modalBorrado">Eliminar</button>
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
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Borrado de categoria</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Est?? seguro de borrar la categoria {nombreBorrar}?
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
export default TablaCategorias;