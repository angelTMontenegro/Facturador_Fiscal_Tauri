// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod db;
use db::init_db;
use db::add_sale;
use db::add_stock;
use db::get_all_products;
use db::get_sales;

fn main() {
    init_db();
    
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![add_stock, add_sale, get_all_products, get_sales])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");    
}
