import { Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/issueForm.styles.scss"
import { createNewIssueAsync } from "../../services/IssuesService";
import Spinner from "../Pages/PagesElements/Spinner";

const IssueForm = () => {
    const location = useLocation();
    const issue = location.state;
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const navigate =useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm();

    useEffect(() => {
        if (issue) {
            reset({
                name: issue.name,
                coverDate: new Date(issue.cover_date).toISOString(),
                coverDateDisplay: formatDate(issue.cover_date),
                issueNumber: issue.issue_number,
                imageUrl: issue.image?.small_url,
                description: stripHtml(issue.description),
                externalId: issue.id,
            });
        }
    }, [issue, reset]);

    const onSubmit = async (data) => {
        try {
            setIsLoading(true)
            const newIsssue = await createNewIssueAsync(data);
            setIsLoading(false);
            setSuccessMsg("New issue successfuly created.");
            setTimeout(() => {
                setSuccessMsg("");
                navigate("/volumes");
            }, 2000);
        } catch (error) {
            if (error.status) {
                if (error.status === 403) {
                    showError(`You have allredy created "${issue.name}" issue`);
                } else if (error.status === 503) {
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

     function showError(message) {
        setErrorMsg(message)
        setTimeout(() => setErrorMsg(''), 2000);
    }


    function formatDate(date) {
        const [year, month, day] = date.split("T")[0].split("-");
        return `${day}.${month}.${year}.`;
    }

    function stripHtml(html) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        return tempDiv.textContent || tempDiv.innerText || "";
    }

    if (isLoading) {
        return (
            <Spinner text={"Saving..."} />
        )
    }

    if(errorMsg){
        return(
            <div className="error-message">{errorMsg}</div>
        )
    }

    if (!issue) return <div>No issue data provided.</div>;

    return (
        <div className="issue-form-main-container">
            <div className="issue-form-container">
                <h2 className="issue-form-title">Create "{issue.name}" Issue</h2>
                <form id="issue-form" onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="name">Name:</label>
                    <input id="name" readOnly {...register("name")} />

                    <label htmlFor="coverDateDisplay">Cover date:</label>
                    <input
                        id="coverDateDisplay"
                        disabled
                        {...register("coverDateDisplay")}
                    />

                    <input
                        type="hidden"
                        {...register("coverDate")}
                    />

                    <label htmlFor="issueNumber">Issue No.:</label>
                    <input id="issueNumber" readOnly {...register("issueNumber")} />

                    <label htmlFor="issueImage">Image URL:</label>
                    <input id="issueImage" readOnly {...register("issueImage")} />

                    <label htmlFor="description">Description:</label>
                    <textarea id="description" readOnly {...register("description")} />

                    <label htmlFor="externalId">External id:</label>
                    <input id="externalId" readOnly {...register("externalId")} />

                    <label htmlFor="numberOfPages">Number of pages:</label>
                    <input
                        type="number"
                        id="numberOfPages"
                        min="0"
                        {...register("numberOfPages", {
                            required: "Number of pages is required.",
                            min: { value: 0, message: "Number must be zero or greater." }
                        })} />
                    <div className="issue-error-message">{errors.numberOfPages?.message || ""}</div>

                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        min="0.01"
                        step="0.01"

                        {...register("price", {
                            required: "Price is required.",
                            min: { value: 0.01, message: "Price must be greater than zero." }
                        })} />
                    <div className="issue-error-message">{errors.price?.message || ""}</div>

                    <label htmlFor="availableCopies">Available copies:</label>
                    <input
                        type="number"
                        id="availableCopies"
                        min="0"

                        {...register("availableCopies", {
                            required: "Available copies is required.",
                            min: { value: 0, message: "Available copies must be zero or greater." }
                        })} />
                    <div className="issue-error-message">{errors.availableCopies?.message || ""}</div>

                    <div className="issue-sumbitBtn-container">
                        <button type="submit" id="issue-submitBtn">Create new issue</button>
                    </div>
                </form>
            </div>
            {successMsg &&(
                <div className="success-message">{successMsg}</div>
            )}
        </div>
    );
};

export default IssueForm;

