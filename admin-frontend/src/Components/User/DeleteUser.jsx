import React from "react";

const DeleteUser = ({ userId, handleDelete, handleClose }) => {


    const [ setConfirmation] = React.useState("");

    const handleChange = (e) => {
        const { value } = e.target;
        setConfirmation(value);
    };

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Confirm Delete</h2>
                <p>Are you sure you want to delete User with ID {userId}?</p>
                <input
                    type="text"
                    value={userId} // extracted user ID
                    onChange={handleChange}
                    style={{ display: "none" }}
                />
                <div className="popup-buttons">
                    <button className="popup-button" onClick={() => handleDelete(userId)}>Yes</button>
                    <button className="popup-button" onClick={handleClose}>No</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteUser;
