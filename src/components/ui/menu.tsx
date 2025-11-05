import { useNavigate } from "react-router-dom";
import Boton from "./botones"
import "./menu.css"

export default function Menu(){
    const navigate = useNavigate();

    return (
        <div className="Menu">
            <Boton texto="Controlador" nameC="menuBoton" click={() => navigate("/controlador")}/>
            <Boton texto="Facturador" nameC="menuBoton" click={() => navigate("/")}/>
            <Boton texto="Pendientes" nameC="menuBoton" click={() => navigate("/pendientes")}/>
            <Boton texto="Reportes" nameC="menuBoton" click={() => navigate("/reporte")}/>  
        </div>
    )
}
