const DeleteBusCompany = ({ busCompanyId, confirmDelete, handleClose }) => {
    const handleConfirm = () => {
        confirmDelete(busCompanyId);
        handleClose();
    };

    return (
        <div className="popup-company">
            <div className="popup-inner-company">
                <h2>Confirm Deletion</h2>
                <p>Are you sure you want to delete this bus company?</p>
                <div className="popup-buttons">
                    <button className="popup-button"  onClick={handleConfirm}>Yes</button>
                    <button className="popup-button" onClick={handleClose}>No</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteBusCompany;
