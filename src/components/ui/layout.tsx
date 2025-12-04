import { Outlet } from "react-router-dom";
import Menu from "./header";
import Footer from "./footer";
import "./layout.css"

export default function Layout() {
  return (
    <div className="layout">
      <Menu />

      <main className="layoutContent">
        <Outlet /> 
      </main>

      <Footer />
    </div>
  );
}
