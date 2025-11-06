import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import BookForm from "../Forms/BookForm";
import UserContext from "./UserContext";

const EditBook = () => {
    const { id } = useParams();
    const { user } = useContext(UserContext);


    if (user?.role === "Editor") {
        return (
            <BookForm id={id} />
        )
    } else {
        return (
            <div className="warning-message-container">
                <h2 className="warning-message">You are not authorized for this action.</h2>
            </div>

        );
    }




};

export default EditBook;