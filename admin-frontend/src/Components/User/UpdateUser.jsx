import { useEffect, useState } from "react";

const UpdateUser = ({ userData, handleUpdate, handleClose }) => {
    useEffect(() => {
        console.log("Received user data in UpdateUser:", userData);
    }, [userData]);

    const [newUserData, setNewUserData] = useState({
        id: userData.id || 0,
        firstname: userData.firstname || "",
        lastname: userData.lastname || "",
        email: userData.email || "",
        password: userData.password || "",
        accountLocked: userData.accountLocked ? "true" : "false",
        enabled: userData.enabled ? "true" : "false",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUserData(prevUserData => ({
            ...prevUserData,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        const formattedData = {
            ...newUserData,
            accountLocked: newUserData.accountLocked === "true",
            enabled: newUserData.enabled === "true"
        };
        handleUpdate(formattedData);
        handleClose();
    };

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Update User Data</h2>
                <input
                    type="text"
                    name="firstname"
                    placeholder="Firstname"
                    value={newUserData.firstname}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="lastname"
                    placeholder="Lastname"
                    value={newUserData.lastname}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={newUserData.email}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="password"
                    placeholder="Password"
                    value={newUserData.password}
                    onChange={handleChange}
                />
                <select
                    name="accountLocked"
                    value={newUserData.accountLocked}
                    onChange={handleChange}
                >
                    <option value="true">Locked</option>
                    <option value="false">Not Locked</option>
                </select>
                <select
                    name="enabled"
                    value={newUserData.enabled}
                    onChange={handleChange}
                >
                    <option value="true">Enabled</option>
                    <option value="false">Disabled</option>
                </select>
                <div className="popup-buttons">
                    <button className="popup-button" onClick={handleSubmit}>Update</button>
                    <button className="popup-button" onClick={handleClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default UpdateUser;
