import Header from "./componentes/general/Header";
import Banner from "./componentes/general/Banner";
import Footer from "./componentes/general/Footer";
import TablaCategorias from "./componentes/categorias/TablaCategorias";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FormCategorias from "./componentes/categorias/FormCategorias";

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
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
