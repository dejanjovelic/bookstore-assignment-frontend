import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchSortTypes } from "../../../services/PublishersService";
import "../../../styles/publishers.styles.scss"

const SortDropdown = ({ value, onSelect }) => {
    const [sortTypes, setSortTypes] = useState([]);

    useEffect(() => {
        const loadSortTypes = async () => {
            try {
                const sortTypesFromDb = await fetchSortTypes();
                setSortTypes(sortTypesFromDb);
            } catch (error) {
                console.error(error.message);
            }
        };
        loadSortTypes();
    }, [])

    useEffect(() => {
  if (sortTypes.length > 0 && value === '') {
    onSelect(String(sortTypes[0].key));
  }
}, [sortTypes]);

    const handleSortChange = (event) => {
        onSelect(event.target.value);
    }

    return (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Sort Type</InputLabel>
            {sortTypes.length > 0 && (
                <Select
                    labelId="sort-label"
                    value={value || ""}
                    onChange={handleSortChange}
                >
                    {sortTypes.map((type) => (
                        <MenuItem key={type.key} value={String(type.key)}>
                            {type.name}
                        </MenuItem>
                    ))}
                </Select>
            )}
        </FormControl>
    );
};
export default SortDropdown;
