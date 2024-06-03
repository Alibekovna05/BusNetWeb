import { useState } from 'react';
import axios from 'axios';

const CreateBus = ({ fetchBuses , handleClose }) => {
    const [formData, setFormData] = useState({
        licensePlate: '',
        model: '',
        capacity: 0,
        color: '',
        photo: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, photo: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        };
        const formDataToSend = new FormData();
        formDataToSend.append('licensePlate', formData.licensePlate);
        formDataToSend.append('model', formData.model);
        formDataToSend.append('capacity', formData.capacity);
        formDataToSend.append('color', formData.color);
        formDataToSend.append('photo', formData.photo);
        try {
            await axios.post('/api/v1/buses', formDataToSend, config);
            fetchBuses(); // Fetch buses again to update the list
        } catch (error) {
            console.error('Error creating bus:', error);
        }
    };

    return (
        <div className="popup">
            <div className="popup-inner">

            <h2>Create New Bus</h2>

                <label>License Plate:</label>
                <input type="text" name="licensePlate" value={formData.licensePlate} onChange={handleChange} />
                <label>Model:</label>
                <input type="text" name="model" value={formData.model} onChange={handleChange} />
                <label>Capacity:</label>
                <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} />
                <label>Color:</label>
                <input type="text" name="color" value={formData.color} onChange={handleChange} />
                <label>Photo:</label>
                <input type="file" name="photo" onChange={handleFileChange} />

                <div className="popup-buttons">
                    <button className="popup-button" onClick={handleSubmit}>Create</button>
                    <button className="popup-button" onClick={handleClose}>Cancel</button>
                </div>

            </div>
        </div>
    );
};

export default CreateBus;
