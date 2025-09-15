import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createBook, getBookById, updateBook } from "../services/BooksService";
import { getAllAuthors } from "../services/AuthorService";
import { getAllPublishers } from "../services/PublishersService";
import Spinner from "./Spinner";

const BookForm = () => {

    const [book, setBook] = useState(null);
    const [authors, setAuthors] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset } = useForm(
            {
                mode: "onChange",
                defaultValues: book || {

                    title: '',
                    pageCount: '',
                    publishedDate: '',
                    isbn: '',
                    authorId: '',
                    publisherId: ''
                }

            }

        )

    function showError(message) {
        setErrorMsg(message)
        setTimeout(() => setErrorMsg(''), 4000);
    }



    async function getBookFromDB() {
        if (!id) { return }
        try {
            const bookFromDb = await getBookById(id);
            console.log("Book from db:", bookFromDb);
            setBook(bookFromDb);
            reset({
                title: bookFromDb.title,
                pageCount: bookFromDb.pageCount,
                publishedDate: bookFromDb.publishedDate.split("T")[0],
                isbn: bookFromDb.isbn,
                authorId: bookFromDb.authorId,
                publisherId: bookFromDb.publisherId,
            });

        } catch (error) {
            if (error.status) {
                if (error.status === 404) {
                    showError("Book is not found.")
                } else if (error.status === 500) {
                    showError("Server is temporarily unavailable. Please refresh or try again later.")
                } else {
                    showError(`Error: ${error.status}`);
                }
            } else if (error.request) {
                showError("The server is not responding. Please try again later.");
            } else {
                showError("Something went wrong. Please try again.");
            }
            console.log(`An error occured while fetching book:`, error);
        }
    };



    useEffect(() => {
        console.log(id)
        async function getEditBook() {
            try {
                if (id) {
                    await getBookFromDB()
                }
                const authorsFromDB = await getAllAuthors();
                const publishersFromDB = await getAllPublishers();

                setAuthors(authorsFromDB);
                setPublishers(publishersFromDB);

            } catch (error) {
                if (error.status) {
                    if (error.status === 500) {
                        showError("Server is temporarily unavailable. Please refresh or try again later.");
                    } else {
                        showError(`Error: ${error.status}`);
                    }
                } else if (error.request) {
                    showError("Failed to load authors or publishers. Please check your connection.");
                } else {
                    showError("Something went wrong. Please try again.");
                }
                console.log(`An error occured while fetching book:`, error);
            }
        }
        getEditBook();

    }, [])
    console.log(book)

    async function onFormSubmit(data) {
        try {
            setIsLoading(true);
            let bookFromDB;
            if (id) {
                const dataWithId = { ...data, id };
                bookFromDB = await updateBook(id, dataWithId);

            } else {
                bookFromDB = await createBook(data);
            }

            console.log(bookFromDB)

            setTimeout(() => {
                setBook(bookFromDB);
                setIsLoading(false);
                if (id) {
                    setSuccessMsg(`Changes to "${bookFromDB.title}" have been saved.`);
                } else {
                    setSuccessMsg(`You successfuly added a new book "${bookFromDB.title}".`);
                }


                setTimeout(() => {
                    reset();
                    navigate("/books");
                }, 1500);
            }, 500);



        } catch (error) {
            if (error.status) {
                if (error.response.status === 400) {
                    setErrorMsg("Invalid data format or missing fields. Please correct the form and submit again.")
                } else if (error.status === 404) {
                    setErrorMsg(`The book with ID: ${id} not found.`)
                } else if (error.status === 500) {
                    setErrorMsg("Invalid data format or missing fields. Please correct the form and submit again.")
                } else {
                    setErrorMsg("Error:", error.status)
                }
            } else if (error.request) {
                setErrorMsg("The server is not responding. Please try again later.");
            } else {
                setErrorMsg("Something went wrong. Please try again.")
            }
            console.log(`An error occured while updating book:`, error);
            setIsLoading(false);
        }
    }

    if (isLoading) {
        return <Spinner text="Sending..." />
    }


    return (
        <div className="form-container">
            <form className="update-add-form" onSubmit={handleSubmit(onFormSubmit)}>
                <h1>{id ? "Update Book" : "Add New Book"}</h1>
                <label htmlFor="title">Title:</label >
                <input id="title"
                    type="text"
                    {...register("title", { required: "Title is required." })}
                />
                {errors.title && (
                    <span className="field-error">{errors.title.message}</span>
                )}

                <label htmlFor="pageCount">Number of Pages:</label>
                <input id="pageCount"
                    type="number"
                    {...register("pageCount", {
                        required: "Number of pages is required",
                        min: { value: 1, message: "Number of pages must be greater than 0." },
                    })}
                />
                {errors.pageCount && (
                    <span className="field-error">{errors.pageCount.message}</span>
                )}

                <label htmlFor="publishedDate">Published date:</label>
                <input id="publishedDate"
                    type="date"
                    {...register("publishedDate", { required: "Publish date is required." })}
                />
                {errors.publishedDate && (
                    <span className="field-error">{errors.publishedDate.message}</span>
                )}

                <label htmlFor="isbn">ISBN:</label>
                <input id="isbn"
                    type="text"
                    {...register("isbn", {
                        required: "ISBN is required",
                        pattern: {
                            value: /^(97(8|9))?\d{9}(\d|X)$/,
                            message: "Invalid ISBN format",
                        },
                        minLength: { value: 10, message: "ISBN must be at least 10 characters" },
                        maxLength: { value: 13, message: "ISBN must be at most 13 characters" },
                    })}
                />
                {errors.isbn && <span className="field-error">{errors.isbn.message}</span>}

                <label htmlFor="author">Author:</label>
                <select id="author" {...register("authorId", { required: "Author is required." })}>
                    {authors.map((author) => (
                        <option key={author.id} value={author.id}>
                            {author.fullName}
                        </option>
                    ))}
                </select>
                {errors.authorId && (
                    <span className="field-error">{errors.authorId.message}</span>
                )}

                <label htmlFor="publisher">Publisher:</label>
                <select id="publisher"
                    {...register("publisherId", { required: "Publisher is required." })}
                >
                    {publishers.map((publisher) => (
                        <option key={publisher.id} value={publisher.id}>
                            {publisher.name}
                        </option>
                    ))}
                </select>
                {errors.publisherId && (
                    <span className="field-error">{errors.publisherId.message}</span>
                )}

                <div className="button-section">
                    <button type="submit" className="editBtn editBook">{id ? "Update Book" : "Add New Book"}</button>
                </div>
            </form>

            {errorMsg && (
                <div className="error-message">
                    {errorMsg}
                </div>
            )}
            {successMsg && (
                <div className="success-message">
                    {successMsg}
                </div>
            )}
        </div>
    );
};

export default BookForm;