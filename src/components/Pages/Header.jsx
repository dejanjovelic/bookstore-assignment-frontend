import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Publishers from "./Publishers";
import UserContext from "./UserContext";
import { Button } from "@mui/material";
import LogoutBtn from "./LogoutBtn";

const Header = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    return (
        <div id="nav-container">
            <div id="store-name">
                <h1>Bookstore App</h1>
            </div>
            <nav id="nav-bar">

                <div className="links-section">
                    <Link to={"publishers"}>Publishers</Link>
                    <Link to={"authors"}>Authors</Link>
                    <Link to={"books"}>Books</Link>

                    {user && (<Link to={"createBook"}>Create Book</Link>)}
                    <Link to={"publishers/sorted"}>Sorted Publishers</Link>
                    {user && user?.role === "Editor" && (
                        <Link to={"volumes"}>Volumes</Link>
                    )}
                </div>

                <div className="login-section">
                    {!user && (
                        <>
                            <button id="loginBtn" onClick={() => navigate("/login")}>Login</button>
                            <button id="registerBtn" onClick={() => navigate("/register")}>Register</button>
                        </>
                    )}
                    {user &&
                        <>
                            <Link id="proflieLink"
                                to="profile"
                                style={{
                                    color: "#f0f0f0",
                                    fontWeight: "bold",
                                    fontSize: "20px",
                                    textDecoration: "none",
                                    transition: "color 0.3s ease",
                                }}
                                onMouseEnter={e => (e.target.style.color = "#2196f3")}
                                onMouseLeave={e => (e.target.style.color = "#f0f0f0")}

                            >{user.username}</Link>
                            <LogoutBtn />
                        </>}
                </div>
            </nav>

        </div>

    )
}

export default Header;