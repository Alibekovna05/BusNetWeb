import { useEffect, useState } from "react";

const UpdateBusCompany = ({ busCompanyData, handleUpdate, handleClose }) => {


    useEffect(() => {
        console.log("Received Bus Company data in UpdateBusCompany:", busCompanyData);
        setUpdatedBusCompanyData(busCompanyData);
    }, [busCompanyData]);
    const [updatedBusCompanyData, setUpdatedBusCompanyData] = useState({
        id: busCompanyData.id || 0,
        name: busCompanyData.name || "",
        address: busCompanyData.address || "",
        contactNumber: busCompanyData.contactNumber || "",
        email: busCompanyData.email || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedBusCompanyData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        handleUpdate(updatedBusCompanyData);
        handleClose();
    };

    return (
        <div className="popup-company">
            <div className="popup-inner-company">
                <h2>Update Bus Company</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={updatedBusCompanyData.name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={updatedBusCompanyData.address}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="contactNumber"
                    placeholder="Contact Number"
                    value={updatedBusCompanyData.contactNumber}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={updatedBusCompanyData.email}
                    onChange={handleChange}
                />
                <div className="popup-buttons">
                    <button onClick={handleSubmit} className="popup-button" >Update</button>
                    <button onClick={handleClose} className="popup-button" >Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default UpdateBusCompany;
