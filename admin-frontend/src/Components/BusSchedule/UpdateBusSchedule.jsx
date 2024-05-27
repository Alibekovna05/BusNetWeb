import React, { useState, useEffect } from "react";

const UpdateBusSchedule = ({ busScheduleData, handleUpdate, handleClose }) => {
    const [updatedBusScheduleData, setUpdatedBusScheduleData] = useState(busScheduleData);

    useEffect(() => {
        setUpdatedBusScheduleData(busScheduleData);
    }, [busScheduleData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedBusScheduleData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        handleUpdate(updatedBusScheduleData);
        handleClose();
    };

    return (
        <div className="popup-schedule">
            <div className="popup-inner-schedule">
                <h2>Update Bus Schedule</h2>
                <input
                    type="datetime-local"
                    name="departTime"
                    placeholder="Depart Time"
                    value={updatedBusScheduleData.departTime}
                    onChange={handleChange}
                />
                <input
                    type="datetime-local"
                    name="arrivalTime"
                    placeholder="Arrival Time"
                    value={updatedBusScheduleData.arrivalTime}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="departStationId"
                    placeholder="Depart Station ID"
                    value={updatedBusScheduleData.departStationId}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="arrivalStationId"
                    placeholder="Arrival Station ID"
                    value={updatedBusScheduleData.arrivalStationId}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="busId"
                    placeholder="Bus ID"
                    value={updatedBusScheduleData.busId}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="busCompanyId"
                    placeholder="Bus Company ID"
                    value={updatedBusScheduleData.busCompanyId}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="totalSeats"
                    placeholder="Total Seats"
                    value={updatedBusScheduleData.totalSeats}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="availableSeats"
                    placeholder="Available Seats"
                    value={updatedBusScheduleData.availableSeats}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={updatedBusScheduleData.price}
                    onChange={handleChange}
                />
                <button onClick={handleSubmit}>Update</button>
                <button onClick={handleClose}>Cancel</button>
            </div>
        </div>
    );
};

export default UpdateBusSchedule;
