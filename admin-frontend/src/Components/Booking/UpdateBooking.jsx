import { useState } from 'react';
import './Bookings.css';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const UpdateBooking = ({ data, onClose, onUpdate }) => {
    const [userId, setUserId] = useState(data.userId);
    const [busScheduleId, setBusScheduleId] = useState(data.busScheduleId);
    const [bookingDate, setBookingDate] = useState(data.bookingDate);
    const [status, setStatus] = useState(data.status);

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
                <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    fullWidth
                >
                    <MenuItem value="PENDING_PAYMENT">PENDING_PAYMENT</MenuItem>
                    <MenuItem value="CONFIRMED">CONFIRMED</MenuItem>
                    <MenuItem value="CANCELLED">CANCELLED</MenuItem>
                </Select>
                <div className="button-group">
                    <button onClick={handleSubmit}>Submit</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default UpdateBooking;
