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
        <aside id="sidebar" className={isExpanded ? 'expand' : ''}>
            <div className="d-flex">
                <button className="toggle-btn" type="button" onClick={toggleSidebar}>
                    <i className="bi bi-list"></i>
                </button>
                <div className="sidebar-logo">
                    <Link to="/home">Warehouse Management</Link>
                </div>
            </div>
            <div className="profile">
                <img src="avatar-1.avif" alt="avatar" />
                <span>Duong Long</span>
            </div>
            <div className="role">
                <span className='role-box'>Admin</span>
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
                    <Link to="/users" className="sidebar-link">
                        <i className="bi bi-person-vcard"></i>
                        <span>Manager</span>
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
                    <Link to="/outbound" className="sidebar-link">
                        <i className="bi bi-arrow-left-right"></i>
                        <span>Transaction</span>
                    </Link>
                </li>
            </ul>
            <div className="sidebar-footer">
                <Link to="/login" className="sidebar-link">
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Logout</span>
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;
