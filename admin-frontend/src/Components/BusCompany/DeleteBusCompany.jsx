import React from "react";

const DeleteBusCompany = ({ busCompanyId, handleDelete, handleClose }) => {

    const [ setConfirmation] = React.useState("");

    const handleChange = (e) => {
        const { value } = e.target;
        setConfirmation(value);
    };

    return (
        <div className="popup-company">
            <div className="popup-inner-company">
                <h2>Confirm Deletion</h2>
                <p>Are you sure you want to delete this bus company?</p>
                <input
                    type="text"
                    value={busCompanyId} // Use the extracted bu company ID
                    onChange={handleChange}
                    style={{display: "none"}}
                />
                <div className="popup-buttons">
                    <button className="popup-button" onClick={() => handleDelete(busCompanyId)}>Yes</button>
                    <button className="popup-button" onClick={handleClose}>No</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteBusCompany;
