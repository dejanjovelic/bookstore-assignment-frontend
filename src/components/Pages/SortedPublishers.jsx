import React, { useState, useEffect } from "react";
import SortDropdown from "./PagesElements/SortDropdown";
import { fetchSortedPublishers, fetchSortTypes, getAllPublishers } from "../../services/PublishersService";
import PublishersTable from "./PagesElements/PublishersTable";
import Spinner from "./PagesElements/Spinner";
import "../../styles/sortedPublishers.styles.scss"

const SortedPublishers = () => {
    const [publishers, setPublishers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [chosenSortType, setChosenSortType] = useState('');
    const [sortTypes, setSortTypes] = useState([]);



    const loadSortTypes = async () => {
        try {
            const sortTypesFromDb = await fetchSortTypes();
            setSortTypes(sortTypesFromDb);
        } catch (error) {
            if (error.status) {
                if (error.status === 500) {
                    setErrorMessage("Server is temporarily unavailable. Please refresh or try again later.")
                }
            } else if (error.request) {
                setErrorMessage("The server is not responding. Please try again later.")
            } else {
                setErrorMessage("Something went wrong. Please try again.")
            }
            console.log("An error occurred while fetching Publishers:", error);
        }
    };


    const getPublishersFromDB = async function () {
        setIsLoading(true);
        try {
            const publishersFromDB = await getAllPublishers();
            setTimeout(() => {
                setPublishers(publishersFromDB);
                setIsLoading(false);
            }, 1000);

        } catch (error) {
            if (error.status) {
                if (error.status === 500) {
                    setErrorMessage("Server is temporarily unavailable. Please refresh or try again later.")
                }
            } else if (error.request) {
                setErrorMessage("The server is not responding. Please try again later.")
            } else {
                setErrorMessage("Something went wrong. Please try again.")
            }
            console.log("An error occurred while fetching Publishers:", error);
            setIsLoading(false);
        }
    }


    useEffect(() => {
        loadSortTypes();
        getPublishersFromDB();
    }, []);

    const handleSortTypeChange = (sortType) => {
        setChosenSortType(sortType);
        const getSortedPublushers = async () => {
            try {
                const sortedPublishers = await fetchSortedPublishers(sortType);
                setPublishers(sortedPublishers);

            } catch (error) {
                console.error(error.message);
            }
        }
        getSortedPublushers()
    }

    if (errorMessage) {
        return (
            <div className="error-container">
                <div className="error-message">
                    {errorMessage}
                </div>
            </div>
        )
    }

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className="sorted-publisher">
            <div className="sort-dropdown-container">
                <SortDropdown sortType={chosenSortType} onSelect={handleSortTypeChange} sortTypes={sortTypes} />
            </div>
            <div className="table-container sorted">
                <PublishersTable publishers={publishers} />
            </div>
        </div>
    )
}
export default SortedPublishers;