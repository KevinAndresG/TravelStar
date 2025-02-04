import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getUsers, saveUsers } from "../../localStorage";
import "./PublicFiles.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("traveler");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    const users = getUsers();
    const userExists = users.some((u) => u.username === username);

    if (userExists) {
      setError("El nombre de usuario ya está en uso.");
      return;
    }

    const newUser = { username, password, role, id: Date.now() };
    saveUsers([...users, newUser]);
    alert("Usuario registrado exitosamente.");
    navigate("/");
  };

  return (
    <form onSubmit={handleRegister}>
      <h2 className="form-title">Registro de Usuario</h2>
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
      <button type="submit">Registrarse</button>
      <NavLink to="/" className="form-link">
        ¿Ya tienes una cuenta?
      </NavLink>
    </form>
  );
}
