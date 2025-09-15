import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createBook, getBookById, updateBook } from "../services/BooksService";
import { getAllAuthors } from "../services/AuthorService";
import { getAllPublishers } from "../services/PublishersService";
import Spinner from "./Spinner";
import BookForm from "./BookForm";

const EditBook = () => {
    const { id } = useParams();

    return (
        <BookForm id={id} />

    )
};

export default EditBook;