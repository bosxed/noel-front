import Header from "./general/Header.js";
import Banner from "./general/Banner.js";
import Footer from "./general/Footer";
import Categorias from "./categorias/Categorias.js";
import {BrowserRouter, Route, Routes} from "react-router-dom";

const App = () => {
  return (
    <div >
      <Header></Header>
      <Banner></Banner>

     <BrowserRouter>
     <Routes>
      {/* <Route path="/" element={Banner} exact  ></Route> */}
      <Route path="/categorias/categorias" element={<Categorias />} exact  ></Route> 
    </Routes>
     </BrowserRouter> 
    <Footer/>
    </div>
  );
}

export default App;
