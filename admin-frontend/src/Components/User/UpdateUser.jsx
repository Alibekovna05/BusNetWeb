import  {useEffect, useState} from "react";

const UpdateUser = ({ userData, handleUpdate, handleClose }) => {
    useEffect(() => {
        console.log("Received user data in UpdateUser:", userData);
    }, [userData]);
    const [newUserData, setNewUserData] = useState({
        id: userData.id || 0,
        username: userData.username || "",
        email: userData.email || "",
        password: userData.password || "",
        phoneNumber: userData.phoneNumber || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUserData(prevUserData => ({
            ...prevUserData,
            [name]: value
        }));
    };
    const handleSubmit = () => {
        handleUpdate(newUserData);
        handleClose();
    };

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Update User Data</h2>
                <input
                    type="text"
                    name="username"
                    value={newUserData.username}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="email"
                    value={newUserData.email}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="password"
                    value={newUserData.password}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="phoneNumber"
                    value={newUserData.phoneNumber}
                    onChange={handleChange}
                />
                <div className="popup-buttons">
                    <button onClick={handleSubmit}>Update</button>
                    <button onClick={handleClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default UpdateUser;
