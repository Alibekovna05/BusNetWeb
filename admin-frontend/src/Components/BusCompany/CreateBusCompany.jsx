import { useState } from "react";

const CreateBusCompany = ({ handleCreate, handleClose }) => {
    const [busCompanyData, setBusCompanyData] = useState({
        name: "",
        address: "",
        contactNumber: "",
        email: "",
        owner: {
            firstname: "",
            lastname: "",
            email: "",
            password: ""
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBusCompanyData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleOwnerChange = (e) => {
        const { name, value } = e.target;
        setBusCompanyData((prevData) => ({
            ...prevData,
            owner: {
                ...prevData.owner,
                [name]: value,
            },
        }));
    };

    const handleSubmit = () => {
        handleCreate(busCompanyData);
        handleClose();
    };

    return (
        <div className="popup-company">
            <div className="popup-inner-company">
                <h2>Create Bus Company</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={busCompanyData.name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={busCompanyData.address}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="contactNumber"
                    placeholder="Contact Number"
                    value={busCompanyData.contactNumber}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={busCompanyData.email}
                    onChange={handleChange}
                />
                <h3>Owner Details</h3>
                <input
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    value={busCompanyData.owner.firstname}
                    onChange={handleOwnerChange}
                />
                <input
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    value={busCompanyData.owner.lastname}
                    onChange={handleOwnerChange}
                />
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={busCompanyData.owner.email}
                    onChange={handleOwnerChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={busCompanyData.owner.password}
                    onChange={handleOwnerChange}
                />
                <div className="popup-buttons">
                    <button className="popup-button" onClick={handleSubmit}>Create</button>
                    <button className="popup-button" onClick={handleClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default CreateBusCompany;
