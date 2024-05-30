import React, { useState } from 'react';
import './Bookings.css';

const CreateBooking = ({ onClose, onCreate }) => {
    const [userId, setUserId] = useState('');
    const [busScheduleId, setBusScheduleId] = useState('');
    const [bookingDate, setBookingDate] = useState('');
    const [qrCodeDataImg, setQrCodeDataImg] = useState('');
    const [qrCodeData, setQrCodeData] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = () => {
        const bookingData = { userId, busScheduleId, bookingDate, qrCodeDataImg, qrCodeData, status };
        onCreate(bookingData);
        onClose();
    };

    return (
        <div className="popup-booking">
            <div className="popup-inner-booking">
                <h2>Create Booking</h2>
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
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                />
                <label>QR Code Data Img:</label>
                <input
                    type="text"
                    value={qrCodeDataImg}
                    onChange={(e) => setQrCodeDataImg(e.target.value)}
                />
                <label>QR Code Data:</label>
                <input
                    type="text"
                    value={qrCodeData}
                    onChange={(e) => setQrCodeData(e.target.value)}
                />
                <label>Status:</label>
                <input
                    type="text"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                />
                <div className="button-group">
                    <button onClick={handleSubmit}>Submit</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default CreateBooking;
