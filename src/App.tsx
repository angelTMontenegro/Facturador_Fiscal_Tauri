import "./App.css";
import {Route, Routes } from "react-router-dom";
import Facturador from "./pages/facturador"
import Controlador from "./pages/controlador"
import Pendientes from "./pages/pendientes";
import Reporte from "./pages/reporte";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Facturador />} />
        <Route path="/controlador" element={<Controlador />} />
        <Route path="/pendientes" element={<Pendientes />} />
        <Route path="/reporte" element={<Reporte />} />
      </Routes>
  )
}

export default App;
