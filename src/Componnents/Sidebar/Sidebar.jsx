import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Sidebar.css';

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
                        <i className="bi bi-grid"></i>
                    </button>
                    <div className="sidebar-logo">
                        <a href="#">Warehouse Management</a>
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
                        <a href="#" className="sidebar-link">
                            <i className="bi bi-person"></i>
                            <span>Profile</span>
                        </a>
                    </li>
                    <li className="sidebar-item">
                        <a href="#" className="sidebar-link">
                            <i className="bi bi-card-checklist"></i>
                            <span>Task</span>
                        </a>
                    </li>


                    <li className="sidebar-item">
                        <a href="#" className="sidebar-link">
                            <i className="bi bi-clipboard2-data"></i>
                            <span>Report</span>
                        </a>
                    </li>
                    <li className="sidebar-item">
                        <a href="#" className="sidebar-link">
                            <i className="bi bi-gear"></i>
                            <span>Setting</span>
                        </a>
                    </li>
                </ul>
                <div className="sidebar-footer">
                    <a href="#" className="sidebar-link">
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
