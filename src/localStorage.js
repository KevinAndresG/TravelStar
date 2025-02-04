export const getHotels = () => {
  const hotels = localStorage.getItem("hotels");
  return hotels ? JSON.parse(hotels) : [];
};

export const getHotelsByUser = (userId) => {
  const hotels = localStorage.getItem("hotels");
  return hotels
    ? JSON.parse(hotels).filter((hotel) => hotel.agentId === userId)
    : [];
};

export const getRoomsByUser = (userId) => {
  const rooms = localStorage.getItem("rooms");
  return rooms
    ? JSON.parse(rooms).filter((room) => room.agentId === userId)
    : [];
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

export const getReservations = (userId) => {
  const reservations = localStorage.getItem("reservations");
  return reservations
    ? JSON.parse(reservations).filter((reserv) => reserv.agentId === userId)
    : [];
};

export const saveReservations = (reservations) => {
  localStorage.setItem("reservations", JSON.stringify(reservations));
};

export const getUsers = () => {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
};

export const saveUsers = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

export const saveCurrentUser = (user) => {
  localStorage.setItem("currentUser", JSON.stringify(user));
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
};

export const logout = () => {
  localStorage.removeItem("currentUser");
};
