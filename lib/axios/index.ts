"use client"

import axios from "axios";

const pubApi = axios.create({
    baseURL: "/api"
});

export {
    pubApi
};






