import { useState } from "react";

const CreateBusSchedule = ({ onCreate, onClose }) => {
    const [busScheduleData, setBusScheduleData] = useState({
        departTime: "",
        arrivalTime: "",
        departStationId: "",
        arrivalStationId: "",
        busId: "",
        busCompanyId: "",
        totalSeats: "",
        availableSeats: "",
        price: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBusScheduleData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        onCreate(busScheduleData);
        onClose();
    };

    return (
        <div className="popup-schedule">
            <div className="popup-inner-schedule">
                <h2>Create Bus Schedule</h2>
                <input
                    type="datetime-local"
                    name="departTime"
                    placeholder="Depart Time"
                    value={busScheduleData.departTime}
                    onChange={handleChange}
                />
                <input
                    type="datetime-local"
                    name="arrivalTime"
                    placeholder="Arrival Time"
                    value={busScheduleData.arrivalTime}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="departStationId"
                    placeholder="Depart Station ID"
                    value={busScheduleData.departStationId}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="arrivalStationId"
                    placeholder="Arrival Station ID"
                    value={busScheduleData.arrivalStationId}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="busId"
                    placeholder="Bus ID"
                    value={busScheduleData.busId}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="busCompanyId"
                    placeholder="Bus Company ID"
                    value={busScheduleData.busCompanyId}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="totalSeats"
                    placeholder="Total Seats"
                    value={busScheduleData.totalSeats}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="availableSeats"
                    placeholder="Available Seats"
                    value={busScheduleData.availableSeats}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={busScheduleData.price}
                    onChange={handleChange}
                />
                <button onClick={handleSubmit}>Create</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default CreateBusSchedule;
