import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import "./dataPage.css";

const DataPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

 const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/bookings");
      const today = moment().format("YYYY-MM-DD");
      const filteredBookings = response.data.filter((booking) => {
        return moment(booking.date).format("YYYY-MM-DD") === today;
      });
      setBookings(filteredBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleUpdate = async (id) => {
    const newCheckoutTime = prompt("Update the new checkout time:");
    if (newCheckoutTime) {
      try {
        const response = await axios.put(`http://localhost:5000/bookings/${id}`, {
          checkout: newCheckoutTime,
        });

        if (response.status === 200) {
          setBookings(
            bookings.map((booking) =>
              booking._id === id
                ? { ...booking, checkout: newCheckoutTime }
                : booking
            )
          );
        } else {
          console.error("Failed to update checkout time");
        }
      } catch (error) {
        console.error("Error updating checkout time:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/bookings/${id}`);

      if (response.status === 200) {
        setBookings(bookings.filter((booking) => booking._id !== id));
      } else {
        console.error("Failed to delete booking");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  return (
    <div className="data-page">
      <table className="room-table" id="bookingTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Date</th>
            <th>Check-in Time</th>
            <th>Check-out Time</th>
            <th>Purpose</th>
            <th>Message</th>
            <th>Room</th>
            <th>Action</th>
            <th>
              <a href="http://localhost:5000/export-to-excel">Download</a>
            </th>
          </tr>
        </thead>
        <tbody id="bookingBody">
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.name}</td>
              <td>{booking.department}</td>
              <td>{booking.date}</td>
              <td>{booking.checkin}</td>
              <td>{booking.checkout}</td>
              <td>{booking.purpose}</td>
              <td>{booking.message}</td>
              <td>{booking.room}</td>
              <td>
                <button
                  className="update-button"
                  onClick={() => handleUpdate(booking._id)}
                >
                  Update
                </button>
                {/* <button
                  className="delete-button"
                  onClick={() => handleDelete(booking._id)}
                >
                  Delete
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataPage;
