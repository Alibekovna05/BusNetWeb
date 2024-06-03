import { useState } from 'react';
import './Bookings.css';

const BookingStatus = {
    PENDING_PAYMENT: 'PENDING_PAYMENT',
    CONFIRMED: 'CONFIRMED',
    CANCELLED: 'CANCELLED'
};
const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    const hours = (`0${d.getHours()}`).slice(-2);
    const minutes = (`0${d.getMinutes()}`).slice(-2);
    const seconds = (`0${d.getSeconds()}`).slice(-2);
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};
const UpdateBooking = ({ data, onClose, onUpdate }) => {
    const [userId, setUserId] = useState(data.userId);
    const [busScheduleId, setBusScheduleId] = useState(data.busScheduleId);
    const [bookingDate, setBookingDate] = useState(formatDate(data.bookingDate));
    const [status, setStatus] = useState(BookingStatus.PENDING_PAYMENT);

    const handleSubmit = () => {
        const updatedData = {
            ...data,
            userId,
            busScheduleId,
            bookingDate,
            status
        };
        onUpdate(updatedData);
        onClose();
    };



    return (
        <div className="popup-booking">
            <div className="popup-inner-booking">
                <h2>Update Booking</h2>
                <label>User ID:</label>
                <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <label>Bus Schedule ID:</label>
                <input
                    type="text"
                    value={busScheduleId}
                    onChange={(e) => setBusScheduleId(e.target.value)}
                />
                <label>Booking Date:</label>
                <input
                    type="datetime-local"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                />
                <label>Status:</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value={BookingStatus.PENDING_PAYMENT}>PENDING PAYMENT</option>
                    <option value={BookingStatus.CONFIRMED}>CONFIRMED</option>
                    <option value={BookingStatus.CANCELLED}>CANCELLED</option>
                </select>
                <div className="button-group">
                    <button onClick={handleSubmit}>Submit</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default UpdateBooking;
