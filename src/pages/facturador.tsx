import { invoke } from "@tauri-apps/api/core";
import { useState, useEffect } from "react";
import Boton from "../components/ui/botones";
import BuscadorModalProducto from "../components/buscador.tsx";
import "./facturador.css";

type Producto = {
  name: string;
  price: number;
  stock: number;
};

function Facturador() {
  // Carrito de productos seleccionados
  const [cart, setCart] = useState<{ name: string; price: number; quantity: number }[]>([]);
  
  // Producto seleccionado temporalmente
  const [selected, setSelected] = useState<Producto | null>(null);
  
  // Cantidad del producto seleccionado
  const [quantity, setQuantity] = useState(1);

  // Modal de buscador
  const [modalVisible, setModalVisible] = useState(false);

  // Total de la venta
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Agregar producto al carrito
  const addToCart = () => {
    if (!selected) return;
    if (quantity < 1) return;

    setCart([...cart, { name: selected.name, price: selected.price, quantity }]);
    setSelected(null);
    setQuantity(1);
  };

  // Confirmar venta: enviar carrito al backend
  const confirmarVenta = async () => {
    try {
      const items = cart.map(item => [item.name, item.quantity]);
      const saleId = await invoke<number>("add_sale", { items });
      alert(`Venta registrada (ID: ${saleId})`);
      setCart([]);
    } catch (err) {
      console.error("Error al agregar venta:", err);
    }
  };

  return (
    <main className="facturador">

      <section className="menuLeft">
        
        <section className="clientCard">
          <label>Cliente</label>
          <input type="text" readOnly />
          <label>Domicilio</label>
          <input type="text" readOnly />
          <label>Condición</label>
          <input type="text" readOnly />
          <label>Categoria IVA</label>
          <input type="text" readOnly />
          <label>Documento</label>
          <input type="text" readOnly />
        </section>

        <label className="items">Items del comprobante</label>
        
        <section className="salesCard">
          <div className="salesCardLabel">
            <label>Articulo</label>
            <label>Cantidad</label>
            <label>Precio</label>
            <label>Subtotal</label>
          </div>

          <div className="salesCardOptions">
            {/* Botón para abrir modal */}
            <button type="button" onClick={() => setModalVisible(true)}>
              {selected ? selected.name + ` — $${selected.price}` : "Seleccionar producto"}
            </button>

            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min={1}
              max={selected?.stock || 1}
            />
            <button type="button" onClick={addToCart}>
              Agregar
            </button>
          </div>

          {/* Mostrar carrito */}
          {cart.map((item, i) => (
            <div key={i} className="divItem">
              <span>{item.name}</span>
              <span>{item.quantity}</span>
              <span>${item.price}</span>
              <span>${item.price * item.quantity}</span>
            </div>
          ))}
        </section>

        {/* Total y botón confirmar */}
        <section className="totalsCard">
          <h3>Totales</h3>
          <div className="labelInputTotals">

            <label>Neto e iva</label>
            <input type="text" />
            <label>Impuestos</label>
            <input type="text" />
            <label>Percepciones</label>
            <input type="text" />
            <label>No gravado</label>
            <input type="text" />
            <label>Gravado</label>
            <input type="text" />
            <label>Total</label>
            <input type="text" value={`$${total}`} readOnly />  
          </div>
          
          <div className="botonTotals">
          <Boton
            texto="Confirmar venta"
            click={confirmarVenta}
            nameC="botonIngresarVenta"
          />
          </div>
        </section>
      </section>

      <div className="menuRight">
        <label>prueba</label>
      </div>
      

      {/* Modal buscador */}
      <BuscadorModalProducto
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={(p) => setSelected(p)}
      />
     
    </main>
  );
}

export default Facturador;
