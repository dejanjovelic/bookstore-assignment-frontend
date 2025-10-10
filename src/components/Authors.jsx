import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "../authors.styles.scss";
import { getAuthorsPaginationData } from "../services/AuthorService";
import { TableFooter, TablePagination } from "@mui/material";
import { TablePaginationActions } from "./TablePaginationActions";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";


const Authors = () => {

    const [authors, setAuthors] = useState([]);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRowsCount, setTotalRowsCount] = useState(0);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(2);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getAuthorsData(page + 1, pageSize)
    }, [page, pageSize])


    async function getAuthorsData(page, pageSize) {
        try {
            setIsLoading(true);
            const authorsData = await getAuthorsPaginationData(page, pageSize);
            setAuthors(authorsData.items);
            setHasNextPage(authorsData.hasNextPage);
            setHasPreviousPage(authorsData.hasPreviousPage);
            setTotalPages(authorsData.totalPages);
            setTotalRowsCount(authorsData.totalRowCount);
            setIsLoading(false);
        } catch (error) {
            setMessageAndNavigate('An unknown error occurred. Please try later.', setErrorMsg)
            if (error.response && error.response.data && error.response.data.error) {
                setMessageAndNavigate(error.response.data.error, setErrorMsg)
            } else if (error.response) { 
                setMessageAndNavigate(`An Server error occurred. Please try later.`, setErrorMsg)
            } else {
                setMessageAndNavigate(`An Server error occurred. Please try later.`, setErrorMsg)
            }
             setIsLoading(false);
             console.log(`Error: ${error}`)
        }
    }

    function getFormatedDate(date) {
        const [year, month, day] = date.split('T')[0].split('-')
        return `${day}.${month}.${year}`;
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangePageSize = (event) => {
        const newSize = parseInt(event.target.value, 10);
        setPageSize(newSize);
        setPage(0);
    }

    const setMessageAndNavigate = (message, resultFunction) => {
        resultFunction(message)
        setTimeout(() => {
            resultFunction('');
            navigate('/');
        }, 10000);

    }
    if (errorMsg) {
        return (
            <div className="error-container">
                <div className="error-message">
                    {errorMsg}
                </div>
            </div>
        )
    }
    if (isLoading) {
        return (
            <Spinner />
        )
    }

    return (
        <TableContainer className="table-container" >
             <h2 className="table-title">List of Authors</h2>
            <Table className="authors-table" sx={{ minWidth: 650 }} aria-label="simple table">

                <TableHead>
                    <TableRow>
                        <TableCell align="right" className="authors-table-headRow">Full Name</TableCell>
                        <TableCell align="right" className="authors-table-headRow">Biography</TableCell>
                        <TableCell align="right" className="authors-table-headRow">Date of birth</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {authors.map(author => {
                        return (
                            <TableRow key={author.id}>
                                <TableCell sx={{ width: '25%' }} align="right" className="authors-table-bodyRow">{author.fullName}</TableCell>
                                <TableCell sx={{ width: '50%' }} align="right" className="authors-table-bodyRow">{author.biography}</TableCell>
                                <TableCell sx={{ width: '25%' }} align="right" className="authors-table-bodyRow">{getFormatedDate(author.dateOfBirth)}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>

                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[2, 4, 6, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={totalRowsCount}
                            rowsPerPage={pageSize}
                            page={page}
                            slotProps={{
                                select: {
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                    sx: {
                                        marginRight: 0,
                                    }
                                },
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangePageSize}
                            ActionsComponent={props => (
                                <TablePaginationActions
                                    {...props}
                                    hasNextPage={hasNextPage}
                                    hasPreviousPage={hasPreviousPage}
                                    totalPages={totalPages}
                                />)}
                        />
                    </TableRow>

                </TableFooter>

            </Table>

        </TableContainer>
    )
}
export default Authors;