import "./controlador.css"
import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

function Facturador(){

    const [stock, setStock] = useState({
        nameStock: "",
        price:"0",
        stockQuantity:"0",
        description:""
    })

    async function add_stock(name: string, price: string, stock: string, description: string) {
        try {
                const insertedId = await invoke<number>("add_stock", {
                name: name,
                price: Number(price),
                stock: Number(stock)
                });
                console.log("ID insertado:", insertedId);
            } catch (err) {
                console.error("Error al agregar producto:", err);
            }
            }

    const handlenameInput = (e: React.ChangeEvent<HTMLInputElement> ) => {
        setStock({...stock, nameStock: e.target.value})
    }
    
    const handlepriceInput = (e: React.ChangeEvent<HTMLInputElement> ) => {
        setStock({...stock, price: e.target.value})
    }

    const handleamountInput = (e: React.ChangeEvent<HTMLInputElement> ) => {
        setStock({...stock, stockQuantity: e.target.value})
    }

    const handledescriptionInput = (e: React.ChangeEvent<HTMLInputElement> ) => {
        setStock({...stock, description: e.target.value})
    }

    return (
        <main className="controlador">

            <section className="stock">

                <form action="" className="formStock">

                    <label htmlFor="nombreStock">Nombre: </label>

                    <input 
                    type="text" 
                    id="nombreStock" 
                    onChange={handlenameInput}
                    />

                    <label>Precio:</label>

                    <input type="number" 
                    id="precioStock" 
                    onChange={handlepriceInput}
                    />    

                    <label>Cantidad disponible:</label>

                    <input type="number" 
                    id="amountStock" 
                    onChange={handleamountInput}
                    />    

                    <label>Descripción:</label>

                    <input type="text" 
                    id="descriptionStock" 
                    onChange={handledescriptionInput}
                    />    
                    
                    <button 
                        onClick={() => add_stock(stock.nameStock, stock.price, stock.stockQuantity, stock.description)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="16"/>
                        <line x1="8" y1="12" x2="16" y2="12"/>
                        </svg>
                        Actualizar stock
                    </button>   

                </form>

                
                <section className="controladorStock">

                    <label>Vista previa del contenido en stock: </label>

                </section>          

            </section>
            
            <section className="editarStock">
                <button>Editar stock.</button>
                <div>

                </div>    
            </section>

        </main>
    )
}

export default Facturador