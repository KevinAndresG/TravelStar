import { NavLink, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { getCurrentUser, logout } from "../../localStorage";

export default function NavBar() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <nav id="header">
      {currentUser && currentUser.role === "agent" && (
        <>
          <NavLink to="/hotels" className="nav-link">
            Gestionar Hoteles
          </NavLink>
          <NavLink to="/rooms" className="nav-link">
            Gestionar Habitaciones
          </NavLink>
          <NavLink to="/view-reservations" className="nav-link">
            Ver Reservas
          </NavLink>
        </>
      )}
      <button onClick={handleLogout} className="close-session">
        Cerrar Sesión
      </button>
    </nav>
  );
}
