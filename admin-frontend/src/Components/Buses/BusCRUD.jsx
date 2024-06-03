import  { useEffect, useState } from "react";
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
import UpdateBus from "./UpdateBus";
import DeleteBus from "./DeleteBus";
import CreateBus from "./CreateBus";
import "./Bus.css";

const BusCRUD = () => {
    const [buses, setBuses] = useState([]);
    const [createBusOpen, setCreateBusOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [accessToken, setAccessToken] = useState("");


    useEffect(() => {
        // Retrieve token from local storage
        const token = localStorage.getItem("token");
        if (token) {
            setAccessToken(token);
            axios.get("/api/v1/buses", {
                headers: {
                    Authorization: `Bearer ${token}` // Include JWT token
                }
            })
                .then(response => {
                    setBuses(response.data);
                })
                .catch(error => {
                    console.error("Error fetching buses:", error);
                });
        }
    }, []);

    const fetchBuses = async () => {
        try {
            const response = await axios.get("/api/v1/buses", {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setBuses(response.data);
        } catch (error) {
            console.error("Error fetching buses:", error);
        }
    };

    const handleDelete = (busId) => {
        setDeleteConfirm(busId);
    };

    const handleEdit = (bus) => {
        console.log("Edit Bus Object:", bus);
        setEditData(bus);
    };

    const handleCreate = (busData) => {
        axios.post("/api/v1/buses", busData, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(() => {
                fetchBuses();
            })
            .catch(error => {
                console.error("Error creating bus:", error);
            });
    };

    const confirmDelete = (busId) => {
        axios.delete(`/api/v1/buses/${busId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(() => {
                fetchBuses();
            })
            .catch(error => {
                console.error("Error deleting bus:", error);
            });
    };

    const handleUpdate = (updatedBusData) => {
        axios.put(`/api/v1/buses/${updatedBusData.id}`, updatedBusData, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(() => {
                fetchBuses();
            })
            .catch(error => {
                console.error("Error updating bus:", error);
            });
    };

    const handleClose = () => {
        setEditData(null);
        setDeleteConfirm(null);
        setCreateBusOpen(false);
    };

    return (
        <div className="Bus">
            <h1>Buses</h1>
            <div className="add-bus-button">
                <h4>Add New Bus</h4>
                <div className="add-bus-icon" onClick={() => setCreateBusOpen(true)}>
                    <AddIcon/>
                </div>
            </div>
            <div className="TableContainerWrapper">
                <TableContainer component={Paper} className="custom-table-container">
                    <Table aria-label="simple table" className="custom-table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Bus ID</TableCell>
                                <TableCell align="left">Model</TableCell>
                                <TableCell align="left">License Plate</TableCell>
                                <TableCell align="left">Capacity</TableCell>
                                <TableCell align="left">Color</TableCell>
                                <TableCell align="left">Delete</TableCell>
                                <TableCell align="left">Update</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {buses.map((bus) => (
                                <TableRow key={bus.id} className="custom-table-row">
                                    <TableCell component="th" scope="row">{bus.id}</TableCell>
                                    <TableCell align="left">{bus.model}</TableCell>
                                    <TableCell align="left">{bus.licensePlate}</TableCell>
                                    <TableCell align="left">{bus.capacity}</TableCell>
                                    <TableCell align="left">{bus.color}</TableCell>
                                    <TableCell align="left"><DeleteIcon className="delete-icon"
                                                                        onClick={() => handleDelete(bus.id)}/></TableCell>
                                    <TableCell align="left"><EditIcon className="edit-icon"
                                                                      onClick={() => handleEdit(bus)}/></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {editData && (
                    <UpdateBus busData={editData} handleUpdate={handleUpdate} handleClose={handleClose}/>
                )}
                {deleteConfirm && (
                    <DeleteBus busId={deleteConfirm} handleDelete={confirmDelete} handleClose={handleClose}/>
                )}
                {createBusOpen && (
                    <CreateBus handleCreate={handleCreate} handleClose={handleClose}/>
                )}
            </div>
        </div>
    );
}

export default BusCRUD;
