import React from "react";
import AxiosConfig from "../config/AxiosConfig";

const RESOURCE = "/api/reviews";

export async function createReviewAsync(data) {
    const response = await AxiosConfig.post(`${RESOURCE}`, data)
    return response.data;
}
export async function fetchAllUserReviews() {
    const response = await AxiosConfig.get(`${RESOURCE}/me`)
    return response.data;
}