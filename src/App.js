import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Componnents/Sidebar/Sidebar';
import Profile from './Componnents/Profile/Profile';
import Home from './Componnents/Home/Home';

// import Item from './Componennts/Item/Item';
// import Report from './Componennts/Report/Report';
// import Transaction from './Componennts/Transaction/Transaction';
import Login from './Componnents/LoginForm/LoginForm';
import ManagerList from './Componnents/Management/ManagerList';
import Outbound from './Componnents/Transaction/Outbound/Outbound';

function App() {
    return (
        <Router>
            <div >
                <Sidebar />
                <main className="main">
                    <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/users" element={<ManagerList />} />
                        {/* <Route path="/item" element={<Item />} />
                        <Route path="/report" element={<Report />} /> */}
                        <Route path="/outbound" element={<Outbound />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
