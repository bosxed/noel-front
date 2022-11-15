const publicImgsURL = process.env.PUBLIC_URL + "/imgs/productos/";

function CardProducto({ producto }) {
  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">

          <div id={producto.nombre} className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">

              {
                producto.imagenes.map((imagen) => (
                  <div key={producto._id} className="carousel-item active">
                    <img src={publicImgsURL + imagen} className="img-fluid rounded-start d-block"
                      alt={"Imagen del producto " + producto.nombre} width="75%" />
                  </div>
                ))
              }

            </div>
            <button className="carousel-control-prev" type="button" data-bs-target={"#" + producto.nombre} data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target={"#" + producto.nombre} data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>

        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{producto.nombre}</h5>
            <p className="card-text">
              Marca: {producto.marca}<br />
              Presentación: {producto.presentacion}<br />
              Cantidad: {producto.cantidad}<br />
              Precio: <b>${producto.precio}</b><br />
              Categoría: {producto.categoria}<br />
            </p>
            <p className="card-text"><small className="text-muted">{producto.disponible ? "Disponible" : "No disponible"}</small></p>
            <button className="btn btn-primary">Llevar en mi carrito</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardProducto;