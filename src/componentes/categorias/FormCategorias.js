import * as React from 'react';
const FormCategorias = (accion)=> {   
      const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };
    let mensaje='';
    if  (accion === 'editar')
    {
        mensaje='Categoria';
    }
    else {
        mensaje='Categoria Nueva';
    }
    return (
        <div className="container">
            <h3>{mensaje}</h3>
            <form action ="POST">
                <div className="row">
                <div className="col-4">
                    Ingrese el nombre de la categoria
                    <input className="form-control form-control-sm" type="text" placeholder="nombre" name="nombre" id="nombre"/>
                </div>
                <div className="col-4">
                    Ingrese la descripcion de la categoria
                    <input className="form-control form-control-sm" type="text" placeholder="descripcion" name="descripcion" id="descripcion"/>
                </div>
                <div className="col-4">
                    Ingrese la ruta de la imagen de la categoria
                    <input className="form-control form-control-sm" type="text" placeholder="imagen" name="imagen" id="imagen"/>
                </div>
                <div className="col-4">
                    Ingrese el estado de la categoria
                    <input className='from-control' type="checkbox" value="Estado" name="estado" id="estado" checked={checked} onChange={handleChange}/>  
                    {/* <input className="form-control form-control-sm" type="checkbox" id="estado" name="estado" value="Estado" checked={checked} onChange={handleChange}/> */}
                </div>
                <br></br>
                <br></br>
                <div className="row">
                <div className="col-3">
                <input className="btn btn-sm btn-info" type="submit" value="Guardar"/>
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