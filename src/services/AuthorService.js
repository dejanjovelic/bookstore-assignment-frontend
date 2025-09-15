import React from "react";
import AxiosConfig from "../config/AxiosConfig";


const RESOURCE = "/api/authors";

export async function getAllAuthors() {
    const response = await AxiosConfig.get(RESOURCE);
    return response.data;    
}