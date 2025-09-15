import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Publishers from "./components/Publishers";
import Books from "./components/Books";
import CreateBook from "./components/CreateBook";
import "./styles.scss";
import Layout from "./components/DisplayLayout";
import EditBook from "./components/EditBook";

const App = () => (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="publishers" element={<Publishers />} />
          <Route path="books" element={<Books />} />
          <Route path="createBook" element={<CreateBook />} />
          <Route path="editBook/:id" element={<EditBook />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
);

export default App;
