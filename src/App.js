import React from 'react';
import { BrowserRouter as  Route, Routes } from 'react-router-dom';
import Sidebar from './Componnents/Sidebar/Sidebar';
import Profile from './Componnents/Profile/Profile';
// import LoginForm from './Componnents/LoginForm/LoginForm'
// import ManagerList from './Componnents/Management/ManagerList';
// import AdminPanel from './Componnents/Management/AdminPanel';
// import Product from './Componnents/Product/Product';
// import AddProduct from './Componnents/Product/AddProduct';
import ProductList from './Componnents/Product/ProductList';
// import WarehouseManagerment from './Componnents/WarehouseManagement/WarehouseManagement';
// function App() {
//     return (
//     //    <Profile />
//             // <Sidebar>
//             //     <Routes>                 
//             //         <Route path="/profile" element={<Profile />} />                 
//             //     </Routes>
//             // </Sidebar>
           
//             <div className="app">
//             {/* <Product /> */}
//             <ProductList />
//       {/* <InventoryOutput /> */}
//       {/* <ManagerList /> */}
// {/* <WarehouseManagerment />   */}
//           </div>
    
    
//     );
// }
const App = () => {
    return (
      <Router>
        <div className="container">
          <Sidebar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/products" component={ProductList} />
          </Switch>
        </div>
      </Router>
    );
  };
  
  const Home = () => {
    return <h2>Home Page</h2>;
  };
export default App;
