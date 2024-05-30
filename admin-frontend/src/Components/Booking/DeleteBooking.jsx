import React from 'react';
import './Bookings.css';

const DeleteBooking = ({ bookingId, onClose, onConfirm }) => {
    return (
        <div className="popup-booking">
            <div className="popup-inner-booking">
                <h2>Are you sure you want to delete this booking?</h2>
                <div className="button-group">
                    <button onClick={() => onConfirm(bookingId)}>Yes</button>
                    <button onClick={onClose}>No</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteBooking;
