import React from 'react';
import { BrowserRouter as  Route, Routes } from 'react-router-dom';
import Sidebar from './Componnents/Sidebar/Sidebar';
import Profile from './Componnents/Profile/Profile';
// import LoginForm from './Componnents/LoginForm/LoginForm'
// import ManagerList from './Componnents/Management/ManagerList';
import ManagerList from './Componnents/Management/ManagerList';
import Home from './Componnents/Home/Home';

function App() {
    return (
    <Sidebar>
      <Home/>
    </Sidebar>

    );
}

export default App;
