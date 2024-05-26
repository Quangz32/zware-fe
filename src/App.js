import React from 'react';
import { BrowserRouter as  Route, Routes } from 'react-router-dom';
import Sidebar from './Componnents/Sidebar/Sidebar';
import Profile from './Componnents/Profile/Profile';
// import LoginForm from './Componnents/LoginForm/LoginForm'
// import ManagerList from './Componnents/Management/ManagerList';
import ManagerList from './Componnents/Management/ManagerList';
// import AdminPanel from './Componnents/Management/AdminPanel';
import Product from './Componnents/Product/Product';
// import AddProduct from './Componnents/Product/AddProduct';
function App() {
    return (
    //    <Profile />
    //  <ManagerList />
            // <Sidebar>
            //     <Routes>                 
            //         <Route path="/profile" element={<Profile />} />                 
            //     </Routes>
            // </Sidebar>
           
            <div className="app">
            <Product />
          </div>
    
    
    );
}

export default App;
