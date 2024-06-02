
const DeleteBusSchedule = ({ busScheduleId, confirmDelete, handleClose }) => {
    const handleConfirm = () => {
        confirmDelete(busScheduleId);
        handleClose();
    };

    return (
        <div className="popup-schedule">
            <div className="popup-inner-schedule">
                <h2>Delete Bus Schedule</h2>
                <p>Are you sure you want to delete this bus schedule?</p>
                <button onClick={handleConfirm}>Yes</button>
                <button onClick={handleClose}>No</button>
            </div>
        </div>
    );
};

export default DeleteBusSchedule;
