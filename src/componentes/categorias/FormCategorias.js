import * as React from 'react';
import categoriaServicios from '../../servicios/categoriaServicios';
import {useNavigate} from "react-router-dom"
import { useEffect, useState,useParams } from "react";
import userEvent from '@testing-library/user-event';
const FormCategorias = (accion) => {
    // const [checked, setChecked] = React.useState(false);

    const navigateTo =useNavigate();
    const {id}= useParams();
    const [nombre, setNombre] = useState("");
    const [description, setDescription] = useState("");
    const [estado, setEstado] = useState(false);
    const [imagen, setImagen] = useState("");
    const [ titulo, setTitulo ] = useState("");
    // const handleChange = () => {
    //     setChecked(!checked);
    // };
    let mensaje = '';
    if (accion === 'editar') {
        mensaje = 'Categoria';
    }
    else {
        mensaje = 'Categoria Nueva';
    }

    const guardarCategoria = async (event) => {
        event.preventDefault();

        try {
            const categoriaDatos = {
                nombre: nombre,
                description: description.FormCategorias,
                estado: estado,
                imagen:imagen

            }
            console.log(categoriaDatos);
            if (id == null){
                const respuesta = await categoriaServicios.guardarCategoria(categoriaDatos);
            }
            else{
                const respuesta = await categoriaServicios.EditarCategoria(id,categoriaDatos);
            }

        navigateTo("/categorias");
        } catch (error) {
            console.log("Ocurrio un error: " + error);
        }
    };

    const cargarCategoria = async () => {
        try {
            const respuesta = await categoriaServicios.cargarCategoria(id);
            if (respuesta.status === 200) {
                setNombre(respuesta.data.nombre);
                setDescription(respuesta.data.description);
                setEstado(respuesta.data.estados);
                setImagen(respuesta.data.imagen);
            }
        } catch (error) {
            console.log("Ocurrió un error. "+error);
        }
    }

    const cambiarNombre = (event) => {
        setNombre(event.target.value);
    }

    const cambiarDescription = (event) => {
        setDescription(event.target.value);
    }
    const cambiarImagen = (event) => {
        setImagen(event.target.value);
    }

    const cambiarEstado = (event) => {
        setEstado(event.target.value);
    }

    useEffect(()=> {
        if (id != null) {
            setTitulo("Editar");
            cargarCategoria();
        }
        else {
            setTitulo("Nueva");
        }
    }, [])
    return (
        <div className="container">
            <h3>{mensaje}</h3>
            <form action="POST">
                <div className="row">
                    <div className="col-4">
                        Ingrese el nombre de la categoria
                        <input className="form-control form-control-sm" type="text" placeholder="nombre" name="nombre" id="nombre" onChange={cambiarNombre} />
                    </div>
                    <div className="col-4">
                        Ingrese la descripcion de la categoria
                        <input className="form-control form-control-sm" type="text" placeholder="descripcion" name="descripcion" id="descripcion" onChange={cambiarDescription} />
                    </div>
                    <div className="col-4">
                        Ingrese la ruta de la imagen de la categoria
                        <input className="form-control form-control-sm" type="text" placeholder="imagen" name="imagen" id="imagen" onChange={cambiarImagen} />
                    </div>
                    <div className="col-4">
                        Ingrese el estado de la categoria
                        <input className='from-control' type="checkbox" value="Estado" name="estado" id="estado" checked={estado} onChange={cambiarEstado} />
                        {/* <input className="form-control form-control-sm" type="checkbox" id="estado" name="estado" value="Estado" checked={checked} onChange={handleChange}/> */}
                    </div>
                    <br></br>
                    <br></br>
                    <div className="row">
                        <div className="col-3">
                            <input className="btn btn-sm btn-info" type="submit" value="Guardar" onClick={guardarCategoria} />
                            {/* <a href="/" className="btn btn-sm btn-info">Guargar</a> */}
                            <a href="/categorias" className="btn btn-sm btn-danger">Cancelar</a>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default FormCategorias;