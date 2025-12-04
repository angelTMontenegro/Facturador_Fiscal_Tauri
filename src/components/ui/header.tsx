import { useNavigate, useLocation } from "react-router-dom";
import Boton from "./botones";
import "./header.css";

export default function Menu() {
    const navigate = useNavigate();
    const location = useLocation();

    // función que ayuda a comparar ruta
    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="Menu">
            <Boton texto="Home"        nameC={`menuBoton ${isActive("/home")        ? "activo" : ""}`} click={() => navigate("/home")} />
            <Boton texto="Controlador" nameC={`menuBoton ${isActive("/controlador") ? "activo" : ""}`} click={() => navigate("/controlador")} />
            <Boton texto="Facturador"  nameC={`menuBoton ${isActive("/facturador")  ? "activo" : ""}`} click={() => navigate("/facturador")} />
            <Boton texto="Pendientes"  nameC={`menuBoton ${isActive("/pendientes")  ? "activo" : ""}`} click={() => navigate("/pendientes")} />
            <Boton texto="Reportes"    nameC={`menuBoton ${isActive("/reporte")     ? "activo" : ""}`} click={() => navigate("/reporte")} />
            <Boton texto="Login"       nameC={`menuBoton ${isActive("/")            ? "activo" : ""}`} click={() => navigate("/")} />
        </div>
    );
}
