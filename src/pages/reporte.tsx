import { invoke } from "@tauri-apps/api/core";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Reporte() {
  type SaleItem = {
    stock_id: number;
    quantity: number;
    price_unit: number;
    subtotal: number;
  };

  type Sale = {
    id: number;
    total: number;
    date: string;
    items: SaleItem[];
  };

  const [sales, setSales] = useState<Sale[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const data: Sale[] = await invoke("get_sales", {
          filter: filter || null,
          from_date: fromDate ? fromDate.toISOString().split("T")[0] : null,
          to_date: toDate ? toDate.toISOString().split("T")[0] : null,
        });
        setSales(data);
      } catch (err) {
        console.error("Error obteniendo ventas:", err);
      }
    };
    fetchSales();
  }, [filter, fromDate, toDate]);

  return (
    <main className="reporte">
      
      <h1>Reportes</h1>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <input
          type="text"
          placeholder="Filtrar por ID o total..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span>Desde:</span>
          <DatePicker
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Seleccionar fecha inicial"
            isClearable
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span>Hasta:</span>
          <DatePicker
            selected={toDate}
            onChange={(date) => setToDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Seleccionar fecha final"
            isClearable
          />
        </div>
      </div>

      <table border={1} cellPadding={6}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Total</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {sales.length === 0 ? (
            <tr>
              <td colSpan={3} style={{ textAlign: "center" }}>
                No se encontraron ventas.
              </td>
            </tr>
          ) : (
            sales.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.id}</td>
                <td>{sale.total}</td>
                <td>{sale.date}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </main>
  );
}
