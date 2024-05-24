import React, { useEffect, useState } from "react";
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
import UpdateBusCompany from "./UpdateBusCompany";
import DeleteBusCompany from "./DeleteBusCompany";
import CreateBusCompany from "./CreateBusCompany";
import "./BusCompany.css";

export default function BusCompanyTable() {
    const [busCompanies, setBusCompanies] = useState([]);
    const [createBusCompanyOpen, setCreateBusCompanyOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        // Retrieve token from local storage
        const token = localStorage.getItem("token");
        if (token) {
            setAccessToken(token);
            // Fetch bus companies from the backend API
            axios.get("/api/v1/admin/buscompanies", {
                headers: {
                    Authorization: `Bearer ${token}` // Include JWT token
                }
            })
                .then(response => {
                    setBusCompanies(response.data);
                })
                .catch(error => {
                    console.error("Error fetching bus companies:", error);
                });
        }
    }, []);

    const handleDelete = (busCompanyId) => {
        console.log("Delete Bus Company ID:", busCompanyId); // Log bus company ID
        setDeleteConfirm(busCompanyId);
    };

    const handleEdit = (busCompany) => {
        console.log("Edit Bus Company Object:", busCompany);
        setEditData(busCompany);
    };

    const handleCreate = (busCompanyData) => {
        axios.post("/api/v1/admin/buscompany", busCompanyData, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(() => {
                fetchBusCompanies();
            })
            .catch(error => {
                console.error("Error creating bus company:", error);
            });
    };

    const confirmDelete = (busCompanyId) => {
        axios.delete(`/api/v1/admin/buscompany/${busCompanyId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(() => {
                console.log("Bus company deleted successfully");
                fetchBusCompanies(); // Fetch bus companies again
            })
            .catch(error => {
                console.error("Error deleting bus company:", error);
            });
    };

    const handleUpdate = (updatedBusCompanyData) => {
        console.log("Updating bus company with data:", updatedBusCompanyData);
        axios.put(`/api/v1/admin/buscompany/${updatedBusCompanyData.id}`, updatedBusCompanyData, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(() => {
                console.log("Bus company updated successfully");
                fetchBusCompanies(); // Fetch bus companies again
            })
            .catch(error => {
                console.error("Error updating bus company:", error);
            });
    };

    const fetchBusCompanies = () => {
        axios.get("/api/v1/admin/buscompanies", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(response => {
                setBusCompanies(response.data);
            })
            .catch(error => {
                console.error("Error fetching bus companies:", error);
            });
    };

    const handleClose = () => {
        setEditData(null);
        setDeleteConfirm(null);
        setCreateBusCompanyOpen(false);
    };

    const makeStyle = (status) => {
        if (status === 'Enabled') {
            return {
                background: 'rgb(145 254 159 / 47%)',
                color: 'green',
            };
        } else {
            return {
                background: '#ffadad8f',
                color: 'red',
            };
        }
    };

    const makeLockStyle = (locked) => {
        if (locked === 'Unlocked') {
            return {
                background: 'rgb(145 254 159 / 47%)',
                color: 'green',
            };
        } else {
            return {
                background: '#ffadad8f',
                color: 'red',
            };
        }
    };

    const getEnabledStatus = (enabled) => {
        return enabled ? 'Enabled' : 'Disabled';
    };

    const getLockStatus = (locked) => {
        return locked ? 'Locked' : 'Unlocked';
    };

    return (
        <div className="BusCompanyTable">
            <h1>Bus Companies</h1>
            <div className="add-company-button">
                <h4>Add New Bus Company</h4>
                <div className="add-company-icon" onClick={() => setCreateBusCompanyOpen(true)}>
                    <AddIcon />
                </div>
            </div>
            <div className="BusCompanyTableContainerWrapper">
                <TableContainer component={Paper} className="company-table-container">
                    <Table aria-label="simple table" className="custom-table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Bus Company ID</TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Address</TableCell>
                                <TableCell align="left">Contact Number</TableCell>
                                <TableCell align="left">Email</TableCell>
                                <TableCell align="left">Owner</TableCell>
                                <TableCell align="left">Status</TableCell>
                                <TableCell align="left">Enabled</TableCell>
                                <TableCell align="left">Delete</TableCell>
                                <TableCell align="left">Update</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {busCompanies.map((busCompany) => (
                                <TableRow key={busCompany.id} className="custom-table-row">
                                    <TableCell component="th" scope="row">{busCompany.id}</TableCell>
                                    <TableCell align="left">{busCompany.name}</TableCell>
                                    <TableCell align="left">{busCompany.address}</TableCell>
                                    <TableCell align="left">{busCompany.contactNumber}</TableCell>
                                    <TableCell align="left">{busCompany.email}</TableCell>
                                    <TableCell align="left">{`${busCompany.owner.firstname} ${busCompany.owner.lastname}`}</TableCell>
                                    <TableCell align="left" style={makeLockStyle(getLockStatus(busCompany.owner.accountLocked))}>
                                        {getLockStatus(busCompany.owner.accountLocked)}
                                    </TableCell>
                                    <TableCell align="left" style={makeStyle(getEnabledStatus(busCompany.owner.enabled))}>
                                        {getEnabledStatus(busCompany.owner.enabled)}
                                    </TableCell>
                                    <TableCell align="left"><DeleteIcon className="delete-company-icon"
                                                                        onClick={() => handleDelete(busCompany.id)} /></TableCell>
                                    <TableCell align="left"><EditIcon className="edit-company-icon"
                                                                      onClick={() => handleEdit(busCompany)} /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {editData && (
                    <UpdateBusCompany busCompanyData={editData} handleUpdate={handleUpdate} handleClose={handleClose} />
                )}
                {deleteConfirm && (
                    <DeleteBusCompany busCompanyId={deleteConfirm} handleDelete={confirmDelete} handleClose={handleClose} />
                )}
                {createBusCompanyOpen && (
                    <CreateBusCompany handleCreate={handleCreate} handleClose={handleClose} />
                )}
            </div>
        </div>
    );
}
