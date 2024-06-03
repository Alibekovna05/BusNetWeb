import  { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

function BusStationCRUD() {
    const [busStations, setBusStations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ name: "", address: "" });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setAccessToken(token);
            fetchBusStations(token);
        }
    }, []);

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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormData({ name: "", address: "" });
        setIsEditing(false);
        setEditId(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        try {
            if (isEditing) {
                await axios.put(`/api/v1/bus-stations/${editId}`, formData, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
            } else {
                await axios.post("/api/v1/bus-stations", formData, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
            }
            fetchBusStations();
            handleClose();
        } catch (error) {
            console.error('Error saving bus station:', error);
        }
    };

    const handleEdit = (busStation) => {
        setFormData({ name: busStation.name, address: busStation.address });
        setIsEditing(true);
        setEditId(busStation.id);
        setOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/v1/bus-stations/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            fetchBusStations();
        } catch (error) {
            console.error('Error deleting bus station:', error);
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <div className="container">
            <h1>Bus Station</h1>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Add Bus Station
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle>{isEditing ? "Edit Bus Station" : "Add Bus Station"}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Name"
                        fullWidth
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="address"
                        label="Address"
                        fullWidth
                        value={formData.address}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        {isEditing ? "Update" : "Add"}
                    </Button>
                </DialogActions>
            </Dialog>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {busStations.map((busStation) => (
                            <TableRow key={busStation.id}>
                                <TableCell>{busStation.id}</TableCell>
                                <TableCell>{busStation.name}</TableCell>
                                <TableCell>{busStation.address}</TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="primary"
                                            onClick={() => handleEdit(busStation)}>Edit</Button>
                                    <Button variant="outlined" color="secondary"
                                            onClick={() => handleDelete(busStation.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default BusStationCRUD;
