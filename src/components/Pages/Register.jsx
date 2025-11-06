import React, { useContext, useState } from "react";
import UserContext from "./UserContext";
import { useForm } from "react-hook-form";
import { registerUser } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import "../../styles/register.styles.scss";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Register = () => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset } = useForm();

    const onSubmit = async (data) => {
        try {
            const token = await registerUser(data);
            localStorage.setItem('token', token)
            const payload = JSON.parse(atob(token.split('.')[1]));
            setUser(payload);
            navigate("/");
            reset();
        } catch (error) {
            if (error.status) {
                if (error.status === 400) {
                    showError("Invalid registration data. Please check your input and try again.");
                } else if (error.status === 500) {
                    showError("Server is temporarily unavailable. Please refresh or try again later.");
                } else {
                    showError(`Error: ${error.status}`);
                }
            } else if (error.request) {
                showError("Failed to register user. Please check your connection.");
            } else {
                showError("Something went wrong. Please try again.");
            }
            console.log(`An error occurred while registering the user:`, error);
        }
    }

    function showError(message) {
        setErrorMsg(message)
        setTimeout(() => setErrorMsg(''), 2000);
    }


    return (
        <>
            <div className="registration-main-container">
                <div className="registration-form">
                    <h1 id="registration-title">Register</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <label htmlFor="name">Name: </label>
                        <input type="name" id="name" placeholder="Name"
                            {...register("name", {
                                required: "Name is required",
                            })} />
                        <span className="error-message-register">
                            {errors.name && errors.name.message}
                        </span>

                        <label htmlFor="surname">Surname: </label>
                        <input type="surname" id="surname" placeholder="Surname"
                            {...register("surname", {
                                required: "Surname is required"
                            })} />
                        <span className="error-message-register">
                            {errors.surname && errors.surname.message}
                        </span>


                        <label htmlFor="username">Username: </label>
                        <input type="text" id="username" placeholder="Username"
                            {...register("username", {
                                required: "Username is required",
                                minLength: 5,
                            })} />
                        <span className="error-message-register">
                            {errors.username && errors.username.message}
                        </span>

                        <label htmlFor="email">Email:</label>
                        <input type="text" id="email" placeholder="someone@example.com"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email format"
                                }
                            })} />
                        <span className="error-message-register">
                            {errors.email && errors.email.message}
                        </span>
                        <div className="password-wrapper">
                            <label htmlFor="password">Password: </label>
                            <input type={showPassword ? "text" : "password"} id="password" {...register("password", {
                                required: "Password is required",
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
                                    message:
                                        "Password must include uppercase, lowercase, digit, and special character"
                                }
                            })} />
                            <span className="eye-icon"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </span>
                            <span className="error-message-register">
                                {errors.password && errors.password.message}
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
                    <div className="error-message-register">
                        {errorMsg}
                    </div>
                </div>
            )}
        </>

    );

}
export default Register;