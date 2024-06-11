import React, { useState } from "react";
import "./LoginForm.css";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import MyAxios from "../../Utils/MyAxios";

// Function to call the authentication API
const authenticateUser = async (username, password) => {
    try {
        const response = await MyAxios.post("auth/login", {
            email: username,
            password: password,
        });
        console.log(response);

        return response ? response.data : null; // Trả về response.data hoặc null nếu không có dữ liệu trả về
    } catch (error) {
        console.log(error);
        return null; // Trả về null nếu có lỗi xảy ra
    }
};

const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        // Perform validation
        if (!email || !password) {
            setError("Email and password are required");
            setLoading(false);
            return;
        }

        try {
            const jwt = await authenticateUser(email, password);
            if (jwt.length<50) {
                setError("Invalid email or password"); // Hiển thị thông báo khi thông tin đăng nhập không đúng
            } else {
                localStorage.setItem("jwt-token", jwt);
                navigate("/home");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="long-container long-container1">
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    {error && <div className="error">{error}</div>}
                    <div className="input-box">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <button type="submit" className="login" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
