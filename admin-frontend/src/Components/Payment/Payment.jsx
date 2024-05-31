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
import Cards from "../Cards/Cards";
import styles from './Payment.module.css';
import { UilUsdSquare, UilMoneyWithdrawal, UilClipboardAlt } from "@iconscout/react-unicons";


export default function Payment() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [accessToken, setAccessToken] = useState("");
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ bookingId: 0, amount: "", status: "" });
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
        setFormData({ bookingId: 0, amount: "", status: "" });
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
                await axios.post(`/api/v1/payments/process?bookingId=${formData.bookingId}&amount=${formData.amount}`, formData, {
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

    const transformPaymentsToCardData = (payments) => {
        const totalPaymentsSum = payments.reduce((acc, payment) => acc + payment.amount, 0);
        const pendingPayments = payments.filter(payment => payment.status === "PENDING");
        const completedPayments = payments.filter(payment => payment.status === "COMPLETED");
        const pendingPaymentsSum = pendingPayments.reduce((acc, payment) => acc + payment.amount, 0);
        const completedPaymentsSum = completedPayments.reduce((acc, payment) => acc + payment.amount, 0);
        return [
            {
                title: "Total Payments",
                color: {
                    backGround: "linear-gradient(180deg, #4CAF50 0%, #2E7D32 100%)",
                    boxShadow: "0px 10px 20px 0px rgba(76, 175, 80, 0.3)",
                },
                barValue: 100,
                value: totalPaymentsSum.toFixed(2),  // Displaying the total sum
                png: UilUsdSquare,
                series: [
                    {
                        name: "Payments",
                        data: payments.map(payment => payment.amount),
                    },
                ],
            },
            {
                title: "Pending",
                color: {
                    backGround: "linear-gradient(180deg, #FF9800 0%, #F57C00 100%)",
                    boxShadow: "0px 10px 20px 0px rgba(255, 152, 0, 0.3)",
                },
                barValue: (pendingPayments.length / payments.length) * 100,
                value: pendingPaymentsSum.toFixed(2),  // Displaying the total sum of pending payments
                png: UilMoneyWithdrawal,
                series: [
                    {
                        name: "Pending",
                        data: pendingPayments.map(payment => payment.amount),
                    },
                ],
            },
            {
                title: "Completed",
                color: {
                    backGround: "linear-gradient(180deg, #2196F3 0%, #1976D2 100%)",
                    boxShadow: "0px 10px 20px 0px rgba(33, 150, 243, 0.3)",
                },
                barValue: (completedPayments.length / payments.length) * 100,
                value: completedPaymentsSum.toFixed(2),  // Displaying the total sum of completed payments
                png: UilClipboardAlt,
                series: [
                    {
                        name: "Completed",
                        data: completedPayments.map(payment => payment.amount),
                    },
                ],
            },
        ];
    };


    if (loading) {
        return <CircularProgress />;
    }

    return (
        <div className={styles.PaymentDashboard}>
            <h1>Payments</h1>
            <div className={styles.ButtonContainer}>
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Add Payment
                </Button>
            </div>
            <Cards cardsData={transformPaymentsToCardData(payments)} />
            <TableContainer component={Paper} className={styles.TableContainer}>
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
                <DialogContent className={styles.DialogContent}>
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
                <DialogActions className={styles.DialogActions}>
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
