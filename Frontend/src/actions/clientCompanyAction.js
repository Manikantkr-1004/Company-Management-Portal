import axios from 'axios';
const API = import.meta.env.VITE_BACKEND_URL + '/api/client-company';

export const AdminCreateClientCompany = async (data, token) => {
    return await axios.post(`${API}`, data, {
        withCredentials: true,
        headers: {
            'x-csrf-token': token
        }
    })
}

export const AdminGetClientCompany = async () => {
    return await axios.get(`${API}`, {
        withCredentials: true
    })
}