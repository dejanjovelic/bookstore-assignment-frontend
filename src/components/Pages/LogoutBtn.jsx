import React, { useContext } from "react";
import UserContext from "./UserContext";
import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate("login");
    }
    return <button id="logoutBtn" onClick={handleLogout}>Logout</button>
}
export default LogoutBtn;