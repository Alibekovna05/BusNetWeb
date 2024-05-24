import './App.css';
import {Route, Routes, useLocation} from 'react-router-dom';
import RightSide from './Components/RightSide/RightSide.jsx';
import MainDash from './Components/MainDash/MainDash';
import Sidebar from './Components/Sidebar/Sidebar';
import Users from './Components/User/User';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import BusCompany from './Components/BusCompany/BusCompanyTable';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8088';

function App() {
    const location = useLocation();
    const hideSidebarAndRightSide = location.pathname === '/login' || location.pathname === '/register';

    return (
        <div className="App">
            <div className="AppGlass">
                {!hideSidebarAndRightSide && <Sidebar/>}
                <Routes>
                    <Route path="/" element={<MainDash/>} />
                    <Route path="/dashboard" element={<MainDash/>} />
                    <Route path="/right-side" element={<RightSide/>} />
                    <Route path="/users" element={<Users/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/companies" element={<BusCompany/>} />
                    <Route path="/register" element={<Register/>} />
                </Routes>
                 {!hideSidebarAndRightSide && <RightSide/>}
            </div>
        </div>
    );
}

export default App;