import "./controlador.css"
import Boton from "../components/ui/botones";
import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

function Facturador(){

    const [stock, setStock] = useState({
        nameStock: "",
        price:"0",
        stockQuantity:"0",
        description:""
    })

    async function add_stock(name: string, price: string, stock: string) {
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
        <div>
            <div className="menuShop">
                <form action="">
                    <h1>Agregar producto</h1>
                    <div className="fila">
                        <label htmlFor="nombreStock">Nombre: </label>
                        <input 
                        type="text" 
                        id="nombreStock" 
                        onChange={handlenameInput}
                        />
                    </div>
                    <div className="fila">
                        <p>Precio</p>
                        <input type="number" 
                        id="precioStock" 
                        onChange={handlepriceInput}
                        />    
                    </div>
                    <div className="fila">
                        <p>Stock</p>
                        <input type="number" 
                        id="amountStock" 
                        onChange={handleamountInput}
                        />    
                    </div>
                    <div className="fila">
                        <p>Descripción</p>
                        <input type="text" 
                        id="descriptionStock" 
                        onChange={handledescriptionInput}
                        />    
                    </div>
                </form>                
                <Boton 
                nameC=""
                texto= "Actualizar stock" 
                 
                click= {() => add_stock(stock.nameStock, stock.price, stock.stockQuantity)}
                />  

            </div>
            
        </div>
    )
}

export default Facturador