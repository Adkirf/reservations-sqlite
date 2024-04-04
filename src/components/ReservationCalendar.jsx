import React from "react";

const ReservationCalendar = ({ dataBase, selectDate }) => {
  console.log(dataBase);

  const renderCalendar = () => {
    // Assuming reservations is an array of reservation objects with a `date` property
    // You may need to adjust the data structure according to your actual data
    const reservationsByDate = groupReservationsByDate(dataBase.reservations);

    // Get the days of the current week starting from Sunday (index 0)
    const currentDate = new Date();
    const firstDayOfWeek = new Date(currentDate);
    firstDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(firstDayOfWeek);
      date.setDate(date.getDate() + i);
      return date;
    });

    const handleDateClick = (date) => {
      selectDate(date); // Trigger the selectDate function in the props
    };

    return (
      <div>
        <h2>Reservation Calendar</h2>
        <div>
          {daysOfWeek.map((day, index) => (
            <div key={index} onClick={() => handleDateClick(day)}>
              <h3>{day.toLocaleDateString("en-US")}</h3>
              {reservationsByDate[formatDate(day)] && (
                <ul>
                  {reservationsByDate[formatDate(day)].map(
                    (reservation, index) => (
                      <li key={index}>{reservation.name}</li>
                    )
                  )}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const groupReservationsByDate = (reservations) => {
    const grouped = {};
    reservations.forEach((reservation) => {
      const date = formatDate(new Date(reservation.date));
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(reservation);
    });
    return grouped;
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return renderCalendar();
};

export default ReservationCalendar;
