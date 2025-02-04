import { useState } from "react";
import {
  getCurrentUser,
  getHotelsByUser,
  saveHotels,
} from "../../localStorage";
import "./HotelForm.css";

export default function HotelForm() {
  const currentUser = getCurrentUser();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [hotels, setHotels] = useState(getHotelsByUser(currentUser.id));
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newHotel = {
      id: Date.now(),
      agentId: currentUser.id,
      name,
      address,
      city,
      image: image || "/default-hotel.jpg", // Usar imagen predeterminada si no se selecciona ninguna
      enabled: true,
    };
    const updatedHotels = [...hotels, newHotel];
    saveHotels(updatedHotels);
    setHotels(updatedHotels);
    setName("");
    setAddress("");
    setCity("");
    setImage(null); // Limpiar la imagen seleccionada
    alert("Hotel creado exitosamente.");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Guardar la imagen como Base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (id) => {
    const updatedHotels = hotels.filter((hotel) => hotel.id !== id);
    saveHotels(updatedHotels);
    setHotels(updatedHotels);
    alert("Hotel eliminado exitosamente.");
  };

  return (
    <div className="hotels-container">
      <h2>Gestionar Hoteles</h2>
      <form onSubmit={handleSubmit}>
        <img src="/hotel.png" alt="" width="100" className="form-icon" />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Nombre del Hotel"
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          placeholder="Dirección del Hotel"
        />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          placeholder="Ciudad del Hotel"
        />
        <input
          type="file"
          accept="image/*"
          placeholder="Imagen del Hotel"
          onChange={handleImageChange}
        />
        <button type="submit">Crear Hotel</button>
      </form>
      <ul>
        {hotels.map((hotel) => (
          <li className="hotel-item" key={hotel.id}>
            <img
              src={hotel.image ?? "/default-hotel.jpg"}
              alt={hotel.name}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            {hotel.name} - {hotel.address}, {hotel.city}
            <button
              className="delete-button"
              onClick={() => handleDelete(hotel.id)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
