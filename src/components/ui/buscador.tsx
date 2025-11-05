import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./buscador.css";

type Producto = {
  name: string;
  price: number;
  stock: number;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelect: (producto: Producto) => void;
};

export default function BuscadorModalProducto({ visible, onClose, onSelect }: Props) {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [search, setSearch] = useState("");

  // Cargar productos
  useEffect(() => {
    if (!visible) return;
    (async () => {
      try {
        const res = await invoke<Producto[]>("get_all_products");
        if (Array.isArray(res)) setProductos(res);
      } catch (err) {
        console.error("Error al cargar productos:", err);
        setProductos([]);
      }
    })();
  }, [visible]);

  if (!visible) return null;

  const filtered = search
    ? productos.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    : productos;

  const handleSelect = (p: Producto) => {
    onSelect(p);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <div className="modal-header">
          <h3>Seleccionar Producto</h3>
          <button className="close-btn" onClick={onClose}>X</button>
        </div>
        <input
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="inputItem"
        />
        <ul className="modal-list">
          {filtered.map(p => (
            <li
              key={p.name}
              className="modal-item"
              onClick={() => handleSelect(p)}
            >
              {p.name} — ${p.price} — Stock: {p.stock}
            </li>
          ))}
          {filtered.length === 0 && <li className="modal-item">No se encontraron productos</li>}
        </ul>
      </div>
    </div>
  );
}
