import { useState } from "react";

const CreateUser = ({ handleCreate, handleClose }) => {
    const [userData, setUserData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        enabled: false,
        accountLocked: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevUserData => ({
            ...prevUserData,
            [name]: value
        }));
    };

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevUserData => ({
            ...prevUserData,
            [name]: value === "true"
        }));
    };

    const handleSubmit = () => {
        handleCreate(userData);
        handleClose();
    };

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Create New User</h2>
                <input
                    type="text"
                    name="firstname"
                    placeholder="Firstname"
                    value={userData.firstname}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="lastname"
                    placeholder="Lastname"
                    value={userData.lastname}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={userData.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={userData.password}
                    onChange={handleChange}
                />

                <select
                    name="enabled"
                    value={userData.enabled}
                    onChange={handleSelectChange}
                >
                    <option value="true">Enabled</option>
                    <option value="false">Disabled</option>
                </select>
                <select
                    name="accountLocked"
                    value={userData.accountLocked}
                    onChange={handleSelectChange}
                >
                    <option value="true">Locked</option>
                    <option value="false">Unlocked</option>
                </select>
                <div className="popup-buttons">
                    <button className="popup-button" onClick={handleSubmit}>Create</button>
                    <button className="popup-button" onClick={handleClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default CreateUser;
