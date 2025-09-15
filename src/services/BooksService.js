import React from "react";
import AxiosConfig from "../config/AxiosConfig";
import axios from "axios";


const RESOURCE = "/api/books";

export async function getAllBooks() {
    const response = await AxiosConfig.get(RESOURCE);
    return response.data;
};

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