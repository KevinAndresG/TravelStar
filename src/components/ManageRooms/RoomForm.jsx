import { useState } from "react";
import {
  getCurrentUser,
  getHotelsByUser,
  getRoomsByUser,
  saveRooms,
} from "../../localStorage";
import "./RoomForm.css";

export default function RoomForm() {
  const currentUser = getCurrentUser();
  const [hotelId, setHotelId] = useState("");
  const [roomType, setRoomType] = useState("");
  const [baseCost, setBaseCost] = useState("");
  const [taxes, setTaxes] = useState("");
  const [location, setLocation] = useState("");
  const [rooms, setRooms] = useState(getRoomsByUser(currentUser.id));
  const hotels = getHotelsByUser(currentUser.id);
  const [capacity, setCapacity] = useState(1);
  const [image, setImage] = useState(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRoom = {
      id: Date.now(),
      agentId: currentUser.id,
      hotelId,
      roomType,
      baseCost,
      taxes,
      location,
      capacity,
      image: image || "default-room.jpg", // Usar imagen predeterminada si no se selecciona ninguna
      enabled: true,
    };
    const updatedRooms = [...rooms, newRoom];
    saveRooms(updatedRooms);
    setRooms(updatedRooms);
    setHotelId("");
    setRoomType("");
    setBaseCost("");
    setTaxes("");
    setLocation("");
    setCapacity(1);
    setImage(null); // Limpiar la imagen seleccionada
    alert("Habitación creada exitosamente.");
  };

  const handleDelete = (id) => {
    const updatedRooms = rooms.filter((room) => room.id !== id);
    saveRooms(updatedRooms);
    setRooms(updatedRooms);
    alert("Habitación eliminada exitosamente.");
  };

  return (
    <div>
      <h2>Gestionar Habitaciones</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={hotelId}
          onChange={(e) => setHotelId(e.target.value)}
          required
        >
          <option value="">Selecciona un hotel</option>
          {hotels.map((hotel) => (
            <option key={hotel.id} value={hotel.id}>
              {hotel.name} - {hotel.city}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          required
          placeholder="Tipo de Habitación"
        />
        <input
          type="number"
          value={baseCost}
          onChange={(e) => setBaseCost(e.target.value)}
          required
          placeholder="Costo Base"
        />
        <input
          type="number"
          value={taxes}
          onChange={(e) => setTaxes(e.target.value)}
          required
          placeholder="Impuestos"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          placeholder="Ubicación"
        />
        <input
          type="number"
          min="1"
          value={capacity}
          onChange={(e) => setCapacity(parseInt(e.target.value))}
          required
          placeholder="Capacidad (personas)"
        />
        <input
          type="file"
          accept="image/*"
          placeholder="Imagen"
          onChange={handleImageChange}
        />
        <button type="submit">Crear Habitación</button>
      </form>
      <ul>
        {rooms.map((room) => {
          const hotel = hotels.find((h) => h.id === parseInt(room.hotelId));
          return (
            <li className="room-item" key={room.id}>
              <img
                src={room.image ?? "/default-room.jpg"}
                alt={room.roomType}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              {room.roomType} - {room.location} ({hotel?.name}) | Capacidad:{" "}
              {room.capacity} personas
              <button
                className="delete-button"
                onClick={() => handleDelete(room.id)}
              >
                X
              </button>
            </li>
          );
        })}
      </ul>{" "}
    </div>
  );
}
