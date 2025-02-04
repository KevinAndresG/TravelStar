import { useEffect, useState } from "react";
import {
  getReservations,
  getRooms,
  getHotels,
  getCurrentUser,
} from "../../localStorage";
import "./Reservationlist.css";

export default function ReservationList() {
  const [rooms, setRooms] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [reservations, setReservations] = useState([]);
  const currentUser = getCurrentUser();

  useEffect(() => {
    setRooms(getRooms());
    setHotels(getHotels());
    setReservations(getReservations(currentUser.id, hotels, rooms));
    console.log("getReservations(): ", getReservations());
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
                src={hotel?.image || "/default-hotel.jpg"}
                alt={room?.roomType || hotel?.name}
              />
              <div className="details">
                <h3>{hotel?.name}</h3>
                <p>
                  <strong>Habitación:</strong> {room?.roomType}
                </p>
                <p>
                  <strong>Check-in:</strong> {reservation?.checkInDate}
                </p>
                <p>
                  <strong>Check-out:</strong> {reservation?.checkOutDate}
                </p>
                <p>
                  <strong>Número de Huéspedes:</strong>{" "}
                  {reservation?.guestsCount}
                </p>
                <p className="contact">
                  <strong>Contacto de Emergencia:</strong>{" "}
                  {reservation?.emergencyContact.fullName}-
                  {reservation?.emergencyContact.phoneNumber}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
