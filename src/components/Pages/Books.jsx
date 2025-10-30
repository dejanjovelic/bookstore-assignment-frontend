import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBooks, deleteBook, fetchSortedBooks, getBooksSortTypes } from "../../services/BooksService";
import Spinner from "../Pages/PagesElements/Spinner";
import SortDropdown from "./PagesElements/SortDropdown";
import "../../styles/books.styles.scss"

const Books = () => {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [sortType, setSortType] = useState(0);
    const [sortTypes, setSortTypes] = useState([]);


    const getAllBooksFromDb = async () => {
        try {
            const booksFromDb = await fetchSortedBooks(sortType);
            setBooks(booksFromDb);
        } catch (error) {
            if (error.status) {
                if (error.status === 500) {
                    setErrorMsg("Server is temporarily unavailable. Please refresh or try again later.");
                }
            } else if (error.status === 400) {
                setErrorMsg("Invalid sort type.");
            }
            else if (error.request) {
                setErrorMsg("The server is not responding. Please try again later.");
            } else {
                setErrorMsg("Something went wrong. Please try again.");
            }
            console.log(`An error occured while fetching books:`, error);
            setIsLoading(false);
            setTimeout(() => { setErrorMsg('') }, 1000);
        }
    }

    const getBooksSortTypesfromDb = async () => {
        try {
            const sortTypesFromDb = await getBooksSortTypes();
            setSortTypes(sortTypesFromDb);
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


    useEffect(() => {
        setIsLoading(true);

        getAllBooksFromDb();
        getBooksSortTypesfromDb();

        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        getAllBooksFromDb();
    }, [sortType]);

    async function handleDeleteBtn(id) {
        try {
            await deleteBook(id);
            setBooks(prev => prev.filter(book => book.id !== id));

        } catch (error) {
            console.log(`Error:`, error)
        }
    }

    function handleEditBtn(id) {
        navigate(`/editBook/${id}`, { relative: "path" });
    }

    if (isLoading) {
        return <Spinner />
    }

    if (errorMsg) {
        return (
            <div className="error-container">
                <div className="error-message publishers">
                    {errorMsg}
                </div>
            </div>
        )
    }

    const handleSortTypeChange = (newSortType) => {
        setSortType(newSortType);
    }

    function getFormatedDate(date) {
        const [year, month, day] = date.split('T')[0].split('-');
        return `${day}.${month}.${year}.`
    }

    return (
        <div className="table-container">
            <h2 className="table-title">List of Books</h2>
            <div className="sort-dropdown-container-main">
                <div className="sortDropdown-container">
                    <SortDropdown sortType={sortType} sortTypes={sortTypes} onSelect={handleSortTypeChange} />
                </div>
            </div>

            <table id="books-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>ISBN</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th>Publication year</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.isbn}</td>
                            <td>{book.authorFullName}</td>
                            <td>{book.publisherName}</td>
                            <td>{getFormatedDate(book.publishedDate)}</td>
                            <td><button className="deleteBtn" onClick={() => { handleDeleteBtn(book.id) }}>Delete</button></td>
                            <td><button className="editBtn" onClick={() => { handleEditBtn(book.id) }}>Edit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Books;