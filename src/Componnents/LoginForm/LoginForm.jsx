import React from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LoginForm = () => {
    return (
        <div className="container">
            <div className="element wrapper">
                <form action="">
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
                    <Link>
                    <button type="submit" className='login'>Login</button>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
