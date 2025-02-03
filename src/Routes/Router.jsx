import { Navigate, Route, Routes } from "react-router-dom";
import App from "../App";
import HotelForm from "../components/ManageHotels/HotelForm";
import RoomForm from "../components/ManageRooms/RoomForm";
import ReservationForm from "../components/ReservationForm/ReservationForm";
import ReservationList from "../components/ReservationList/ReservationList";
import "./Router.css";
import NavBar from "../components/NavBar/NavBar";

const Router = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<App />} />
        <Route path="/hotels" element={<HotelForm />} />
        <Route path="/rooms" element={<RoomForm />} />
        <Route path="/reservations" element={<ReservationForm />} />
        <Route path="/view-reservations" element={<ReservationList />} />
      </Routes>
    </>
  );
};

export default Router;
