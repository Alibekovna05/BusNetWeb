
import {
    UilEstate,
    UilClipboardAlt,
    UilUsersAlt,
    UilPackage,
    UilChart,
} from "@iconscout/react-unicons";


import {  UilMoneyWithdrawal } from "@iconscout/react-unicons";



import img1 from "../imgs/img1.png";
import img2 from "../imgs/img2.png";
import img3 from "../imgs/img3.png";
import tenge from "../imgs/tenge.png";

export const SidebarData = [
    {
        icon: UilEstate,
        heading: "Dashboard",
        path:"/dashboard"
    },
    {
        icon: UilClipboardAlt,
        heading: "Bookings",
        path:"/bookings"
    },
    {
        icon: UilUsersAlt,
        heading: "Users",
        path:"/users"
    },
    {
        icon: UilPackage,
        heading: 'Bus companies',
        path:"/companies"
    },
    {
        icon: UilChart,
        heading: 'Bus Schedule',
        path:"/schedule"
    },
    {
        icon: UilMoneyWithdrawal,
        heading: 'Payment',
        path:"/payment"
    },
];

export const RecentData = [
    {
        img: img1,
        name: "Jasmin Sauken",
        text: "has ordered Ticket Almaty - Astana",
        time: "25 sec ago",
    },
    {
        img: img2,
        name: "Aidana Mergembaeva",
        text: "has declined Ticket Astana - Pavlodar",
        time: "30 min ago",
    },
    {
        img: img3,
        name: "Aidana Pazylkhan",
        text: "has ordered Ticket Almaty - Shymkent",
        time: "2 h ago",
    },
];
