import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import UpdateBooking from './UpdateBooking';
import DeleteBooking from './DeleteBooking';
import CreateBooking from './CreateBooking';
import './Bookings.css';

export default function BookingsTable() {
    const [bookings, setBookings] = useState([]);
    const [createBookingOpen, setCreateBookingOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setAccessToken(token);
            fetchBookings(token);
        }
    }, []);

    const fetchBookings = (token) => {
        axios.get("/api/v1/bookings", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setBookings(response.data);
            })
            .catch(error => {
                console.error("Error fetching bookings:", error);
            });
    };

    const handleDelete = (bookingId) => {
        setDeleteConfirm(bookingId);
    };

    const handleEdit = (booking) => {
        setEditData(booking);
    };

    const handleCreate = (bookingData) => {
        axios.post("/api/v1/bookings", bookingData, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(() => {
                fetchBookings(accessToken);
            })
            .catch(error => {
                console.error("Error creating booking:", error);
            });
    };

    const confirmDelete = (bookingId) => {
        axios.delete(`/api/v1/bookings/${bookingId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(() => {
                fetchBookings(accessToken);
            })
            .catch(error => {
                console.error("Error deleting booking:", error);
            });
    };

    const handleUpdate = (updatedBookingData) => {
        axios.put(`/api/v1/bookings/${updatedBookingData.id}`, updatedBookingData, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(() => {
                fetchBookings(accessToken);
            })
            .catch(error => {
                console.error("Error updating booking:", error);
            });
    };

    const handleClose = () => {
        setEditData(null);
        setDeleteConfirm(null);
        setCreateBookingOpen(false);
    };

    const filterBookingsByStatus = async (status) => {
        try {
            const response = await axios.get(`/api/v1/bookings/status?status=${status}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setBookings(response.data);
        } catch (error) {
            console.error('Error filtering bookings by status:', error);
        }
    };

    const sortBookings = (direction) => {
        const sortedBookings = [...bookings].sort((a, b) => {
            const dateA = new Date(a.bookingDate);
            const dateB = new Date(b.bookingDate);
            return direction === 'asc' ? dateA - dateB : dateB - dateA;
        });
        setBookings(sortedBookings);
    };

    return (
        <div className="BookingsTable">
            <h1>Bookings</h1>
            <div className="add-button">
                <h4>Add New Booking</h4>
                <div className="add-icon" onClick={() => setCreateBookingOpen(true)}>
                    <AddIcon />
                </div>
            </div>
            <div className="button-group">
                <button onClick={() => fetchBookings(accessToken)}>All</button>
                <button onClick={() => filterBookingsByStatus('PENDING_PAYMENT')}>Pending Payment</button>
                <button onClick={() => filterBookingsByStatus('CONFIRMED')}>Confirmed</button>
                <button onClick={() => filterBookingsByStatus('CANCELLED')}>Cancelled</button>
            </div>
            <div className="sort-group">
                <button onClick={() => sortBookings('asc')}>Sort by Date (Asc)</button>
                <button onClick={() => sortBookings('desc')}>Sort by Date (Desc)</button>
            </div>
            <div className="TableContainerWrapper">
                <TableContainer component={Paper} className="custom-table-container">
                    <Table aria-label="simple table" className="table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Booking ID</TableCell>
                                <TableCell align="left">User ID</TableCell>
                                <TableCell align="left">Bus Schedule ID</TableCell>
                                <TableCell align="left">Booking Date</TableCell>
                                <TableCell align="left" className="short-cell">QR Code Data Img</TableCell>
                                <TableCell align="left" className="short-cell">QR Code Data</TableCell>
                                <TableCell align="left">Status</TableCell>
                                <TableCell align="left">Delete</TableCell>
                                <TableCell align="left">Update</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookings.map((booking) => (
                                <TableRow key={booking.id}>
                                    <TableCell align="left">{booking.id}</TableCell>
                                    <TableCell align="left">{booking.userId}</TableCell>
                                    <TableCell align="left">{booking.busScheduleId}</TableCell>
                                    <TableCell align="left">{booking.bookingDate}</TableCell>
                                    <TableCell align="left" className="short-cell">{booking.qrCodeDataImg}</TableCell>
                                    <TableCell align="left" className="short-cell">{booking.qrCodeData}</TableCell>
                                    <TableCell align="left">{booking.status}</TableCell>
                                    <TableCell align="left">
                                        <DeleteIcon
                                            className="icon"
                                            onClick={() => handleDelete(booking.id)}
                                        />
                                    </TableCell>
                                    <TableCell align="left">
                                        <EditIcon
                                            className="icon"
                                            onClick={() => handleEdit(booking)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {createBookingOpen && (
                    <CreateBooking
                        onClose={handleClose}
                        onCreate={handleCreate}
                    />
                )}
                {editData && (
                    <UpdateBooking
                        data={editData}
                        onClose={handleClose}
                        onUpdate={handleUpdate}
                    />
                )}
                {deleteConfirm && (
                    <DeleteBooking
                        bookingId={deleteConfirm}
                        onClose={handleClose}
                        onConfirm={confirmDelete}
                    />
                )}
            </div>
        </div>
    );
}
