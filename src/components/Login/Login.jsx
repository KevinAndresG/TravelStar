import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getUsers, saveCurrentUser } from "../../localStorage";
import "./PublicFiles.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("traveler");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = getUsers();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      setError("Credenciales incorrectas. Inténtalo de nuevo.");
      return;
    }

    if (user.role !== role) {
      setError("Este usuario no tiene permiso para este rol.");
      return;
    }

    saveCurrentUser(user);
    if (role === "agent") {
      navigate("/hotels");
    } else if (role === "traveler") {
      navigate("/reservations");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        handleLogin(e);
      }}
    >
      <h2 className="form-title">Iniciar Sesión</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="traveler">Viajero</option>
        <option value="agent">Agente de Viajes</option>
      </select>
      <button type="submit">Iniciar Sesión</button>
      <NavLink to="/register" className="form-link">
        ¿No tienes cuenta?
      </NavLink>
    </form>
  );
}
