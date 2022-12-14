import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productosServicios from "../../servicios/productosServicios";

const FormProductos = () => {

    const goTo = useNavigate();
    const { id } = useParams();

    const [nombre, setNombre] = useState("");
    const [marca, setMarca] = useState("");
    const [codigo, setcodigo] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [precio, setPrecio] = useState("");
    const [costo, setCosto] = useState("");
    const [descripcion, setdescripcion] = useState([""]);
    const [disponible, setDisponible] = useState(false);
    const [categoria, setCategoria] = useState("");
    const [imagenes, setImagenes] = useState([""]);
    const publicImgsURL = process.env.PUBLIC_URL+"/imgs/";
    const [titulo, setTitulo] = useState("");
    const [icono, setIcono] = useState("");

    const guardarProducto = async (event) => {
        event.preventDefault();
        try {
            const datosProducto = {
                
                nombre: nombre,
                codigo: codigo,
                marca: marca,
                categoria: categoria,
                precio: precio,
                costo: costo,
                disp: disponible,
                descripcion: descripcion,
                imagen: imagenes
            }
            console.log(datosProducto);
            // console.log(id);
            if (id == null) {
                const respuesta =  await productosServicios.guardarProducto(datosProducto);
            } else {
                const respuesta =  await productosServicios.modificarProducto(id, datosProducto);
            }
            goTo("/productos");
        } catch (error) { 
            console.log(error);
        }
    };

    const cargarProducto = async () => {
        try {
            const respuesta = await productosServicios.cargarProducto(id);
            if (respuesta.status === 200) {
                
                setNombre(respuesta.data.nombre);
                setMarca(respuesta.data.marca);
                setcodigo(respuesta.data.codigo);
                setCantidad(respuesta.data.cantidad);
                setPrecio(respuesta.data.precio);
                setCosto(respuesta.data.costo);
                setdescripcion(respuesta.data.descripcion);
                setDisponible(respuesta.data.disponible);
                setCategoria(respuesta.data.categoria);
                setImagenes(respuesta.data.imagen);
            }
        } catch (error) {
            console.log("Ocurri?? un error. " + error);
        }
    };

    useEffect(() => {
        if (id != null) {
            setTitulo("Editar");
            setIcono("pencil-square")
            cargarProducto();
        } else {
            setTitulo("Nuevo");
            setIcono("bookmark-plus")
        }
    }, []);

    

    const cambiarNombre = (event) => {
        setNombre(event.target.value);
    };

    const cambiarMarca = (event) => {
        setMarca(event.target.value);
    };

    const cambiarcodigo = (event) => {
        setcodigo(event.target.value);
    };

    const cambiarCantidad = (event) => {
        setCantidad(event.target.value);
    };

    const cambiarPrecio = (event) => {
        setPrecio(event.target.value);
    };

    const cambiarCosto = (event) => {
        setCosto(event.target.value);
    };

    const cambiardescripcion = (event) => {
        setdescripcion(event.target.value);
    };

    const cambiarDisponible = (event) => {
        setDisponible(event.target.checked);
    };

    const cambiarCategoria = (event) => {
        setCategoria(event.target.value);
    };

    const cambiarImagenes = (event) => {
        setImagenes(event.target.value);
    };

    return (
        <form className="container col-6" onSubmit={guardarProducto} >
            <h4 className="py-3 text-center"><i className={"bi bi-" + icono + " me-2"}></i>{titulo} producto</h4>
            <div className="mb-3">
                <label htmlFor="codigo" className="form-label" >Codigo:</label>
                <input type="text" className="form-control" onChange={cambiarcodigo} value={codigo} id="codigo" rows="3"
                    placeholder="Ingrese aqu?? el codigo " name="codigo" required ></input>
            </div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label" >Producto:</label>
                <input type="text" className="form-control" onChange={cambiarNombre} name="nombre" id="nombre" value={nombre}
                    aria-label="nombre" aria-describedby="nombre" placeholder="Ingrese aqu?? el producto" required />
            </div>
            <div className="mb-3">
                <label htmlFor="marca" className="form-label" >Marca:</label>
                <input type="text" className="form-control" onChange={cambiarMarca} value={marca} id="marca" rows="3"
                    placeholder="Ingrese aqu?? la marca" name="marca" required ></input>
            </div>
            <div className="mb-3">
                <label htmlFor="categoria" className="form-label" >Categoria:</label>
                <input type="text" className="form-control" onChange={cambiarCategoria} value={categoria} id="categoria" rows="3"
                    placeholder="Ingrese aqu?? la categoria" name="categoria" required></input>
            </div>
            <div className="mb-3">
                <label htmlFor="precio" className="form-label" >Precio:</label>
                <input type="text" className="form-control" onChange={cambiarPrecio} value={precio} id="precio" rows="3"
                    placeholder="Ingrese aqu?? el precio" name="precio" required ></input>
            </div>
            <div className="mb-3">
                <label htmlFor="costo" className="form-label" >Costo:</label>
                <input type="text" className="form-control" onChange={cambiarCosto} value={costo} id="costo" rows="3"
                    placeholder="Ingrese aqu?? el costo" name="costo" required ></input>
            </div>
            {/* <div className="mb-3">
                <label htmlFor="cantidad" className="form-label" >Cantidad:</label>
                <input type="text" className="form-control" onChange={cambiarCantidad} value={cantidad} id="cantidad" rows="3"
                    placeholder="Ingrese aqu?? la cantidad" name="cantidad" required ></input>
            </div> */}
            <div className="mb-3">
                <label htmlFor="imagenes" className="form-label">Im??genes:</label>
                <input className="form-control" onChange={cambiarImagenes} value={imagenes} type="text" id="imagenes" name="imagenes"
                    placeholder="Ingrese el nombre de la im??gen" />
            </div>
            <div className="mb-3">
                <label htmlFor="descripcion" className="form-label" >Descripcion:</label>
                <input type="text" className="form-control" onChange={cambiardescripcion} value={descripcion} id="descripcion" rows="3"
                    placeholder="Ingrese aqu?? la descripcion" name="descripcion" ></input>
            </div>
            {/* <div className="col-3">
                    <img className="form-control"  src={publicImgsURL+imagenes} alt="Ingrese imagen de carpeta p??blica" width="100%"/>
            </div>  */}
            <div className="form-check">
                <input className="form-check-input" type="checkbox" onChange={cambiarDisponible} checked={disponible}
                    id="disponible" name="disponible" />
                <label className="form-check-label" htmlFor="disponible">Disponible</label>
            </div>
            <div className="py-4 text-center">
                {/* <button className="btn btn-primary me-2">Guardar</button> */}
                <input className="btn btn-primary me-2" type="submit" value="Guardar" onClick={guardarProducto} />
                <a href="/productos" className="btn btn-dark">Cancelar</a>
            </div>
        </form>
        
        
    )
}

export default FormProductos;