import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteBook, fetchFilteredAndSortedAndPaginatedBooks, fetchSortedAndPaginatedBooks, getBooksSortTypes } from "../../services/BooksService";
import Spinner from "../Pages/PagesElements/Spinner";
import SortDropdown from "./PagesElements/SortDropdown";
import "../../styles/books.styles.scss"
import FilterSection from "./PagesElements/FilterSection";
import UserContext from "./UserContext";
import ReviewBook from "./ReviewBook";
import { fetchAllUserReviews } from "../../services/ReviewService";
import { TablePagination } from "@mui/material";

const Books = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [sortTypes, setSortTypes] = useState([]);
    const [sortType, setSortType] = useState(0);
    const [books, setBooks] = useState([]);
    const [filter, setFilter] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState("");
    const [selectedBookITitle, setSelectedBookTitle] = useState("");
    const [usersReviews, setUsersReviews] = useState([]);
    console.log("Books", books);


    const handleClose = () => {
        setOpen(false);
    };


    const getAllSortedAndPaginatedBooksFromDb = async () => {
        try {
            const booksFromDb = await fetchSortedAndPaginatedBooks(sortType, page + 1, pageSize);
            setBooks(booksFromDb.items);
            setTotalRows(booksFromDb.totalRowCount);

            console.log(booksFromDb);
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

    const getAllUsersReviewsFromDb = async () => {
        try {
            const usersReviewsFromDb = await fetchAllUserReviews();
            console.log(usersReviewsFromDb);
            setUsersReviews(usersReviewsFromDb);
        } catch (error) {
            console.error(error);
        }
    }

    async function getfilteredAndSortedAndPaginatedBooks(newFilter = filter) {
        try {
            const filteredAndSortedAndPaginatedBooksFromDb = await fetchFilteredAndSortedAndPaginatedBooks(
                newFilter, 
                sortType, 
                page +1, 
                pageSize
            );
            setFilter(newFilter)
            setBooks(filteredAndSortedAndPaginatedBooksFromDb.items);
            setTotalRows(filteredAndSortedAndPaginatedBooksFromDb.totalRowCount);
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


    useEffect(() => {
        setIsLoading(true);

        getAllSortedAndPaginatedBooksFromDb(page);
        getBooksSortTypesfromDb();
        getAllUsersReviewsFromDb();

        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        if (filter && Object.keys(filter).length > 0) {
            getfilteredAndSortedAndPaginatedBooks(filter, page)
        } else {
            getAllSortedAndPaginatedBooksFromDb(page);
        }

    }, [sortType, page , pageSize]);

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

    function handleReviewBtn(bookid, bookTitle) {
        setSelectedBookId(bookid);
        setSelectedBookTitle(bookTitle);
        setOpen(true);
    }

    function handleChangePageSize(event) {
        console.log("rowsPerPage value:", +event.target.value);
        setPageSize(Number(+event.target.value))
        setPage(0);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };


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
                <div className="filter-container">
                    <FilterSection 
                    books={books} 
                    onfilter={getfilteredAndSortedAndPaginatedBooks} 
                    />
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
                        {user && <th></th>}
                        {user?.role == "Editor" && (
                            <>
                                <th></th>
                                <th></th>
                            </>)}
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
                            {user &&
                                <td>
                                    <button
                                        className="reviewBtn"
                                        onClick={() => { handleReviewBtn(book.id, book.title) }}
                                        disabled={usersReviews.some(review => review.bookId === book.id)}

                                    >
                                        Review Book
                                    </button>
                                </td>
                            }
                            {user?.role === "Editor" &&
                                <>
                                    <td><button className="deleteBtn" onClick={() => { handleDeleteBtn(book.id) }}>Delete</button></td>
                                    <td><button className="editBtn" onClick={() => { handleEditBtn(book.id) }}>Edit</button></td>
                                </>
                            }
                        </tr>
                    ))}
                    <tr>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 50, 100]}
                            count={totalRows}
                            rowsPerPage={pageSize}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangePageSize}
                        />

                    </tr>
                </tbody>
            </table>
            {open && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <ReviewBook open={open} handleClose={handleClose} bookid={selectedBookId} bookTitle={selectedBookITitle} />
                    </div>
                </div>
            )}

        </div>

    )
}

export default Books;