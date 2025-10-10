import React from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import "../authors.styles.scss";

export function TablePaginationActions(props) {
    const theme = useTheme();
    const {
        hasNextPage,
        hasPreviousPage,
        page,
        totalPages,
        onPageChange
    } = props;


    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        if (hasPreviousPage) {
            onPageChange(event, page - 1);
        }
    };

    const handleNextButtonClick = (event) => {
        if (hasNextPage) {
            onPageChange(event, page + 1);
        }
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, totalPages - 1);
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={!hasPreviousPage}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={!hasPreviousPage}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={!hasNextPage}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page === totalPages - 1 || totalPages === 0}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
};
