import axios from 'axios';
const API = import.meta.env.VITE_BACKEND_URL + '/api/auth';

export const UserLogin = async (data) => {
    return await axios.post(`${API}/login`, data, {
        withCredentials: true
    })
}

export const UserLogout = async () => {
    return await axios.post(`${API}/logout`, {}, {
        withCredentials: true
    })
}

export const GetUserMe = async () => {
    return await axios.get(`${API}/me`, {
        withCredentials: true
    })
}

export const GetCsrfToken = async () => {
    return await axios.get(`${API}/csrf-token`, {
        withCredentials: true
    })
}