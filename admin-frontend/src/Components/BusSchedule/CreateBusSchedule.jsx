import { useState } from "react";

const CreateBusSchedule = ({ onCreate, onClose, busStations }) => {
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
                <select
                    name="departStationId"
                    value={busScheduleData.departStationId}
                    onChange={handleChange}
                >
                    <option value="">Select Depart Station</option>
                    {busStations.map(station => (
                        <option key={station.id} value={station.id}>
                            {station.name}
                        </option>
                    ))}
                </select>
                <select
                    name="arrivalStationId"
                    value={busScheduleData.arrivalStationId}
                    onChange={handleChange}
                >
                    <option value="">Select Arrival Station</option>
                    {busStations.map(station => (
                        <option key={station.id} value={station.id}>
                            {station.name}
                        </option>
                    ))}
                </select>
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
