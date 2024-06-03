import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./BusCompany.css";

const MyBusCompany = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        contactNumber: '',
        email: '',
        owner: ''
    });

    const [busCompany, setBusCompany] = useState(null);
    const [error, setError] = useState(null);
    const busCompanyName = localStorage.getItem("busCompanyName");
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        // Retrieve token from local storage
        const token = localStorage.getItem("token");
        setAccessToken(token);

        // Fetch the bus company data when the component mounts
        fetchBusCompany();
    }, []);

    const fetchBusCompany = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`/api/v1/buscompany/${busCompanyName}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setBusCompany(response.data);
            setFormData({
                name: response.data.name,
                address: response.data.address,
                contactNumber: response.data.contactNumber,
                email: response.data.email,
                owner: response.data.owner
            });
        } catch (error) {
            setError('Error fetching bus company data');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.put(`/api/v1/buscompany/update/${busCompany.name}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}` // Include JWT token in the request headers
                }
            });
            alert('Bus company updated successfully');
        } catch (error) {
            alert('Error updating bus company');
        }
    };

    return (
        <form className="container" onSubmit={handleSubmit}>
            <h2>Update <span className="company">{busCompanyName}</span> Bus Company</h2>
            {error && <p>{error}</p>}
            {busCompany && (
                <>
                    <div className="form-group">
                        <label className="label">Name:</label>
                        <input className="input-field" type="text" name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label className="label">Address:</label>
                        <input className="input-field" type="text" name="address" value={formData.address} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label className="label">Contact Number:</label>
                        <input className="input-field" type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label className="label">Email:</label>
                        <input className="input-field" type="text" name="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label className="label">Owner Full Name:</label>
                        <input className="input-field" type="text" name="owner" value={formData.owner} onChange={handleChange} />
                    </div>
                    <button className="button" type="submit">Update</button>
                </>
            )}
        </form>
    );
};

export default MyBusCompany;
