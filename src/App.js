import React from 'react';
import { BrowserRouter as  Route, Routes } from 'react-router-dom';
import Sidebar from './Componnents/Sidebar/Sidebar';
import Profile from './Componnents/Profile/Profile';
// import LoginForm from './Componnents/LoginForm/LoginForm'

function App() {
    return (
       
            <Sidebar>
                <Routes>                 
                    <Route path="/profile" element={<Profile />} />                 
                </Routes>
            </Sidebar>
            
    );
}

export default App;
