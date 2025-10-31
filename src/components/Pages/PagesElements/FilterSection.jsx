import React, { useEffect, useState } from "react";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";



const FilterSection = ({ books, onfilter }) => {
    const [title, setTitle] = useState('');
    const [publishedDateFrom, setPublishedDateFrom] = useState(null);
    const [publishedDateTo, setPublishedDateTo] = useState(null);
    const [authorFullName, setChoosenAuthorFullName] = useState("");
    const [authorFullNames, setAuthorsFullNames] = useState([]);
    const [authorFirstName, setAuthorFirstName] = useState("");
    const [authorDateOfBirthFrom, setAuthorDateOfBirthFrom] = useState(null);
    const [authorDateOfBirthTo, setAuthorDateOfBirthTo] = useState(null);

    const filter = () => {
        onfilter({
            title: title || null,
            publishedDateFrom: publishedDateFrom || null,
            publishedDateTo: publishedDateTo || null,
            authorFullName: authorFullName || null,
            authorFirstName: authorFirstName || null,
            authorDateOfBirthFrom: authorDateOfBirthFrom || null,
            authorDateOfBirthTo: authorDateOfBirthTo || null
        })
    }

    useEffect(() => {
        setAuthorsFullNames([...new Set(books.map(book => book.authorFullName))]
            .map((name) => name))
    }, [])

    const handleAuthorsFullNameChange = (event) => {
        setChoosenAuthorFullName(event.target.value)
    }


    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item size={4}>
                    <TextField fullWidth id="title" label="Title" variant="filled"
                        value={title} onChange={(e) => setTitle(e.target.value)} />
                </Grid>

                <Grid item size={4}>
                    <TextField fullWidth id="authorFirstName" label="Author First Name" variant="filled"
                        value={authorFirstName} onChange={(e) => setAuthorFirstName(e.target.value)} />
                </Grid>

                <Grid item size={4}>
                    <FormControl>
                        <InputLabel id="author-fullname-label">Authors full name</InputLabel>
                        <Select
                            sx={{ minWidth: 290 }}
                            labelId="author-fullname-select-label"
                            label="Authors full name"
                            id="author-fullname-select"
                            value={authorFullName}
                            onChange={handleAuthorsFullNameChange}>
                            {authorFullNames.map((name) => (
                                <MenuItem key={name} value={name}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item size={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Published date from"
                            value={publishedDateFrom}
                            onChange={(newValue) => setPublishedDateFrom(newValue)}
                        />
                    </LocalizationProvider>

                </Grid>

                <Grid item size={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Published date to"
                            value={publishedDateTo}
                            onChange={(newValue) => setPublishedDateTo(newValue)}
                        />
                    </LocalizationProvider>

                </Grid>

                <Grid item size={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Author Date Of Birth From"
                            value={authorDateOfBirthFrom}
                            onChange={(newValue) => setAuthorDateOfBirthFrom(newValue)}
                        />
                    </LocalizationProvider>

                </Grid>
                <Grid item size={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Author Date Of Birth To"
                            value={authorDateOfBirthTo}
                            onChange={(newValue) => setAuthorDateOfBirthTo(newValue)}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item size={4}>
                    <Button variant="outlined" onClick={filter}>Filter</Button>
                </Grid>
            </Grid>
        </Box>

    );
};

export default FilterSection;