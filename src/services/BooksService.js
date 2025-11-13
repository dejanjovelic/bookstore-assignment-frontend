import React from "react";
import AxiosConfig from "../config/AxiosConfig";



const RESOURCE = "/api/books";

export async function getAllBooks() {
    const response = await AxiosConfig.get(RESOURCE);
    return response.data;
};
export async function getAllPaginated(page, pageSize) {
    const response = AxiosConfig.get(`${RESOURCE}/paging?page=${page}&pageSize=${pageSize}`);
    return (await response).data;
}

export async function getBookById(id) {
    const response = await AxiosConfig.get(`${RESOURCE}/${id}`);
    return response.data;
}

export async function createBook(data) {
    const response = await AxiosConfig.post(RESOURCE, data);
    return response.data;
}

export async function updateBook(id, data) {
    const response = await AxiosConfig.put(`${RESOURCE}/${id}`, data);
    return response.data;
}

export async function deleteBook(id) {
    const response = await AxiosConfig.delete(`${RESOURCE}/${id}`);
    return response.data;
}

export async function getBooksSortTypes() {
    const response = await AxiosConfig.get(`${RESOURCE}/sortTypes`)
    return response.data;
}

export async function fetchSortedAndPaginatedBooks(sortType, page, pageSize) {
    const response = await AxiosConfig.get(`${RESOURCE}/sortedAndPaginated?sortType=${sortType}&page=${page}&pageSize=${pageSize}`);
    return response.data;
}
export async function fetchFilteredAndSortedAndPaginatedBooks(filter, sortType, page, pageSize) {
    const response = await AxiosConfig.post(`${RESOURCE}/filteredAndSortedAndPaginated?sortType=${sortType}&page=${page}&pageSize=${pageSize}`, filter);
    return response.data;
}