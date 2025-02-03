import { NavLink } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <nav id="header">
      <NavLink to="/" className="nav-link">
        Inicio
      </NavLink>
      <NavLink to="/hotels" className="nav-link">
        Gestionar Hoteles
      </NavLink>
      <NavLink to="/rooms" className="nav-link">
        Gestionar Habitaciones
      </NavLink>
      <NavLink to="/reservations" className="nav-link">
        Realizar Reserva
      </NavLink>
      <NavLink to="/view-reservations" className="nav-link">
        Ver Reservas
      </NavLink>
    </nav>
  );
}
