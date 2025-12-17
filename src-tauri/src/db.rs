use rusqlite::Connection;
use std::fs;
use serde::{Serialize, Deserialize};
use rusqlite::params;

pub fn init_db() {
    let conexion = Connection::open("my-db.db3").expect("Error conectando a SQLite");
    println!("Base de datos conectada.");

    let sql = fs::read_to_string("migrations/001_init.sql")
        .expect("No se pudo leer el archivo init.sql");

    conexion
        .execute_batch(&sql)
        .expect("No se pudieron ejecutar las sentencias SQL.");

    println!("Tablas inicializadas correctamente.");
}

#[tauri::command]
pub fn add_stock(name: String, price: i64, stock: i64, description: String) -> Result<i64, String> {
    use rusqlite::params;
    let conexion = Connection::open("my-db.db3").map_err(|e| e.to_string())?;

    let affected = conexion.execute(
        "INSERT OR IGNORE INTO stocks (name, price, stock, description) VALUES (?1, ?2, ?3, ?4)",
        params![name, price, stock, description],
    )?;

    if affected == 0 {
        return Err("No se insertó el producto (duplicado o error de datos)".to_string());
    }

    let id = conexion.last_insert_rowid();
    println!("Producto agregado: {} (id {})", name, id);

    Ok(id)
}

#[derive(Serialize, Deserialize)]
pub struct Producto {
    name: String,
    price: i64,
    stock: i64,
}

#[tauri::command]
pub fn get_all_products() -> Result<Vec<Producto>, String> {
    let conexion = Connection::open("my-db.db3").map_err(|e| e.to_string())?;

    let mut stmt = conexion
        .prepare("SELECT name, price, stock FROM stocks ORDER BY name ASC")
        .map_err(|e| e.to_string())?;

    let productos = stmt
        .query_map(params![], |row| {
            Ok(Producto {
                name: row.get(0)?,
                price: row.get(1)?,
                stock: row.get(2)?,
            })
        })
        .map_err(|e| e.to_string())?
        .collect::<Result<Vec<_>, _>>()
        .map_err(|e| e.to_string())?;

    Ok(productos)
}


#[derive(Serialize)]
pub struct SaleItem {
    stock_id: i64,
    quantity: i64,
    price_unit: i64,
    subtotal: i64,
}

#[derive(Serialize)]
pub struct Sale {
    id: i64,
    total: i64,
    date: String,
    items: Vec<SaleItem>,
}

#[tauri::command]
pub fn add_sale(items: Vec<(String, i64)>) -> Result<i64, String> {
    use rusqlite::{Connection, params};

    let mut conexion = Connection::open("my-db.db3")
        .map_err(|e| format!("Error abriendo base de datos: {}", e))?;

    let tx = conexion.transaction()
        .map_err(|e| format!("Error iniciando transacción: {}", e))?;

    let mut total: i64 = 0;

    tx.execute("INSERT INTO sales (total) VALUES (0)", [])
        .map_err(|e| format!("Error creando venta: {}", e))?;
    let sale_id = tx.last_insert_rowid();

    for (name, quantity) in items {
        let query = tx.prepare("SELECT id, price, stock FROM stocks WHERE name = ?1");
        let mut stmt = match query {
            Ok(stmt) => stmt,
            Err(e) => return Err(format!("Error preparando consulta: {}", e)),
        };

        let row_result = stmt.query_row(params![name], |row| {
            Ok((row.get::<_, i64>(0)?, row.get::<_, i64>(1)?, row.get::<_, i64>(2)?))
        });

        let (stock_id, price_unit, current_stock) = match row_result {
            Ok(v) => v,
            Err(_) => return Err(format!("Producto no encontrado o error al obtener datos")),
        };

        if current_stock < quantity {
            return Err(format!(
                "Stock insuficiente para '{}'. Disponible: {}, solicitado: {}",
                name, current_stock, quantity
            ));
        }

        let subtotal = price_unit * quantity;
        total += subtotal;

        tx.execute(
            "INSERT INTO sale_items (sale_id, stock_id, quantity, price_unit, subtotal)
             VALUES (?1, ?2, ?3, ?4, ?5)",
            params![sale_id, stock_id, quantity, price_unit, subtotal],
        )
        .map_err(|e| format!("Error insertando item: {}", e))?;

        tx.execute(
            "UPDATE stocks SET stock = stock - ?1 WHERE id = ?2",
            params![quantity, stock_id],
        )
        .map_err(|e| format!("Error actualizando stock: {}", e))?;
    }

    tx.execute(
        "UPDATE sales SET total = ?1 WHERE id = ?2",
        params![total, sale_id],
    )
    .map_err(|e| format!("Error actualizando total: {}", e))?;

    tx.commit()
        .map_err(|e| format!("Error confirmando transacción: {}", e))?;

    println!("Venta registrada correctamente (ID: {})", sale_id);
    Ok(sale_id)
}

#[tauri::command]
pub fn get_sales(
    from_date: Option<String>,
    to_date: Option<String>,
) -> Result<Vec<Sale>, String> {
    use rusqlite::{Connection, params};

    let conexion = Connection::open("my-db.db3")
        .map_err(|e| format!("Error abriendo DB: {}", e))?;

    let mut query = "SELECT id, total, created_at FROM sales WHERE 1=1".to_string();
    let mut params_vec: Vec<&dyn rusqlite::ToSql> = Vec::new();

    let from = from_date.clone();
    let to = to_date.clone();

    if let Some(ref f) = from {
        query.push_str(" AND created_at >= ?");
        params_vec.push(f as &dyn rusqlite::ToSql);
    }

    if let Some(ref t) = to {
        query.push_str(" AND created_at <= ?");
        params_vec.push(t as &dyn rusqlite::ToSql);
    }

    query.push_str(" ORDER BY created_at DESC");

    let mut stmt = conexion.prepare(&query)
        .map_err(|e| format!("Error preparando consulta: {}", e))?;

    let rows = stmt.query_map(params_vec.as_slice(), |row| {
        Ok(Sale {
            id: row.get(0)?,
            total: row.get(1)?,
            date: row.get(2)?,
            items: vec![],
        })
    }).map_err(|e| format!("Error obteniendo ventas: {}", e))?;

    Ok(rows.filter_map(|r| r.ok()).collect())
}
