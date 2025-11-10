import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchIssuesFromVolume } from "../../services/IssuesService";
import Spinner from "./PagesElements/Spinner";
import "../../styles/issues.style.scss";

const IssuesPage = () => {
    const location = useLocation();
    const { volumeId } = location.state;
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [issues, setIssues] = useState([]);
    const navigate = useNavigate();

    const getIssues = async () => {
        try {
            setIsLoading(true)
            const issuesFromDb = await fetchIssuesFromVolume(volumeId.data);
            setIssues(issuesFromDb);
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

    useEffect(() => {
        getIssues()
    }, [])

    const handleClik = (issue) => {
        navigate("/issueForm", {
            state: issue
        })
    }

    function showError(message) {
        setErrorMsg(message)
        setTimeout(() => setErrorMsg(''), 2000);
    }

    if(errorMsg){
        return(
            <div className="error-message">{errorMsg}</div>
        )
    }

    if (isLoading) {
        return (
            <Spinner />
        )
    }

    return (
        <div className="issues-table-container">
            <table id="issues-table">
                <thead>
                    <tr>
                        <th>Issue No.</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {issues.map(issue => {
                        return (
                            <tr key={issue.id} onClick={() => handleClik(issue)}>
                                <td>{issue.issue_number}</td>
                                <td>{issue.name}</td>
                                <td>
                                    <div
                                        className="volume-description"
                                        dangerouslySetInnerHTML={{ __html: issue.description }}
                                    />
                                </td>
                                <td><img src={issue.image.small_url} alt="image photo" style={{ maxWidth: "150px", maxHeight: "250px" }} /></td>
                                <td><button type="submit" className="issues-saveBtn">Save issue</button></td>
                            </tr>
                        )
                    })

                    }

                </tbody>
            </table>
        </div>
    );
};
export default IssuesPage;