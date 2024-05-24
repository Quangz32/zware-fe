import React, { useState } from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Function to call the authentication API
const authenticateUser = async (username, password) => {
    const response = await fetch('Endpoint API URL link', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // gửi đi ở định dạng JSON
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        const message = await response.json();
        throw new Error(message.error || 'Invalid username or password');
    }

    return await response.json();
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
            // Call the API to authenticate the user
            await authenticateUser(username, password);
            // If authentication is successful, navigate to the home page
            navigate('/home');
        } catch (err) {
            // If authentication fails, set the error message
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="wrapper">
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
