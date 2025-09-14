import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBooks, deleteBook } from "../services/BooksService";
import Spinner from "./Spinner";

const Books = () => {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function getAllBooksFromDB() {
            setIsLoading(true);
            try {
                const booksFromDB = await getAllBooks();
                console.log(booksFromDB)
                setTimeout(() => {
                    setBooks(booksFromDB);
                    setIsLoading(false);
                }, 1000);

            } catch (error) {
                if (error.status) {
                    if (error.status === 500) {
                        setErrorMsg("Server is temporarily unavailable. Please refresh or try again later.");
                    }
                } else if (error.request) {
                    setErrorMsg("The server is not responding. Please try again later.");
                } else {
                    setErrorMsg("Something went wrong. Please try again.");
                }
                console.log(`An error occured while fetching books:`, error);
                setIsLoading(false);
                setTimeout(() => { setErrorMsg('') }, 1000);
            }
        }
        getAllBooksFromDB();

    }, [])

    async function handleDeleteBtn(id) {
        console.log(id)
        try {
            await deleteBook(id);
            setBooks(prev=>prev.filter(book => book.id !== id));

        } catch (error) {
            console.log(`Error:`, error)
        }
    }

    function handleEditBtn(id){
navigate(`editBook/${id}`)
    }
    console.log(books)

    if (isLoading) {
        return <Spinner />
    }
    if (errorMsg) {
        return <p className="error-message">{errorMsg}</p>
    }

    function getFormatedDate(date) {
        const [year, month, day] = date.split('T')[0].split('-');
        return `${day}.${month}.${year}`
    }

    return (
        <div className="table-container">
            <table id="books-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Number of pages</th>
                        <th>Publish Date</th>
                        <th>ISBN</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.pageCount}</td>
                            <td>{getFormatedDate(book.publishedDate)}</td>
                            <td>{book.isbn}</td>
                            <td>{book.author.fullName}</td>
                            <td>{book.publisher.name}</td>
                            <td><button id="deleteBtn" onClick={()=>{handleDeleteBtn(book.id)}}>Delete</button></td>
                            <td><button id="editBtn" onClick={()=>{handleEditBtn(book.id)}}>Edit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Books;