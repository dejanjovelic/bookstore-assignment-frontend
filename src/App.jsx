import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Publishers from "./components/Publishers";
import Books from "./components/Books";
import CreateBook from "./components/CreateBook";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles.scss";
import Layout from "./components/DisplayLayout";

const App = () => (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
        <Route path="publishers" element={<Publishers />} />
        <Route path="books" element={<Books />} />
        <Route path="createBook" element={<CreateBook />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
);

export default App;
