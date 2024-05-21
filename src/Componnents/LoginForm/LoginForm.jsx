import React from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {   
     const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform authentication logic here
        // If authentication is successful, navigate to the profile page or any other page within the sidebar
        navigate('/home');
    };

    return (
        <div className="container">
            <div className="element wrapper">
               <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Username" required />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" required />
                        <FaLock className="icon" />
                    </div>
                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox" /> Remember me
                        </label>
                        <a href="..">Forgot Password</a>
                    </div>
                    {/* <Link to="/home"> */}
                    <button type="submit" className='login'>Login</button>
                    {/* </Link> */}
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
