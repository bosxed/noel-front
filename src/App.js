import Header from "./componentes/general/Header";
import Banner from "./componentes/general/Banner";
import Footer from "./componentes/general/Footer";
import TablaCategorias from "./componentes/categorias/TablaCategorias";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FormCategorias from "./componentes/categorias/FormCategorias";
import TablaUsuarios from "./componentes/usuarios/TablaUsuarios";
import FormUsuarios from "./componentes/usuarios/FormUsuarios";
import TablaProductos from "./componentes/productos/TablaProductos";
import FormProductos from "./componentes/productos/FormProductos";
import MostradorProductos from "./componentes/productos/mostradorProducto";

const App = () => {
  return (
    <div >
      <Header></Header>

 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Banner/>} exact  ></Route>
          <Route path="/categorias" element={<TablaCategorias />} exact  ></Route>
          <Route path="/categorias/form" element={<FormCategorias />} exact  ></Route>
          <Route path="/categorias/form/:id" element={<FormCategorias />} exact  ></Route>
          <Route path="/usuarios" element={<TablaUsuarios />} exact  ></Route>
          <Route path="/usuarios/form" element={<FormUsuarios />} exact  ></Route>
          <Route path="/usuarios/form/:id" element={<FormUsuarios />} exact  ></Route>


          <Route path="/productos/cliente" element={<MostradorProductos />} exact />
          <Route path="/productos" element={<TablaProductos />} exact  ></Route>
          <Route path="/productos/form" element={<FormProductos/>} exact  ></Route>
          <Route path="/productos/form/:id" element={<FormProductos />} exact  ></Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
