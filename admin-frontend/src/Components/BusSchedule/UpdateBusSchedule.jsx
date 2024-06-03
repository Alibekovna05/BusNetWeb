import  { useState } from "react";

const statusOptions = [
    "UPCOMING",
    "DELAYED",
    "CANCELLED",
    "IN_PROGRESS",
    "COMPLETED"
];

export default function UpdateBusSchedule({ busSchedule, onClose, onSave , busStations}) {
    const [formData, setFormData] = useState({
        ...busSchedule,
        status: busSchedule.status || "UPCOMING" // default to UPCOMING if status is not defined
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <div className="popup-schedule">
            <div className="popup-inner-schedule">
            <h2>Update Bus Schedule</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Depart Time:
                        <input
                            type="datetime-local"
                            name="departTime"
                            value={new Date(formData.departTime).toISOString().slice(0, 16)}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Arrival Time:
                        <input
                            type="datetime-local"
                            name="arrivalTime"
                            value={new Date(formData.arrivalTime).toISOString().slice(0, 16)}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <select
                        name="departStationId"
                        value={formData.departStationId}
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
                        value={formData.arrivalStationId}
                        onChange={handleChange}
                    >
                        <option value="">Select Arrival Station</option>
                        {busStations.map(station => (
                            <option key={station.id} value={station.id}>
                                {station.name}
                            </option>
                        ))}
                    </select>
                    <label>
                        Bus ID:
                        <input
                            type="text"
                            name="busId"
                            value={formData.busId}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Bus Company:
                        <input
                            type="text"
                            name="busCompanyName"
                            value={formData.busCompanyName}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Total Seats:
                        <input
                            type="number"
                            name="totalSeats"
                            value={formData.totalSeats}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Available Seats:
                        <input
                            type="number"
                            name="availableSeats"
                            value={formData.availableSeats}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Price:
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Status:
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                        >
                            {statusOptions.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button type="submit">Save</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
}
