import './App.css';
import { Route, Routes } from 'react-router-dom';
import RightSide from './Components/RightSide/RightSide.jsx';
import MainDash from './Components/MainDash/MainDash';
import Sidebar from './Components/Sidebar/Sidebar';
import Users from './Components/User/User';

import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

function App() {
  //  const location = useLocation();
   // const hideSidebarAndRightSide = location.pathname === '/login' || location.pathname === '/register'|| ;
    //{!hideSidebarAndRightSide && <Sidebar/>}

    return (
        <div className="App">
            <div className="AppGlass">
                <Sidebar/>
                <Routes>
                    <Route path="/" element={<MainDash/>} />
                    <Route path="/dashboard" element={<MainDash/>} />
                    <Route path="/right-side" element={<RightSide/>} />
                    <Route path="/users" element={<Users/>} />
                </Routes>
                <RightSide/>
            </div>
        </div>
    );
}

export default App;