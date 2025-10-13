import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookForm from "../Forms/BookForm";

const EditBook = () => {
    const { id } = useParams();

    return (
        <BookForm id={id} />

    )
};

export default EditBook;