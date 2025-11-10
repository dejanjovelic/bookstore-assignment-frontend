import React from "react";
import AxiosConfig from "../config/AxiosConfig";

const RESOURCE = "/api/issues";

export async function fetchIssuesFromVolume(volumeId) {
    const response = await AxiosConfig.get(`${RESOURCE}?volumeId=${volumeId}`)
    return response.data;
}
export async function createNewIssueAsync(data) {
    const response = await AxiosConfig.post(`${RESOURCE}`, data);
    return response.data;
}