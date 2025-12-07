import "./App.css";
import {Route, Routes } from "react-router-dom";
import Login from "./pages/login.tsx"
import AddUser from "./pages/adduser.tsx"
import Home from "./pages/home.tsx"
import Facturador from "./pages/facturador"
import Controlador from "./pages/controlador"
import Pendientes from "./pages/pendientes";
import Reporte from "./pages/reporte";
import Layout from "./components/ui/layout.tsx";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/adduser" element={<AddUser />} />
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/facturador" element={<Facturador />} />
        <Route path="/controlador" element={<Controlador />} />
        <Route path="/pendientes" element={<Pendientes />} />
        <Route path="/reporte" element={<Reporte />} />
      </Route>
    </Routes>
                    
  )
}

export default App;
