import React, { useState } from "react";

const App = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedAmount, setSelectedAmount] = useState("");
  const [availableTables, setAvailableTables] = useState([]);
  const [selectedTables, setSelectedTables] = useState([]);
  const [email, setEmail] = useState("");
  const [reservationTime, setReservationTime] = useState("");

  const fetchAvailableTables = async () => {
    try {
      const response = await fetch(
        `/api/reservation?selectedDate=${selectedDate}&selectedAmount=${selectedAmount}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setAvailableTables(data.availableTables);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleAmountChange = (event) => {
    setSelectedAmount(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleReservationTimeChange = (event) => {
    setReservationTime(event.target.value);
  };

  const handleTableSelect = (tableId) => {
    if (selectedTables.includes(tableId)) {
      setSelectedTables(selectedTables.filter((id) => id !== tableId));
    } else {
      setSelectedTables([...selectedTables, tableId]);
    }
  };

  const handleSubmitReservation = async () => {
    try {
      const response = await fetch("/api/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tables: selectedTables,
          email: email,
          reservationTime: reservationTime,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to submit reservation");
      }
      // Reset form fields and selected tables after successful submission
      setEmail("");
      setReservationTime("");
      setSelectedTables([]);
      alert("Reservation submitted successfully!");
    } catch (error) {
      console.error("Error submitting reservation:", error);
      alert("Failed to submit reservation. Please try again later.");
    }
  };

  return (
    <div className="color-red-500">
      <label htmlFor="date">Select Date:</label>
      <input
        type="date"
        id="date"
        value={selectedDate}
        onChange={handleDateChange}
      />
      <label htmlFor="amount">Select Amount:</label>
      <input
        type="number"
        id="amount"
        value={selectedAmount}
        onChange={handleAmountChange}
      />
      <button className="color-white" onClick={fetchAvailableTables}>
        Check Availability
      </button>
      <div>
        {availableTables.map((tableId) => (
          <label key={tableId}>
            <input
              type="checkbox"
              checked={selectedTables.includes(tableId)}
              onChange={() => handleTableSelect(tableId)}
            />
            Table {tableId}
          </label>
        ))}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div>
        <label htmlFor="reservationTime">Reservation Time:</label>
        <input
          type="datetime-local"
          id="reservationTime"
          value={reservationTime}
          onChange={handleReservationTimeChange}
        />
      </div>
      <button onClick={handleSubmitReservation}>Submit Reservation</button>
    </div>
  );
};

export default App;
