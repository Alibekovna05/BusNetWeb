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
import AddIcon  from '@mui/icons-material/Add';
import UpdateUser from "./UpdateUser";
import DeleteUser from "./DeleteUser";
import CreateUser from "./CreateUser";
import "./User.css";


export default function BasicTable() {

    const [users , setUsers] = useState([]);
    const [createUserOpen, setCreateUserOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        // Retrieve token from local storage
        const token = localStorage.getItem("token");
        if (token) {
            setAccessToken(token);
            // Fetch users from the backend API
            axios.get("/api/v1/admin/users", {
                headers: {
                    Authorization: `Bearer ${token}` // Include JWT token
                }
            })
                .then(response => {
                    setUsers(response.data);
                })
                .catch(error => {
                    console.error("Error fetching users:", error);
                });
        }
    }, []);

    const handleDelete = (userId) => {
        console.log("Delete User ID:", userId); // Log user ID
        setDeleteConfirm(userId);
    };

    const handleEdit = (user) => {
        console.log("Edit User Object:", user);
        setEditData(user);
    };
    const handleCreate = (userData) => {
        axios.post("/api/v1/admin/user", userData, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(() => {
                fetchUsers();
            })
            .catch(error => {
                console.error("Error creating user:", error);
            });
    };
    const confirmDelete = (userId) => {
        axios.delete(`/api/v1/admin/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(() => {
                console.log("User deleted successfully");
                fetchUsers(); // Fetch users again
            })
            .catch(error => {
                console.error("Error deleting user:", error);
            });
    };

    const handleUpdate = (updatedUserData) => {
        console.log("Updating user with data:", updatedUserData);
        axios.put(`/api/v1/admin/user/${updatedUserData.id}`, updatedUserData, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(() => {
                console.log("User updated successfully");
                fetchUsers(); // Fetch users again
            })
            .catch(error => {
                console.error("Error updating user:", error);
            });
    };

    const fetchUsers = () => {
        axios.get("/api/v1/admin/users", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error("Error fetching users:", error);
            });
    };

    const handleClose = () => {
        setEditData(null);
        setDeleteConfirm(null);
        setCreateUserOpen(false);
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
        <div className="Table">
            <h1>Users</h1>
            <div className="add-user-button">
                <h4>Add New User</h4>
                <div className="add-user-icon" onClick={() => setCreateUserOpen(true)}>
                    <AddIcon/>
                </div>
            </div>
            <div className="TableContainerWrapper">
                <TableContainer component={Paper} className="custom-table-container">
                    <Table aria-label="simple table" className="custom-table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">User ID</TableCell>
                                <TableCell align="left">Firstname</TableCell>
                                <TableCell align="left">Lastname</TableCell>
                                <TableCell align="left">Email</TableCell>
                                <TableCell align="left">Password</TableCell>
                                <TableCell align="left">Status</TableCell>
                                <TableCell align="left">Enabled</TableCell>
                                <TableCell align="left">Delete</TableCell>
                                <TableCell align="left">Update</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id} className="custom-table-row">
                                    <TableCell component="th" scope="row">{user.id}</TableCell>
                                    <TableCell component="th" scope="row">{user.firstname}</TableCell>
                                    <TableCell align="left" className="phone-cell">{user.lastname}</TableCell>
                                    <TableCell align="left">{user.email}</TableCell>
                                    <TableCell align="left" className="password-cell">{user.password}</TableCell>
                                    <TableCell align="left" style={makeLockStyle(getLockStatus(user.accountLocked))}>
                                        {getLockStatus(user.isAccountNonLocked)}
                                    </TableCell>
                                    <TableCell align="left" style={makeStyle(getEnabledStatus(user.enabled))}>
                                        {getEnabledStatus(user.enabled)}
                                    </TableCell>
                                    <TableCell align="left"><DeleteIcon className="delete-icon"
                                                                        onClick={() => handleDelete(user.id)}/></TableCell>
                                    <TableCell align="left"><EditIcon className="edit-icon"
                                                                      onClick={() => handleEdit(user)}/></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {editData && (
                    <UpdateUser userData={editData} handleUpdate={handleUpdate} handleClose={handleClose}/>
                )}
                {deleteConfirm && (
                    <DeleteUser userId={deleteConfirm} handleDelete={confirmDelete} handleClose={handleClose}/>
                )}
                {createUserOpen && (
                    <CreateUser handleCreate={handleCreate} handleClose={handleClose}/>
                )}
            </div>
        </div>
    );
}
