import axios, { Axios } from "axios";
import AxiosConfig from "../config/AxiosConfig";

const RESORCE = "/api/publishers";

export async function getAllPublishers() {
    const response = await AxiosConfig.get(RESORCE);
    return response.data;
};

export async function getPublisherById(id) {
    const response = await AxiosConfig.get(`${RESORCE}/${id}`);
    return response.data;
};

export async function createPublisher(publisherData) {
    const response = await AxiosConfig.post(RESORCE, publisherData, {
        headers:{'Content-Type':'application.json'}
    })
    return response.data
};