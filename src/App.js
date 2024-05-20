import React from 'react';
import { BrowserRouter as  Route, Routes } from 'react-router-dom';
import Sidebar from './Componnents/Sidebar/Sidebar';
import Profile from './Componnents/Profile/Profile';
// import LoginForm from './Componnents/LoginForm/LoginForm'
// import ManagerList from './Componnents/Management/ManagerList';
import ManagerList from './Componnents/Management/ManagerList';

function App() {
    return (
    //    <Profile />
    //         <Sidebar>
    //             <Routes>                 
    //                 <Route path="/profile" element={<Profile />} />                 
    //             </Routes>
    //         </Sidebar>
            <ManagerList />
    );
}

export default App;
