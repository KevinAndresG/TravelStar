import { Route, Routes } from "react-router-dom";
import HotelForm from "../components/ManageHotels/HotelForm";
import RoomForm from "../components/ManageRooms/RoomForm";
import ReservationForm from "../components/ReservationForm/ReservationForm";
import ReservationList from "../components/ReservationList/ReservationList";
import "./Router.css";
import NavBar from "../components/NavBar/NavBar";
import Login from "../components/Login/Login";
import PrivateRoute from "./PrivateRoute";
import { getCurrentUser } from "../localStorage";
import Register from "../components/Login/Register";
import { useEffect, useState } from "react";

const Router = () => {
  const [user, setUser] = useState(getCurrentUser());
  useEffect(() => {
    setUser(getCurrentUser());
  }, []);
  return (
    <>
      {user && <NavBar />}
      <div>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rutas protegidas para el Agente de Viajes */}
          <Route
            path="/hotels"
            element={
              <PrivateRoute allowedRoles={["agent"]}>
                <HotelForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/rooms"
            element={
              <PrivateRoute allowedRoles={["agent"]}>
                <RoomForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/view-reservations"
            element={
              <PrivateRoute allowedRoles={["agent"]}>
                <ReservationList />
              </PrivateRoute>
            }
          />

          {/* Rutas protegidas para el Viajero */}
          <Route
            path="/reservations"
            element={
              <PrivateRoute allowedRoles={["traveler"]}>
                <ReservationForm />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default Router;
