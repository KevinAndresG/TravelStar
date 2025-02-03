import { useEffect, useState } from "react";
import { getReservations, getRooms, getHotels } from "../../localStorage";
import "./ReservationList.css";

export default function ReservationList() {
  const [rooms, setRooms] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    console.log("rooms: ", rooms);
    setRooms(getRooms());
    console.log("hotels: ", hotels);
    setHotels(getHotels());
    console.log("reservations: ", reservations);
    setReservations(getReservations());
    return () => {};
  }, []);

  return (
    <div>
      <h2>Lista de Reservas</h2>
      <div
        className="reservation-list"
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        {reservations.map((reservation) => {
          const room = rooms.find((r) => r.id === parseInt(reservation.roomId));
          const hotel = hotels.find((h) => h.id === parseInt(room?.hotelId));
          return (
            <div key={reservation.id} className="reservation-card">
              <img
                src={room?.image || hotel?.image || "/default-hotel.jpg"}
                alt={room?.roomType || hotel?.name}
              />
              {/* Detalles de la Reserva */}
              <div className="details">
                <h3>{hotel?.name}</h3>
                <p>
                  <strong>Habitación:</strong> {room?.roomType}
                </p>
                <p>
                  <strong>Huésped:</strong> {reservation.guestName} (
                  {reservation.guestEmail})
                </p>
                <p>
                  <strong>Check-in:</strong> {reservation.checkInDate}
                </p>
                <p>
                  <strong>Check-out:</strong> {reservation.checkOutDate}
                </p>
                <p>
                  <strong>Número de Huéspedes:</strong>{" "}
                  {reservation.guestsCount}
                </p>
                <p className="contact">
                  <strong>Contacto de Emergencia:</strong>{" "}
                  {reservation.emergencyContact}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
