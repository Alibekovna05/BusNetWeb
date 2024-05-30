import { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function Payment() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [accessToken, setAccessToken] = useState("");
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ bookingId: "", amount: "", status: "" });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setAccessToken(token);
            fetchPayments(token);
        }
    }, []);

    const fetchPayments = async (token) => {
        try {
            const response = await axios.get('/api/v1/payments', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPayments(response.data);
        } catch (error) {
            console.error('Error fetching payments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormData({ bookingId: "", amount: "", status: "" });
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
                await axios.put(`/api/v1/payments/${editId}`, formData, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
            } else {
                await axios.post('/api/v1/payments/process', formData, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
            }
            fetchPayments(accessToken);
            handleClose();
        } catch (error) {
            console.error('Error saving payment:', error);
        }
    };

    const handleEdit = (payment) => {
        setFormData({ bookingId: payment.bookingId, amount: payment.amount, status: payment.status });
        setIsEditing(true);
        setEditId(payment.id);
        setOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/v1/payments/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            fetchPayments(accessToken);
        } catch (error) {
            console.error('Error deleting payment:', error);
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <div className="PaymentDashboard">
            <h1>Payments</h1>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Add Payment
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Booking ID</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Payment Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {payments.map(payment => (
                            <TableRow key={payment.id}>
                                <TableCell>{payment.id}</TableCell>
                                <TableCell>{payment.bookingId}</TableCell>
                                <TableCell>{payment.amount}</TableCell>
                                <TableCell>{new Date(payment.paymentDate).toLocaleString()}</TableCell>
                                <TableCell>{payment.status}</TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="primary" onClick={() => handleEdit(payment)}>Edit</Button>
                                    <Button variant="outlined" color="secondary" onClick={() => handleDelete(payment.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{isEditing ? "Edit Payment" : "Add Payment"}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="bookingId"
                        label="Booking ID"
                        type="number"
                        fullWidth
                        value={formData.bookingId}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="amount"
                        label="Amount"
                        type="number"
                        fullWidth
                        value={formData.amount}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="status"
                        label="Status"
                        type="text"
                        fullWidth
                        value={formData.status}
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
        </div>
    );
}
