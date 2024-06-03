
import axios from 'axios';

const DeleteBus = ({ busId, fetchBuses }) => {
    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`/api/v1/buses/${busId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchBuses(); // Fetch buses again to update the list
        } catch (error) {
            console.error('Error deleting bus:', error);
        }
    };

    return (
        <div>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete the bus?</p>
            <button onClick={handleDelete}>Yes</button>
        </div>
    );
};

export default DeleteBus;
