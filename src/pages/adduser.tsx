import "./adduser.css"
import { useNavigate } from "react-router-dom";

export default function AddUser(){
    const navigate = useNavigate();

    return(
        <main className="adduser">
            <section className="adduserCard">

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-label="Icono de usuario" className="adduserIconUser">
                    <title>Usuario</title>
                    <g fill="currentColor" fillRule="evenodd">
                    <circle cx="12" cy="7.5" r="3.5"/>
                    <path d="M3 20c0-3.866 3.582-7 9-7s9 3.134 9 7v1H3v-1z"/>
                    </g>
                </svg>

                <div className="adduserUser">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-label="Icono de usuario" className="adduserIconUser2">
                    <title>Usuario</title>
                    <g fill="currentColor" fillRule="evenodd">
                    <circle cx="12" cy="7.5" r="3.5"/>
                    <path d="M3 20c0-3.866 3.582-7 9-7s9 3.134 9 7v1H3v-1z"/>
                    </g>
                    </svg>

                    <input type="text" placeholder="Nombre de usuario"/>    
                
                </div>

                <div className="adduserUser">

                    <input type="text" placeholder="Confirmar nombre de usuario"/>    

                </div>

                <div className="adduserPasword">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="adduserIconLock">
                        <g fill="currentColor">
                        <path d="M17 9h-1V7a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2Zm-6 7.732V17a1 1 0 0 0 2 0v-.268a2 2 0 1 0-2 0ZM9 9V7a3 3 0 0 1 6 0v2H9Z"/>
                        </g>
                    </svg>

                    <input type="text" placeholder="Contraseña"/>
                    
                </div>

                <div className="adduserPasword">

                    <input type="text" placeholder="Confirmar contraseña"/>
                    
                </div>
                
                <button className ="botonAddUser" onClick={() => navigate("/")}>Crear usuario</button>
            </section>
        </main>
    )
}