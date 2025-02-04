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
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guestsCount, setGuestsCount] = useState(0);
  const [emergencyContact, setEmergencyContact] = useState({
    fullName: "",
    phoneNumber: "",
  });
  const hotels = getHotels();
  const [rooms, setRooms] = useState([]);
  const [passengers, setPassengers] = useState([]);
  const [errors, setErrors] = useState({});
  const selectedRoom = rooms.find((room) => room.id === parseInt(roomId));

  const handleHotelChange = (e) => {
    setHotelId(e.target.value);
    setRooms(
      getRooms().filter(
        (room) => String(room.hotelId) === String(e.target.value)
      )
    );
  };

  const handleGuestsChange = (e, id) => {
    const count = parseInt(e.target.value);
    console.log("count: ", count);
    console.log("guestsCount: ", guestsCount);
    if (count > (selectedRoom?.capacity || 0)) {
      setErrors({
        guestsCount: `La habitación seleccionada permite máximo ${selectedRoom?.capacity} personas.`,
      });
    } else {
      setErrors({});
      if (count > guestsCount) {
        console.log("count en el if: ", count);

        setPassengers([
          ...passengers,
          {
            id,
            fullName: "",
            phoneNumber: "",
            email: "",
            birthDate: "",
            gender: "",
            documentType: "",
            documentNumber: "",
          },
        ]);
      } else if (count < guestsCount && passengers.length > 0) {
        setPassengers((prevPassengers) => prevPassengers.slice(0, count));
      }
      setGuestsCount(count);
    }
    console.log("passengers: ", passengers);
  };

  const handlePassengerChange = (index, field, value) => {
    console.log("value: ", value);
    console.log("field: ", field);
    console.log("index: ", index);
    const updatedPassengers = [...passengers];
    console.log("updatedPassengers: ", updatedPassengers);
    updatedPassengers[index][field] = value;
    console.log("updatedPassengers: ", updatedPassengers);
    setPassengers(updatedPassengers);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!hotelId) newErrors.hotelId = "Debes seleccionar un hotel.";
    if (!roomId) newErrors.roomId = "Debes seleccionar una habitación.";
    if (!checkInDate)
      newErrors.checkInDate = "Debes ingresar una fecha de entrada.";
    if (!checkOutDate)
      newErrors.checkOutDate = "Debes ingresar una fecha de salida.";
    if (!emergencyContact)
      newErrors.emergencyContact = "Debes ingresar un contacto de emergencia.";

    passengers.forEach((passenger, index) => {
      if (!passenger.fullName)
        newErrors[`passenger${index}`] = `El pasajero ${
          index + 1
        } debe tener un nombre.`;
      if (!passenger.birthDate)
        newErrors[`passenger${index}`] = `El pasajero ${
          index + 1
        } debe tener una fecha de nacimiento.`;
      if (!passenger.gender)
        newErrors[`passenger${index}`] = `El pasajero ${
          index + 1
        } debe tener un género.`;
      if (!passenger.documentType)
        newErrors[`passenger${index}`] = `El pasajero ${
          index + 1
        } debe tener un tipo de documento.`;
      if (!passenger.documentNumber)
        newErrors[`passenger${index}`] = `El pasajero ${
          index + 1
        } debe tener un número de documento.`;
      if (!passenger.email)
        newErrors[`passenger${index}`] = `El pasajero ${
          index + 1
        } debe tener un email.`;
      if (!passenger.phone)
        newErrors[`passenger${index}`] = `El pasajero ${
          index + 1
        } debe tener un teléfono.`;
    });

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newReservation = {
      id: Date.now(),
      agentId: hotels[0].agentId,
      roomId,
      hotelId,
      checkInDate,
      checkOutDate,
      guestsCount,
      emergencyContact,
      passengers,
    };

    const reservations = getReservations();
    saveReservations([...reservations, newReservation]);
    alert("Reserva realizada exitosamente.");
    window.location.reload();
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
        {errors.hotelId && <p id="error-message">{errors.hotelId}</p>}
        <select
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          required
          disabled={!hotelId || rooms.length <= 0}
        >
          <option value="">Selecciona una habitación</option>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.roomType} - {room.location} (Capacidad: {room.capacity})
            </option>
          ))}
        </select>
        {errors.roomId && <p id="error-message">{errors.roomId}</p>}
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
          min="1"
          value={guestsCount}
          onChange={(e) => {
            handleGuestsChange(e, Date.now());
          }}
          required
          disabled={!roomId}
          placeholder="Número de Huéspedes"
        />
        {errors.guestsCount && <p id="error-message">{errors.guestsCount}</p>}
        {passengers.map((pass, index) => (
          <div className="passenger-form" key={pass.id}>
            <h2 className="form-title">Pasajero {index + 1}</h2>
            <input
              type="text"
              value={passengers[index]?.fullName || ""}
              onChange={(e) =>
                handlePassengerChange(index, "fullName", e.target.value)
              }
              required
              placeholder="Nombre Completo"
            />
            <input
              type="date"
              value={passengers[index]?.birthDate || ""}
              onChange={(e) =>
                handlePassengerChange(index, "birthDate", e.target.value)
              }
              required
              placeholder="Fecha de Nacimiento"
            />
            <select
              // value={passengers[index]?.gender || ""}
              onChange={(e) =>
                handlePassengerChange(index, "gender", e.target.value)
              }
              required
            >
              <option selected defaultValue={true} disabled>
                Selecciona un género
              </option>
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
              <option value="other">Otro</option>
            </select>
            <select
              // value={passengers[index]?.documentType || ""}
              onChange={(e) =>
                handlePassengerChange(index, "documentType", e.target.value)
              }
              placeholder="Tipo de Documento"
              required
            >
              <option selected defaultValue={true} disabled>
                Selecciona un tipo de documento
              </option>
              <option value="CC">CC</option>
              <option value="Passport">Pasaporte</option>
            </select>
            <input
              type="text"
              value={passengers[index]?.documentNumber || ""}
              onChange={(e) =>
                handlePassengerChange(index, "documentNumber", e.target.value)
              }
              required
              placeholder="Número de Documento"
            />
            <input
              type="email"
              value={passengers[index]?.email || ""}
              onChange={(e) =>
                handlePassengerChange(index, "email", e.target.value)
              }
              required
              placeholder="Email"
            />
            <input
              type="text"
              value={passengers[index]?.phone || ""}
              onChange={(e) =>
                handlePassengerChange(index, "phone", e.target.value)
              }
              required
              placeholder="Teléfono"
            />
            {errors[`passenger${index}`] && (
              <p id="error-message">{errors[`passenger${index}`]}</p>
            )}
          </div>
        ))}
        <h2 className="form-title">Contacto de Emergencia</h2>
        <input
          type="text"
          value={emergencyContact.fullName}
          onChange={(e) =>
            setEmergencyContact({
              ...emergencyContact,
              fullName: e.target.value,
            })
          }
          required
          placeholder="Nombres y Apellidos"
        />
        <input
          type="text"
          value={emergencyContact.phoneNumber}
          onChange={(e) =>
            setEmergencyContact({
              ...emergencyContact,
              phoneNumber: e.target.value,
            })
          }
          required
          placeholder="Teléfono"
        />
        {errors.emergencyContact && (
          <p id="error-message">{errors.emergencyContact}</p>
        )}
        <button type="submit" disabled={!hotelId || rooms.length <= 0}>
          Confirmar Reserva
        </button>
      </form>
    </div>
  );
}
