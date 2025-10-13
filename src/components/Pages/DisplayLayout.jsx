import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Outlet, useLocation } from "react-router-dom";


const Layout = () => {

    const { pathname } = useLocation();

    return (
        <div>
            <header>
                <Header />
            </header>

            <main>
                {pathname === "/" && (
                    <h1 style={{ textAlign: "center", padding: '50px' }}>
                        Welcome to Bookstore!
                    </h1>
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