import productosServicios from "../../servicios/productosServicios";
import EstadoDatos from "../../enums/Estados";
import { useState, useEffect } from "react";

const TablaProductos = () => {

  const [productos, setProductos] = useState([]);
  const [estado, setEstado] = useState(EstadoDatos.OK);
  const [criterio, setCriterio] = useState("");
  const [nombreProductoBorrar, setNombreProductoBorrar] = useState("");
  const [productoBorrar, setProductoBorrar] = useState("");

	const cargarProductos = async() => {
		setEstado(EstadoDatos.CARGANDO);
		try {
			let resultado;
			if (criterio === "") {
				resultado = await productosServicios.listarProductos();
			} 
			else {
				resultado = await productosServicios.filtrarProductos(criterio);
			}
			if (resultado.data.length === 0) {
				setEstado(EstadoDatos.VACIO);
			}
			else {
				setProductos(resultado.data);
				setEstado(EstadoDatos.OK)
			}
		} catch (error) {
			setEstado(EstadoDatos.ERROR);
			console.log(error);
		}
	}

	const confirmarBorrado = (id, nombre) => {
		setProductoBorrar(id);
		setNombreProductoBorrar(nombre);
	}

	const borrarProducto = async () => {
		try {
			const resultado = await productosServicios.borrarProducto(productoBorrar);
			cargarProductos();
		} catch (error) {
			console.log(error);
		}
	}

	const cambiarCriterio = (event) => {
		setCriterio(event.target.value);
	}

	const buscarProductos = (event) => {
		event.preventDefault();
		cargarProductos();
	}

	useEffect(()=>{
		cargarProductos();
	}, [])

    return (
      <div className="ms-5 me-5 position-relative">
        <h4 className="mb-4"><i className="bi bi-bookmark-star me-2"></i>Lista Productos
        </h4>
        <div className="position-absolute top-0 end-0">
          <a href="/productos/form" className="btn btn-primary btn-sm ms-5" title="Agregar nueva categoría"><b>Agregar producto</b></a>
        </div>
        <div className="input-group input-group-sm mb-3">
          <input onChange={cambiarCriterio} value={criterio} type="text" className="form-control" placeholder="Buscar" aria-label="Busqueda con filtro"
            aria-describedby="buscar" />
          <button onClick={buscarProductos} className="btn btn-primary" type="button" id="buscar"><i className="bi bi-search ms-4 me-4"></i></button>
        </div>
        <table className="table table-sm table-bordered align-middle">
          <thead>
            <tr className="table-brown" align="center" >
            
            <th>Codigo</th>
            <th>Nombre</th>
            <th>Marca</th>
						<th>Categoria</th>
						
						<th>Precio</th>
						<th>Costo</th>
            <th>Disponible</th>
            <th>Imagen</th>
            <th>Descripción</th>
            <th>Acciones</th>

            </tr>
          </thead>
          <tbody>
            {
              estado === EstadoDatos.CARGANDO ?
                (
                  <tr>
                    <td align="center" colSpan="5">
                      <div className="spinner-grow text-primary me-2" role="status">
                        <span className="visually-hidden">Cargando...</span>
                      </div>
                    </td>
                  </tr>
                ) :
                estado === EstadoDatos.ERROR ?
                  (
                    <tr>
                      <td align="center" colSpan="5">
                        Error. Por favor intente más tarde.
                      </td>
                    </tr>
                  ) :
                  estado === EstadoDatos.VACIO ?
                    (
                      <tr>
                        <td align="center" colSpan="5">
                          No se encontraron datos.
                        </td>
                      </tr>
                    ) :
                    (
                      productos.map((producto) => (
                        
                        <tr key={producto._id}>
                          <td>{producto.codigo}</td>
                          
                          <td>{producto.nombre}</td>
                          <td>{producto.marca}</td>
                          <td>{producto.categoria}</td>
											    
											    <td>${producto.precio}</td>
                          <td>${producto.costo}</td>
											    <td>{producto.disp ? "Si" : "No"}</td>
                          <td>{producto.imagen}</td>
                          <td>{producto.descripcion}</td>
											   
                            <td className="text-center">
                             <div className="btn-group" role="group" aria-label="Acciones">
                              <a title="Editar" href={"/productos/form/" + producto._id} type="button"
                                className="btn btn-outline-primary btn-sm"><i className="bi bi-pencil"></i>
                              </a>
                              <button title="Eliminar" onClick={() => confirmarBorrado(producto._id, producto.nombre)} type="button"
                                className="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#modalBorrar">
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )
            }
          </tbody>
        </table>
  
        <div className="modal fade" id="modalBorrar" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title" id="staticBackdropLabel"><i className="bi bi-exclamation-octagon-fill me-3"></i>Alerta de eliminación</h3>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                ¿Está seguro de que desea eliminar el producto {borrarProducto}?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" onClick={nombreProductoBorrar} className="btn btn-danger" data-bs-dismiss="modal">Eliminar</button>
              </div>
            </div>
          </div>
        </div>
  
      </div>
    )
  }

export default TablaProductos;