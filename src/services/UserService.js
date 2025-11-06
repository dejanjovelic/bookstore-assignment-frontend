import React from "react";
import AxiosConfig from "../config/AxiosConfig";

const API_URL = "/api/auth";

export async function registerUser(data) {
    const response = await AxiosConfig.post(`${API_URL}/register`, data);
    return response.data;
}
export async function loginUser(data) {
    const response = await AxiosConfig.post(`${API_URL}/login`, data);
    return response.data;
}
export async function getUserProfile() {
    const response = await AxiosConfig.get(`${API_URL}/profile`);
    return response.data;    
}