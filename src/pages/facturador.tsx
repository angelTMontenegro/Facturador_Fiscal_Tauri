import Menu from "../components/ui/menu";
import { invoke } from "@tauri-apps/api/core";
import { useState, useEffect } from "react";
import Boton from "../components/ui/botones";
import BuscadorModalProducto from "../components/ui/buscador";
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
    <div className="divPrincipal">
      <Menu />
      <div className="menuFacturador">
        <div className="menuLeft">
          <div className="infoCliente">
            <label className="labelInfoSale">Cliente</label>
            <input type="text" className="inputInfoSale" readOnly />
            <label className="labelInfoSale">Domicilio</label>
            <input type="text" className="inputInfoSale" readOnly />
            <label className="labelInfoSale">Condición</label>
            <input type="text" className="inputInfoSale" readOnly />
            <label className="labelInfoSale">Categoria IVA</label>
            <input type="text" className="inputInfoSale" readOnly />
            <label className="labelInfoSale">Documento</label>
            <input type="text" className="inputInfoSale" readOnly />
          </div>

          <label className="items">Items del comprobante</label>
          <div className="divVentas">
            <div className="divItem">
              <label className="labelItem">Articulo</label>
              <label className="labelItem">Cantidad</label>
              <label className="labelItem">Precio</label>
              <label className="labelItem">Subtotal</label>
            </div>

            <div className="inputDiv">
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
          </div>

          {/* Total y botón confirmar */}
          <div className="foot">
            <label>Total</label>
            <input type="text" value={`$${total}`} readOnly />
          </div>
          <Boton
            texto="Confirmar venta"
            click={confirmarVenta}
            nameC="botonIngresarVenta"
          />
        </div>

        <div className="menuRight">
          <label>prueba</label>
        </div>
      </div>

      {/* Modal buscador */}
      <BuscadorModalProducto
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={(p) => setSelected(p)}
      />
    </div>
  );
}

export default Facturador;
