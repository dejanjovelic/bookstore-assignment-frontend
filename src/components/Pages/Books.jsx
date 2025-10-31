import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteBook, fetchFilteredAndSortedBooks, fetchSortedBooks, getBooksSortTypes } from "../../services/BooksService";
import Spinner from "../Pages/PagesElements/Spinner";
import SortDropdown from "./PagesElements/SortDropdown";
import "../../styles/books.styles.scss"
import FilterSection from "./PagesElements/FilterSection";

const Books = () => {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [sortType, setSortType] = useState(0);
    const [sortTypes, setSortTypes] = useState([]);
    const [filter, setFilter] = useState([]);
    const navigate = useNavigate();


    const getAllSortedBooksFromDb = async () => {
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

        getAllSortedBooksFromDb();
        getBooksSortTypesfromDb();

        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        if (filter && Object.keys(filter).length > 0) {
            filterAndSortBooks(filter)
        } else {
            getAllSortedBooksFromDb();
        }

    }, [sortType]);

    async function handleDeleteBtn(id) {
        try {
            await deleteBook(id);
            setBooks(prev => prev.filter(book => book.id !== id));

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
            console.log(`An error occured while deliting books:`, error);
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

    function filterAndSortBooks(filter) {
        const getFilteredAndSortedBooks = async () => {
            try {
                const filteredAndSortedBooksFromDb = await fetchFilteredAndSortedBooks(filter, sortType);
                setFilter(filter)
                setBooks(filteredAndSortedBooksFromDb);
            } catch (error) {
                if (error.status) {
                    if (error.status === 500) {
                        setErrorMsg("Server is temporarily unavailable. Please refresh or try again later.");
                    }
                } else if (error.status === 400) {
                    setErrorMsg("Bad request data.");
                } else if (error.request) {
                    setErrorMsg("The server is not responding. Please try again later.");
                } else {
                    setErrorMsg("Something went wrong. Please try again.");
                }
                console.log(`An error occured while fetching books:`, error);
            }
        }
        getFilteredAndSortedBooks();
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
                <div className="filter-container">
                    <FilterSection books={books} onfilter={filterAndSortBooks} />
                </div>
            </div>

            <table id="books-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>ISBN</th>
                        <th>Author</th>
                        <th>Author Date of birth</th>
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
                            <td>{getFormatedDate(book.authorDateOfBirth)}</td>
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