import { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import UpdateBusSchedule from "./UpdateBusSchedule";
import DeleteBusSchedule from "./DeleteBusSchedule";
import CreateBusSchedule from "./CreateBusSchedule";
import "./BusSchedule.css";

export default function BusScheduleTable() {
    const [busSchedules, setBusSchedules] = useState([]);
    const [createBusScheduleOpen, setCreateBusScheduleOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [accessToken, setAccessToken] = useState("");
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(true);
    const [busStations, setBusStations] = useState([]);


    useEffect(() => {
        // Retrieve token from local storage
        const token = localStorage.getItem("token");
        if (token) {
            setAccessToken(token);
            // Fetch bus schedules from the backend API
            fetchAllBusSchedules(token);
            fetchBusStations(token);
        }
    }, []);
    const fetchAllBusSchedules = async (token) => {
        try {
            const response = await axios.get('/api/v1/bus-schedules', {
                headers: {
                    Authorization: `Bearer ${token}` // Include JWT token
                }
            });
            setBusSchedules(response.data);
        } catch (error) {
            console.error('Error fetching bus schedules:', error);
        }
    };
    const fetchBusStations = async (token) => {
        try {
            const response = await axios.get("/api/v1/bus-stations", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setBusStations(response.data);
        } catch (error) {
            console.error("Error fetching bus stations:", error);
        } finally {
            setLoading(false);
        }
    };



    const handleDelete = (busScheduleId) => {
        setDeleteConfirm(busScheduleId);
    };

    const handleEdit = (busSchedule) => {
        setEditData(busSchedule);
    };

    const handleCreate = (busScheduleData) => {
        axios.post("/api/v1/bus-schedules", busScheduleData, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(() => {
                fetchAllBusSchedules(accessToken);
            })
            .catch(error => {
                console.error("Error creating bus schedule:", error);
            });
    };

    const confirmDelete = (busScheduleId) => {
        axios.delete(`/api/v1/bus-schedules/${busScheduleId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(() => {
                fetchAllBusSchedules(accessToken); // Fetch bus schedules again after change
            })
            .catch(error => {
                console.error("Error deleting bus schedule:", error);
            });
    };

    const handleUpdate = (updatedBusScheduleData) => {
        axios.put(`/api/v1/bus-schedules/${updatedBusScheduleData.id}`, updatedBusScheduleData, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(() => {
                fetchAllBusSchedules(accessToken); // Fetch bus schedules again
            })
            .catch(error => {
                console.error("Error updating bus schedule:", error);
            });
    };

    const handleClose = () => {
        setEditData(null);
        setDeleteConfirm(null);
        setCreateBusScheduleOpen(false);
    };

    const fetchUpcomingBusSchedules = async () => {
        try {
            const response = await axios.get('/api/v1/bus-schedules/upcoming', {
                headers: {
                    Authorization: `Bearer ${accessToken}` // Include JWT token
                }
            });
            setBusSchedules(response.data);
        } catch (error) {
            console.error('Error fetching upcoming bus schedules:', error);
        }
    };

    const fetchCompletedBusSchedules = async () => {
        try {
            const response = await axios.get('/api/v1/bus-schedules/completed', {
                headers: {
                    Authorization: `Bearer ${accessToken}` // Include JWT token
                }
            });
            setBusSchedules(response.data);
        } catch (error) {
            console.error('Error fetching completed bus schedules:', error);
        }
    };

    const fetchInTransitBusSchedules = async () => {
        try {
            const response = await axios.get('/api/v1/bus-schedules/in-transit', {
                headers: {
                    Authorization: `Bearer ${accessToken}` // Include JWT token
                }
            });
            setBusSchedules(response.data);
        } catch (error) {
            console.error('Error fetching in-transit bus schedules:', error);
        }
    };
    const fetchBusSchedules = async () => {
        try {
            const response = await axios.get('/api/v1/bus-schedules', {
                headers: {
                    Authorization: `Bearer ${accessToken}` // Include JWT token
                }
            });
            setBusSchedules(response.data);
        } catch (error) {
            console.error('Error fetching bus schedules:', error);
        }
    };

    const searchBusSchedules = async () => {
        try {
            const response = await axios.get(`/api/v1/bus-schedules/search?keyword=${keyword}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}` // Include JWT token
                }
            });
            setBusSchedules(response.data);
        } catch (error) {
            console.error('Error searching bus schedules:', error);
        }
    };

    const sortBusSchedules = async (direction) => {
        try {
            const response = await axios.get(`/api/v1/bus-schedules/sorted?sortBy=departTime&direction=${direction}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setBusSchedules(response.data);
        } catch (error) {
            console.error('Error sorting bus schedules:', error);
        }
    };

    return (
        <div className="BusScheduleTable">
            <h1>Bus Schedules</h1>
            <div className="add-schedule-button">
                <h4>Add New Bus Schedule</h4>
                <div className="add-schedule-icon" onClick={() => setCreateBusScheduleOpen(true)}>
                    <AddIcon />
                </div>
            </div>
            <div className="button-group">
                <button onClick={fetchBusSchedules}>All</button>
                <button onClick={fetchUpcomingBusSchedules}>Upcoming</button>
                <button onClick={fetchCompletedBusSchedules}>Completed</button>
                <button onClick={fetchInTransitBusSchedules}>In-Transit</button>
            </div>
            <div className="search-group">
                <input
                    type="text"
                    placeholder="Search..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button onClick={searchBusSchedules}>Search</button>
            </div>
            <div className="sort-group">
                <button onClick={() => sortBusSchedules('asc')}>Sort by Date (Asc)</button>
                <button onClick={() => sortBusSchedules('desc')}>Sort by Date (Desc)</button>
            </div>
            <div className="BusScheduleTableContainerWrapper">
                <TableContainer component={Paper} className="schedule-table-container">
                    <Table aria-label="simple table" className="schedule-table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Schedule ID</TableCell>
                                <TableCell align="left">Depart Time</TableCell>
                                <TableCell align="left">Arrival Time</TableCell>
                                <TableCell align="left">Depart Station</TableCell>
                                <TableCell align="left">Arrival Station</TableCell>
                                <TableCell align="left">Bus Number</TableCell>
                                <TableCell align="left">Bus Company</TableCell>
                                <TableCell align="left">Total Seats</TableCell>
                                <TableCell align="left">Available Seats</TableCell>
                                <TableCell align="left">Price</TableCell>
                                <TableCell align="left">Delete</TableCell>
                                <TableCell align="left">Update</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {busSchedules.map((busSchedule) => (
                                <TableRow key={busSchedule.scheduleId}>
                                    <TableCell align="left">{busSchedule.id}</TableCell>
                                    <TableCell align="left">{new Date(busSchedule.departTime).toLocaleString()}</TableCell>
                                    <TableCell align="left">{new Date(busSchedule.arrivalTime).toLocaleString()}</TableCell>
                                    <TableCell align="left">{busSchedule.departStation}</TableCell>
                                    <TableCell align="left">{busSchedule.arrivalStation}</TableCell>
                                    <TableCell align="left">{busSchedule.busNumber}</TableCell>
                                    <TableCell align="left">{busSchedule.busCompanyName}</TableCell>
                                    <TableCell align="left">{busSchedule.totalSeats}</TableCell>
                                    <TableCell align="left">{busSchedule.availableSeats}</TableCell>
                                    <TableCell align="left">{busSchedule.price}</TableCell>
                                    <TableCell align="left">
                                        <div className="delete-icon" onClick={() => handleDelete(busSchedule.scheduleId)}>
                                            <DeleteIcon />
                                        </div>
                                    </TableCell>
                                    <TableCell align="left">
                                        <div className="edit-icon" onClick={() => handleEdit(busSchedule)}>
                                            <EditIcon />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            {editData && (
                <UpdateBusSchedule busSchedule={editData} onClose={handleClose} onSave={handleUpdate}  busStations={busStations} />
            )}
            {createBusScheduleOpen && (
                <CreateBusSchedule onClose={handleClose} onCreate={handleCreate}  busStations={busStations}/>
            )}
            {deleteConfirm && (
                <DeleteBusSchedule busScheduleId={deleteConfirm} onClose={handleClose} onDelete={confirmDelete} />
            )}
        </div>
    );
}
