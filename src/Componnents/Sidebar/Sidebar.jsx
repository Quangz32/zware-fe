import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Sidebar.css';
import { Link } from 'react-router-dom';


const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`wrapper ${isExpanded ? 'expand' : ''}`}>
            <aside id="sidebar" className={isExpanded ? 'expand' : ''}>
                <div className="d-flex">
                    <button className="toggle-btn" type="button" onClick={toggleSidebar}>
                        <i className="bi bi-list"></i>
                    </button>
                    <div className="sidebar-logo">
                        <a href="/">Warehouse Management</a>
                    </div>
                </div>
                <div className="profile">
                    <img src="https://via.placeholder.com/50" alt="Profile" />
                    <span>Duong Long</span>
                </div>
                <div className="role">
                    <span className='role-box'> Admin </span>
                </div>
                <ul className="sidebar-nav">
                    <li className="sidebar-item">
                        <Link to="/home" className="sidebar-link">
                            <i className="bi bi-house"></i>
                            <span>Home</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/profile" className="sidebar-link">
                            <i className="bi bi-person"></i>
                            <span>Profile</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/item" className="sidebar-link">
                            <i className="bi bi-boxes"></i>
                            <span>Item</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/report" className="sidebar-link">
                            <i className="bi bi-clipboard2-data"></i>
                            <span>Report</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/transaction" className="sidebar-link">
                            <i className="bi bi-arrow-left-right"></i>
                            <span>Transaction</span>
                        </Link>
                    </li>
                </ul>
                <div className="sidebar-iteam">
                    <a href="/" className="sidebar-link">
                        <i className="bi bi-box-arrow-right"></i>
                        <span>Logout</span>
                    </a>
                </div>
            </aside>
            <div className="main p-3">
                <div className="text-center">
                    <h1>Content</h1>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
