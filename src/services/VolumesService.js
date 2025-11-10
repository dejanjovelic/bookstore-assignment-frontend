import { SynagogueOutlined } from "@mui/icons-material";
import React from "react";
import AxiosConfig from "../config/AxiosConfig";

const RESOURCE = "/api/volumes";

export async function fetchVolumesFromComicVine(data) {
    const response = await AxiosConfig.get(`${RESOURCE}?query=${data}`)
    return response.data;
}