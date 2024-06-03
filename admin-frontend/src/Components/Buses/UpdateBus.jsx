import {useEffect, useState} from 'react';


const UpdateBus = ({ busData, handleClose, handleUpdate }) => {
    useEffect(() => {
        console.log("Received bus:", busData);
    }, [busData]);
    const [formData, setFormData] = useState({
        licensePlate: busData.licensePlate || "",
        model: busData.model || "",
        capacity: busData.capacity || "",
        color: busData.color || "",
        photo: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        handleUpdate(formData);
        handleClose();
    };

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Update Bus</h2>

                <label>License Plate:</label>
                <input type="text" name="licensePlate" value={formData.licensePlate} onChange={handleChange}/>
                <label>Model:</label>
                <input type="text" name="model" value={formData.model} onChange={handleChange}/>
                <label>Capacity:</label>
                <input type="number" name="capacity" value={formData.capacity} onChange={handleChange}/>
                <label>Color:</label>
                <input type="text" name="color" value={formData.color} onChange={handleChange}/>
                <label>Photo:</label>
                <input type="file" name="photo" onChange={handleChange}/>
                <button type="submit">Update</button>
                <div className="popup-buttons">
                    <button className="popup-button" onClick={handleSubmit}>Update</button>
                    <button className="popup-button" onClick={handleClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default UpdateBus;
