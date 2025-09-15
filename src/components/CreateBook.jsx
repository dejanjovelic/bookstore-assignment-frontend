import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createBook } from "../services/BooksService";
import { getAllAuthors } from "../services/AuthorService";
import { getAllPublishers } from "../services/PublishersService";
import Spinner from "./Spinner";
import BookForm from "./BookForm";

const CreateBook = () => {

    return (
        <BookForm />
    )
};

export default CreateBook;