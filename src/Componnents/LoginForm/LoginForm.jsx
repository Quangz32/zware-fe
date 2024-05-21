import React, { useState } from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Mock function to simulate authentication API call
const authenticateUser = async (username, password) => {
    // Simulate a delay for the authentication process
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (username === 'user' && password === 'password') {
                resolve('Authentication successful');
            } else {
                reject('Invalid username or password');
            }
        }, 1000);
    });
};

const LoginForm = () => {   
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        // Perform validation
        if (!username || !password) {
            setError('Username and password are required');
            setLoading(false);
            return;
        }

        try {
            // Call the mock authentication function
            await authenticateUser(username, password);
            // If authentication is successful, navigate to the home page
            navigate('/home');
        } catch (err) {
            // If authentication fails, set the error message
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="element wrapper">
               <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    {error && <div className="error">{error}</div>}
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <FaLock className="icon" />
                    </div>
                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox" /> Remember me
                        </label>
                        <a href="..">Forgot Password</a>
                    </div>
                    <button type="submit" className='login' disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
