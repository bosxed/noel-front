// import icon from '../../imgs/*';
const Header = () => {
    return (
        <div className="container">
            <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                    {/* <svg className="bi me-2" width="40" height="32"><img href={icon} /></svg> */}
                    <span className="fs-4">Noel Dulceria Online</span>
                </a>

                <ul className="nav nav-pills">
                    <li className="nav-item"><a href="/" className="nav-link active" aria-current="page">Home</a></li>
                    <li className="nav-item"><a href="/categorias" className="nav-link">Categorias</a></li>
                    <li className="nav-item"><a href="/" className="nav-link">Productos</a></li>
                    <li className="nav-item"><a href="/usuarios" className="nav-link">Usuarios</a></li>
                    <li className="nav-item"><a href="/" className="nav-link">About</a></li>
                </ul>
            </header>
        </div>
    )
}

export default Header;
