import React from "react";
import AxiosConfig from "../config/AxiosConfig";


const RESOURCE = "/api/authors";

export async function getAllAuthors() {
    const response = await AxiosConfig.get(RESOURCE);
    return response.data;
}
export async function getAuthorsPaginationData(page, pageSize) {
    const response = await AxiosConfig.get(`${RESOURCE}/paging?page=${page}&pageSize=${pageSize}`);
    return response.data;
}