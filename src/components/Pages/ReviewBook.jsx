import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Rating, TextareaAutosize, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { createReviewAsync } from "../../services/ReviewService";
import "../../styles/reviewBook.styles.scss"

const ReviewBook = ({ open, handleClose, bookid, bookTitle }) => {
    const [value, setValue] = useState(0);
    const [comment, setComment] = useState("");



    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            rating: value,
            comment: comment,
            bookid: bookid
        }

        try {
            const addNewReview = async () => {
                const createdReview = await createReviewAsync(data);
                console.log(createdReview);
            }
            addNewReview();
            handleClose();
        } catch (error) {
            console.log(error);
        }
    }


    return (

        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
            <DialogTitle>Review book "{bookTitle}"</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Let us know what you think — your review helps others discover great reads.
                </DialogContentText>
                <br />
                <form onSubmit={handleSubmit} id="subscription-form">
                    <Typography component="legend">Rating</Typography>
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    />
                    <br />
                    <br />
                    <TextField
                        label="Review comment:"
                        id="comment"
                        type="text"
                        name="comment"
                        multiline
                        rows={4}
                        fullWidth
                        variant="outlined"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button
                    style={{
                        backgroundColor: "red",
                        color: "white",
                        fontWeight: "bold",
                        borderRadius: "8px"
                    }}
                    onClick={handleClose}
                >
                    Cancel
                </Button>
                <Button
                    style={{
                        backgroundColor: "#4A90E2",
                        color: "white",
                        fontWeight: "bold",
                        borderRadius: "8px"
                    }}
                    type="submit"
                    form="subscription-form">
                    Submit review
                </Button>
            </DialogActions>
        </Dialog>

    );
};
export default ReviewBook;
