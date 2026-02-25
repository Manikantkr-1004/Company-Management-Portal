import axios from 'axios';
const API = import.meta.env.VITE_BACKEND_URL + '/api/auth';

export const UserLogin = async (data, token) => {
    return await axios.post(`${API}/login`, data, {
        withCredentials: true,
        headers: {
            'x-csrf-token': token
        }
    })
}

export const UserLogout = async (token) => {
    return await axios.post(`${API}/logout`, {}, {
        withCredentials: true,
        headers: {
            'x-csrf-token': token
        }
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