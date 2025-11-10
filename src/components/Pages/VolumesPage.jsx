import { Table, TableBody, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchVolumesFromComicVine } from "../../services/VolumesService";
import { useNavigate } from "react-router-dom";
import "../../styles/volumesPage.style.scss"
import Spinner from "./PagesElements/Spinner";

const VolumesPage = () => {
    const [volumes, setVolumes] = useState([]);
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const getVolumes = async (data) => {
        try {
            setIsLoading(true);
            const volumesFromDb = await fetchVolumesFromComicVine(data);
            setVolumes(volumesFromDb);
            setIsLoading(false);
        } catch (error) {
            if (error.status) {
                if (error.status === 503) {
                    showError(`The service is temporarily unavailable. Please try again later.`);
                } else if (error.status === 500) {
                    showError("Server is temporarily unavailable. Please refresh or try again later.");
                } else {
                    showError(`Error: ${error.status}`);
                }
            } else if (error.request) {
                showError("The server is not responding. Please try again later.");
            } else {
                showError("Something went wrong. Please try again.");
            }
            setIsLoading(false);
            console.log(`An error occured while fetching book:`, error);
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        getVolumes(query);
    }

    const handleTableRowClick = (data) => {
        navigate("/issues", {
            state: {
                volumeId: { data }
            }
        });
    }

    function showError(message) {
        setErrorMsg(message)
        setTimeout(() => setErrorMsg(''), 2000);
    }

    if (errorMsg) {
        return (
            <div className="error-message">{errorMsg}</div>
        )
    }

    if (isLoading) {
        return (
            <Spinner />
        )
    }

    return (
        <>
            <div className="main-volume-container">
                <div className="search-container">
                    <form onSubmit={handleSubmit}>
                        <input
                            id="volume-search-input"
                            name="volumeSearch"
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search volumes..."
                            autoComplete="on"
                        />
                        <button type="submit" className="volumes-searchBtn">Search</button>
                    </form>
                </div>
                <div className="table-container">
                    {volumes.length !== 0 &&
                        <>
                            <h2 className="volumes-title">Comic Volumes Overview</h2>
                            <h4 className="volumes-subtitle">Search Results for “{query}”</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Published Issues</th>
                                        <th>Image</th>
                                    </tr>

                                </thead>
                                <tbody>
                                    {volumes.map(volume => {
                                        return (
                                            <tr key={volume.id} onClick={() => handleTableRowClick(volume.id)}>
                                                <td>{volume.name}</td>
                                                <td>{volume.count_of_issues}</td>
                                                <td><img src={volume.image.small_url} alt="image photo" style={{ width: "50px", height: "50px" }} /></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </>}
                </div>
            </div>
        </>
    );
}
export default VolumesPage;