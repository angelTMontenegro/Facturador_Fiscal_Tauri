import "./footer.css"
import { useState, useEffect } from "react"

export function Reloj(){
    const [fecha, setFecha] = useState(new Date());

    useEffect(()=>{
        const timer = setInterval(()=> {
            setFecha(new Date()); 
        }, 1000);


    return () => clearInterval(timer);
  }, []);

  return fecha;
}

export default function Foot(){

    const fecha = Reloj()

    return(
        <section className="Foot">
            <label>Usuario:</label>
            <input type="text" />
            <label>PC:</label>
            <input type="text" />
            <label>Puesto:</label>
            <input type="text" />
            <label>Hora: {fecha.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</label>
            <input type="text" />
            <label>Fecha: {fecha.toLocaleDateString()}</label>
            <input type="text" />
        </section>
    )

}