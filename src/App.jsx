import React, {useState, useEffect} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Publishers from "./components/Pages/Publishers";
import Books from "./components/Pages/Books";
import CreateBook from "./components/Pages/CreateBook";
import "./styles/global.styles.scss";
import Layout from "./components/Pages/DisplayLayout";
import EditBook from "./components/Pages/EditBook";
import Authors from "./components/Pages/Authors";
import SortedPublishers from "./components/Pages/SortedPublishers";
import Login from "./components/Pages/Login";
import Register from "./components/Pages/Register";
import UserProfile from "./components/Pages/UserProfile";
import UserContext from "./components/Pages/UserContext";
import Logout from "./components/Pages/LogoutBtn";
import GoogleCallback from "./components/Pages/GoogleCallback";



const App = () => {
  const[user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser(payload);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

 
  return (
    <>
    <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="publishers" element={<Publishers />} />
              <Route path="publishers/sorted" element={<SortedPublishers />} />
              <Route path="books" element={<Books />} />
              <Route path="createBook" element={<CreateBook />} />
              <Route path="editBook/:id" element={<EditBook />} />
              <Route path="authors" element={<Authors />} />
              <Route path="login" element={<Login/>}/>
              <Route path="register" element={<Register/>}/>
              <Route path="profile" element={<UserProfile/>}/>
              <Route path="google-callback" element={<GoogleCallback />}/>
              </Route>
          </Routes>
        </BrowserRouter>
        </UserContext.Provider>
    </>
  );
};

export default App;
