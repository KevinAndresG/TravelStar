import { useState } from "react";
import {
  getHotels,
  getRooms,
  getReservations,
  saveReservations,
} from "../../localStorage";
import "./ReservationForm.css";

export default function ReservationForm() {
  const [hotelId, setHotelId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guestsCount, setGuestsCount] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const hotels = getHotels();
  const [rooms, setRooms] = useState([]);
  const handleHotelChange = (e) => {
    setHotelId(e.target.value);
    setRooms(
      getRooms().filter(
        (room) => String(room.hotelId) === String(e.target.value)
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReservation = {
      id: Date.now(),
      roomId,
      guestName,
      guestEmail,
      checkInDate,
      checkOutDate,
      guestsCount,
      emergencyContact,
    };
    const reservations = getReservations();
    saveReservations([...reservations, newReservation]);
    alert("Reserva realizada exitosamente.");
  };

  return (
    <div>
      <h2>Realizar Reserva</h2>
      <form onSubmit={handleSubmit}>
        <select value={hotelId} onChange={(e) => handleHotelChange(e)} required>
          <option value="">Selecciona un hotel</option>
          {hotels.map((hotel) => (
            <option key={hotel.id} value={hotel.id}>
              {hotel.name} - {hotel.city}
            </option>
          ))}
        </select>
        <select
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          required
          disabled={!hotelId || rooms.length <= 0}
        >
          <option value="">Selecciona una habitación</option>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.roomType} - {room.location}
            </option>
          ))}
        </select>
        {hotelId && rooms.length <= 0 && (
          <p id="error-message">
            No hay habitaciones disponibles en este hotel.
          </p>
        )}
        <input
          type="text"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          required
          placeholder="Nombre del Huésped"
        />
        <input
          type="email"
          value={guestEmail}
          onChange={(e) => setGuestEmail(e.target.value)}
          required
          placeholder="Email del Huésped"
        />
        <input
          type="date"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
          required
          placeholder="Fecha de Entrada"
        />
        <input
          type="date"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
          required
          placeholder="Fecha de Salida"
        />
        <input
          type="number"
          value={guestsCount}
          onChange={(e) => setGuestsCount(e.target.value)}
          required
          placeholder="Número de Huéspedes"
        />
        <input
          type="text"
          value={emergencyContact}
          onChange={(e) => setEmergencyContact(e.target.value)}
          required
          placeholder="Contacto de Emergencia"
        />
        <button type="submit" disabled={!hotelId || rooms.length <= 0}>
          Confirmar Reserva
        </button>
      </form>
    </div>
  );
}
