export const getHotels = () => {
  const hotels = localStorage.getItem("hotels");
  return hotels ? JSON.parse(hotels) : [];
};

export const saveHotels = (hotels) => {
  localStorage.setItem("hotels", JSON.stringify(hotels));
};

export const getRooms = () => {
  const rooms = localStorage.getItem("rooms");
  return rooms ? JSON.parse(rooms) : [];
};

export const saveRooms = (rooms) => {
  localStorage.setItem("rooms", JSON.stringify(rooms));
};

export const getReservations = () => {
  const reservations = localStorage.getItem("reservations");
  return reservations ? JSON.parse(reservations) : [];
};

export const saveReservations = (reservations) => {
  localStorage.setItem("reservations", JSON.stringify(reservations));
};
