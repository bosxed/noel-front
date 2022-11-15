import * as React from 'react';
import usuarioServicios from '../../servicios/usuarioServicios';
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import userEvent from '@testing-library/user-event';
const FormUsuarios = (accion) => {
    // const [checked, setChecked] = React.useState(false);

    const navigateTo = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [rol, setRol] = useState("");
    const [imagen, setImagen] = useState("");
    const [titulo, setTitulo] = useState("");

    let mensaje = '';
    if (accion === 'editar') {
        mensaje = 'Usuario';
    }
    else {
        mensaje = 'Usuario Nuevo';
    }

    const guardarUsuario = async (event) => {
        event.preventDefault();

        try {
            const usuarioDatos = {
                nombre: nombre,
                apellido: apellido,
                correo: correo,
                contrasena: contrasena,
                rol: rol,
                imagen: imagen
            }
            console.log(usuarioDatos);
            if (id == null) {
                const respuesta = await usuarioServicios.guardarUsuario(usuarioDatos);
                setTitulo("Registro");
            }
            else {
                const respuesta = await usuarioServicios.editarUsuario(id, usuarioDatos);
                setTitulo("Edición");
            }

            navigateTo("/usuarios");
        } catch (error) {
            console.log("Ocurrio un error: " + error);
        }
    };

    const cargarUsuario = async () => {
        try {
            const respuesta = await usuarioServicios.cargarUsuario(id);
            if (respuesta.status === 200) {
                setNombre(respuesta.data.nombre);
                setApellido(respuesta.data.apellido);
                setCorreo(respuesta.data.correo);
                setContrasena(respuesta.data.contrasena);
                setRol(respuesta.data.rol);
                setImagen(respuesta.data.imagen);
            }
        } catch (error) {
            console.log("Ocurrió un error. " + error);
        }
    }

    const cambiarNombre = (event) => {
        setNombre(event.target.value);
    }

    const cambiarApellido = (event) => {
        setApellido(event.target.value);
    }

    const cambiarCorreo = (event) => {
        setCorreo(event.target.value);
    }

    const cambiarContrasena = (event) => {
        setContrasena(event.target.value);
    }

    const cambiarRol = (event) => {
        setRol(event.target.value);
    }
    const cambiarImagen = (event) => {
        setImagen(event.target.value);
    }

    useEffect(() => {
        if (id != null) {
            setTitulo("Editar");
            cargarUsuario();
        }
        else {
            setTitulo("Nuevo");
        }
    }, [])
    return (
        <div className="container">
            <h3>{mensaje}</h3>
            <form action="POST">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                        Ingrese su nombre
                        <input className="form-control form-control-sm" type="text" placeholder="nombre" name="nombre" id="nombre" onChange={cambiarNombre} value={nombre} />
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                        Ingrese su apellido
                        <input className="form-control form-control-sm" type="text" placeholder="apellido" name="apellido" id="apellido" onChange={cambiarApellido} value={apellido} />
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                        Ingrese su correo electronico
                        <input className="form-control form-control-sm" type="email" placeholder="correo" name="correo" id="correo" onChange={cambiarCorreo} value={correo} />
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                        Ingrese una constraseña de al menos 6 caracteres.
                        <input className="form-control form-control-sm" type="password" placeholder="contrasena" name="contrasena" id="contrasena" onChange={cambiarContrasena} value={contrasena} />
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                        Ingrese su rol de usuario
                        <select class="form-select" aria-label="Default select example" name="rol" id="rol" onChange={cambiarRol} value={rol}>
                            <option selected>Seleccione su rol</option>
                            <option value="Cliente">Cliente</option>
                            <option value="Administrador">Administrador</option>
                        </select>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                        Ingrese la ruta de la foto del usuario
                        <input className="form-control form-control-sm" type="text" placeholder="imagen" name="imagen" id="imagen" onChange={cambiarImagen} value={imagen} />
                    </div>
                    <br></br>
                    <br></br>
                    <div className="row">
                        <div className="col-3">
                            <input className="btn btn-sm btn-info" type="submit" value="Guardar" onClick={guardarUsuario} />
                            {/* <a href="/" className="btn btn-sm btn-info">Guargar</a> */}
                            <a href="/usuarios" className="btn btn-sm btn-danger">Cancelar</a>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default FormUsuarios;