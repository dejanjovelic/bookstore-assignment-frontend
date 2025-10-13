import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Publishers from "./components/Pages/Publishers";
import Books from "./components/Pages/Books";
import CreateBook from "./components/Pages/CreateBook";
import "./styles/global.styles.scss";
import Layout from "./components/Pages/DisplayLayout";
import EditBook from "./components/Pages/EditBook";
import Authors from "./components/Pages/Authors";
import SortedPublishers from "./components/Pages/SortedPublishers";

const App = () => (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="publishers" element={<Publishers />} />
          <Route path="publishers/sorted" element={<SortedPublishers/>}/>
          <Route path="books" element={<Books />} />
          <Route path="createBook" element={<CreateBook />} />
          <Route path="editBook/:id" element={<EditBook />} />
          <Route path="authors" element={<Authors />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
);

export default App;
