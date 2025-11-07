import React, { useContext, useEffect } from "react";
import UserContext from "./UserContext";
import { useLocation, useNavigate } from "react-router-dom";


const GoogleCallback = () => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const token = query.get('token');

        if (token) {
            localStorage.setItem('token', token);


            try {
                const payload = JSON.parse(atob(token.split(".")[1]));
                setUser(payload);
            } catch (error) {
                console.error("unvalid token:", error)
            }
            navigate('/');
        } else {
            console.error("Token not found in URL");
        }

    }, [location.search, navigate, setUser])

    return <div>Loading...</div>
}

export default GoogleCallback;