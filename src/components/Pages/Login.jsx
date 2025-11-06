import React, { useContext, useState } from "react";
import UserContext from "./UserContext";
import "../../styles/login.styles.scss";
import { Button } from "@mui/material";
import { loginUser } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Login = () => {
    const { setUser } = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = await loginUser({ username, password });
            localStorage.setItem('token', token);
            const payload = JSON.parse(atob(token.split('.')[1]));
            setUser(payload)
            navigate("/")
        } catch (error) {
            if (error.status) {
                if (error.status === 400) {
                    showError("Invalid username or password. Please try again.");
                } else if (error.status === 500) {
                    showError("Server is temporarily unavailable. Please refresh or try again later.");
                } else {
                    showError(`Error: ${error.status}`);
                }
            } else if (error.request) {
                showError("Failed to login user. Please check your connection.");
            } else {
                showError("Something went wrong. Please try again.");
            }
            console.log(`An error occured while loging user:`, error);
        }

    }


    function showError(message) {
        setErrorMsg(message)
        setTimeout(() => setErrorMsg(''), 2000);
    }

    return (
        <>
            <div className="login-main-container">
                <div className="login-container">
                    <h2 className="login-title">Login </h2>

                    <form onSubmit={handleSubmit}>


                        <label htmlFor="username">Username: </label>
                        <input type="text" id="username" placeholder="Username"
                            value={username} onChange={e => setUsername(e.target.value)} autoComplete="username" />


                        <div className="login-password-wrapper">
                            <label htmlFor="password">Password: </label>
                            <input type={showPassword ? "text" : "password"} id="password" placeholder="Password"
                                value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" />
                            <span className="login-eye-icon"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </span>
                        </div>
                        <div className="submit-container">
                            <button type="submit">Submit</button>
                        </div>

                    </form>
                </div>
            </div>

            {errorMsg && (
                <div className="error-container">

                    <div className="error-message">
                        {errorMsg}
                    </div>
                </div>
            )}
        </>

    );
}
export default Login;
