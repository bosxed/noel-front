import categoriaServicios from "../../servicios/categoriaServicios";

const TablaCategorias = () => {

    const listaCategorias = categoriaServicios.obtenerCategorias();

    // function ConfirmarDelete(){
    //     var respuesta =confirm("Estas seguro que deseas eliminar la categoria");
    //     if (respuesta   ==  true){
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }
    // }
    return (
        <div className="container">
            <h3> Lista de Categorias</h3>
            <a href="/categorias/form" className="btn btn-sm btn-success">Nuevo</a>
            <br></br>
            <br></br>
            <br></br>
            {/* <table className="table table-sm">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Estado</th>
                        <th>Imagen</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listaCategorias.map((categoria) => (
                            <tr>
                                <td>{categoria.nombre}</td>
                                <td>{categoria.descripcion}</td>
                                <td>{categoria.estado ? "SI" : "NO"}</td>
                                <td>{categoria.imagen}</td>
                                <td>
                                    <button className="btn btn-primary btn-sm me">Editar</button>
                                    <button className="btn btn-danger btn-sm">Eliminar</button>
                                </td>
                            </tr>

                        ))
                    }
                </tbody>
            </table> */}
            <div className="container">
                <div className="row">
                    {
                        listaCategorias.map((categoria) => (

                            <div className="col-4">
                            <div className="card" style={{width: "18rem"}}>
                                <img src={categoria.imagen} className="card-img-top" alt="hola" style={{width : "286" ,height : "171"} }></img>
                                    <div className="card-body">
                                        <h5 className="card-title">{categoria.nombre}</h5>
                                        <p className="card-text">{categoria.descripcion}</p>
                                        <a href="/categorias/form" className="btn btn-primary btn-sm me" >Editar</a>
                                        {/* <button className="btn btn-primary btn-sm me" onclick={href="/categorias/form"}>Editar</button> */}
                                    <button className="btn btn-danger btn-sm" onClick={() => {if(window.confirm('Esta seguro que desea eliminar esta categoria?')){ this.deleteHandler()};}}>Eliminar</button>
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
export default TablaCategorias;