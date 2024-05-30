import React, { useState } from 'react';
import './Bookings.css';

const UpdateBooking = ({ data, onClose, onUpdate }) => {
    const [userId, setUserId] = useState(data.userId);
    const [busScheduleId, setBusScheduleId] = useState(data.busScheduleId);
    const [bookingDate, setBookingDate] = useState(data.bookingDate);
    const [qrCodeDataImg, setQrCodeDataImg] = useState(data.qrCodeDataImg);
    const [qrCodeData, setQrCodeData] = useState(data.qrCodeData);
    const [status, setStatus] = useState(data.status);

    const handleSubmit = () => {
        const updatedData = {
            ...data,
            userId,
            busScheduleId,
            bookingDate,
            qrCodeDataImg,
            qrCodeData,
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

export default UpdateBooking;
