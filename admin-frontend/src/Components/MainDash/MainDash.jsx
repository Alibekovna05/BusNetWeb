import { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Cards from "../Cards/Cards";
import styles from './MainDash.module.css';
import { UilUsdSquare, UilMoneyWithdrawal, UilClipboardAlt } from "@iconscout/react-unicons";

export default function MainDash() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [accessToken, setAccessToken] = useState("");

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

    const transformPaymentsToCardData = (payments) => {
        const totalPaymentsSum = payments.reduce((acc, payment) => acc + payment.amount, 0);
        const pendingPayments = payments.filter(payment => payment.status === "PENDING");
        const completedPayments = payments.filter(payment => payment.status === "COMPLETED");
        const failedPayments = payments.filter(payment => payment.status === "FAILED");
        const refundedPayments = payments.filter(payment => payment.status === "REFUNDED");

        const pendingPaymentsSum = pendingPayments.reduce((acc, payment) => acc + payment.amount, 0);
        const completedPaymentsSum = completedPayments.reduce((acc, payment) => acc + payment.amount, 0);
        const failedPaymentsSum = failedPayments.reduce((acc, payment) => acc + payment.amount, 0);
        const refundedPaymentsSum = refundedPayments.reduce((acc, payment) => acc + payment.amount, 0);

        const totalPaymentsLength = payments.length;
        const pendingPaymentsLength = pendingPayments.length;
        const completedPaymentsLength = completedPayments.length;
        const failedPaymentsLength = failedPayments.length;
        const refundedPaymentsLength = refundedPayments.length;

        return [
            {
                title: "Total Payments",
                color: {
                    backGround: "linear-gradient(180deg, #4CAF50 0%, #2E7D32 100%)",
                    boxShadow: "0px 10px 20px 0px rgba(76, 175, 80, 0.3)",
                },
                barValue: 100,
                value: totalPaymentsSum.toFixed(2),
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
                barValue: ((pendingPaymentsLength / totalPaymentsLength) * 100).toFixed(0),
                value: pendingPaymentsSum.toFixed(2),
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
                barValue: ((completedPaymentsLength / totalPaymentsLength) * 100).toFixed(0),
                value: completedPaymentsSum.toFixed(2),
                png: UilClipboardAlt,
                series: [
                    {
                        name: "Completed",
                        data: completedPayments.map(payment => payment.amount),
                    },
                ],
            },
            {
                title: "Failed",
                color: {
                    backGround: "linear-gradient(180deg, #f44336 0%, #d32f2f 100%)",
                    boxShadow: "0px 10px 20px 0px rgba(244, 67, 54, 0.3)",
                },
                barValue: ((failedPaymentsLength / totalPaymentsLength) * 100).toFixed(0),
                value: failedPaymentsSum.toFixed(2),
                png: UilUsdSquare,
                series: [
                    {
                        name: "Failed",
                        data: failedPayments.map(payment => payment.amount),
                    },
                ],
            },
            {
                title: "Refunded",
                color: {
                    backGround: "linear-gradient(180deg, #00bcd4 0%, #0097a7 100%)",
                    boxShadow: "0px 10px 20px 0px rgba(0, 188, 212, 0.3)",
                },
                barValue: ((refundedPaymentsLength / totalPaymentsLength) * 100).toFixed(0),
                value: refundedPaymentsSum.toFixed(2),
                png: UilClipboardAlt,
                series: [
                    {
                        name: "Refunded",
                        data: refundedPayments.map(payment => payment.amount),
                    },
                ],
            },
        ];
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <div className={styles.MainDash}>
            <h1>Main Dashboard</h1>
            <Cards cardsData={transformPaymentsToCardData(payments)} />
        </div>
    );
}
