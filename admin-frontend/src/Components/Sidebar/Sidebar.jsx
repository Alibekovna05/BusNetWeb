import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import Logo from "../../imgs/logo.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { adminSidebarData, busCompanySidebarData } from "../../Data/Data";

const Sidebar = () => {
    const [selected, setSelected] = useState(0);
    const [expanded, setExpanded] = useState(true);
    const [userRole, setUserRole] = useState("");
    const navigate = useNavigate();

    const sidebarVariants = {
        true: { left: "0" },
        false: { left: "-60%" },
    };

    const toggleSidebar = () => {
        setExpanded(!expanded);
    };

    const handleSidebarClick = (index, path) => {
        setSelected(index);
        setExpanded(false);
        navigate(path);
    };

    useEffect(() => {
        const role = localStorage.getItem("roles");
        setUserRole(role);
    }, []);

    // Choose sidebar data based on the user's role
    const sidebarData = userRole === "ADMIN" ? adminSidebarData : busCompanySidebarData;

    return (
        <>
            <div
                className="bars"
                style={expanded ? { left: "60%" } : { left: "5%" }}
                onClick={toggleSidebar}
            >
                <UilBars />
            </div>
            <motion.div
                className="sidebar"
                variants={sidebarVariants}
                animate={
                    window.innerWidth <= 768 ? (expanded ? "true" : "false") : ""
                }
            >
                <div className="logo">
                    <img src={Logo} alt="logo" />
                    <span>
            Bus<span> Net</span>
          </span>
                </div>
                <div className="menu">
                    {sidebarData.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleSidebarClick(index, item.path)}
                            className={
                                selected === index ? "menuItem active" : "menuItem"
                            }
                        >
                            <item.icon />
                            <span>{item.heading}</span>
                        </div>
                    ))}
                    <div
                        className="menuItem"
                        onClick={() => handleSidebarClick(sidebarData.length, "/login")}
                    >
                        <UilSignOutAlt />
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default Sidebar;
