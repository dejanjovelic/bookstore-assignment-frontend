import React, { useContext } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Outlet, useLocation } from "react-router-dom";
import UserContext from "./UserContext";


const Layout = () => {
    const { user } = useContext(UserContext);
    const { pathname } = useLocation();

    return (
        <div>
            <header>
                <Header />
            </header>

            <main>
                {pathname === "/" && (user ? (
                    <h1 style={{ textAlign: "center", padding: '50px' }}>
                        {user?.username},  welcome to Bookstore!
                    </h1>
                ) : (
                    <h1 style={{ textAlign: "center", padding: '50px' }}>
                        Welcome to Bookstore!
                    </h1>
                )

                )}
                <Outlet />
            </main>

            <footer>
                <Footer />
            </footer>

        </div>
    )


}
export default Layout