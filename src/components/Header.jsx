import React from "react";
import { Link } from "react-router-dom";
import Publishers from "./Publishers";

const Header = () => {
    return (
        <div id="nav-container">
            <div id="store-name">
                <h1>Bookstore App</h1>
            </div>
            <nav id="nav-bar">
                <Link to={"publishers"}>Publishers</Link>
                <Link to="books">Books</Link>
                <Link to={"createBook"}>Create Book</Link>
            </nav>

        </div>

    )
}

export default Header;