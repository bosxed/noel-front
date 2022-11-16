import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import EstadoDatos from "../../enums/Estados";
import productosServicios from "../../servicios/productosServicios";
import CardProducto from "./CardProducto";

function MostradorProductos() {
  const query = useLocation();

  const [estado, setEstado] = useState(EstadoDatos.OK);
  const [productos, setProductos] = useState([]);
  const [criterio, setCriterio] = useState("");

  async function cargarProductos(categoria = "") {
    setEstado(EstadoDatos.CARGANDO);
    try {
      let resultado;
      if (criterio !== "") {
        resultado = await productosServicios.buscarEntreDisponibles(criterio);
      } else if (categoria !== "") {
        resultado = await productosServicios.buscarEntreDisponibles(categoria);
      } else {
        resultado = await productosServicios.buscarProductosDisponibles();
      }
      if (resultado.data.length === 0) {
        setEstado(EstadoDatos.VACIO);
      } else {
        setProductos(resultado.data);
        setEstado(EstadoDatos.OK);
      }
    } catch (error) {
      setEstado(EstadoDatos.ERROR);
    }
  }

  function cambiarCriterio(event) {
    setCriterio(event.target.value);
  }

  function buscarProductos(event) {
    event.preventDefault();
    cargarProductos();
  }

  useEffect(() => {
    const categoria = query.search.replace("?q=", "");
    cargarProductos(categoria);
  }, []);

  return (
      <div id="catalogo" className="container">
        <div className="input-group mb-3 mt-3">
          <input type="text" className="form-control" id="buscar" value={criterio} onChange={cambiarCriterio}
            placeholder="Buscar productos" aria-label="Buscar" aria-describedby="buscar" />
          <button className="btn btn-primary" type="button" onClick={buscarProductos}>
            <i className="bi bi-search ms-4 me-4" />
          </button>
        </div>
        <div className="row mb-2">
          {
            estado === EstadoDatos.CARGANDO ? (<div>Cargando...</div>)
              :
              estado === EstadoDatos.VACIO ? (<div>No hay datos</div>)
                :
                productos.map((producto) => (
                  (<CardProducto key={producto._id} producto={producto} />)
                ))
          }
        </div>
      </div>
  )
}

export default MostradorProductos;