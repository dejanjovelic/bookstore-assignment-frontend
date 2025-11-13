import React, { useContext, useEffect, useState } from "react";
import { getUserProfile } from "../../services/UserService";
import UserContext from "./UserContext";
import { PeopleAlt, VerifiedUserOutlined } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import "../../styles/profile.style.scss"

const UserProfile = () => {
    const [profile, setProfile] = useState(null);
    const { user } = useContext(UserContext);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {

        const fetchUserProfile = async () => {
            try {
                const userProfile = await getUserProfile();
                console.log(userProfile);
                setProfile(userProfile);
            } catch (error) {
                if (error.status) {
                    if (error.status === 400) {
                        showError("Your session has expired. Please log in and try again.");
                    } else if (error.status === 404) {
                        showError("User with provided username does not exist.");
                    }
                    else if (error.status === 500) {
                        showError("Server is temporarily unavailable. Please refresh or try again later.");
                    } else {
                        showError(`Error: ${error.status}`);
                    }
                } else if (error.request) {
                    showError("Failed to fetch users profile. Please check your connection.");
                } else {
                    showError("Something went wrong. Please try again.");
                }
                console.log(`An error occured while getting profile:`, error);
            }
        }
        fetchUserProfile();
    }, [])

    function showError(message) {
        setErrorMsg(message)
        setTimeout(() => setErrorMsg(''), 2000);
    }

    return (
        <div className="profile-main-container">
            <div className="profile-container">
                <div className="picture-section">
                    <img src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png" alt="user picture" />
                </div>
                <div className="user-info-section">
                    <h2 id="fullname">{profile?.name} {profile?.surname}</h2>
                    <p>Sistem role: {user?.role}</p>
                    <p>Kontakt: {profile?.email}</p>
                    <p>Username: {profile?.username}</p>
                </div>
            </div>
        </div>

    )
}
export default UserProfile;