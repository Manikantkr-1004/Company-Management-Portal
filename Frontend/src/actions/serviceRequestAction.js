import axios from 'axios';
const API = import.meta.env.VITE_BACKEND_URL + '/api/service-request';

export const CreateServiceRequest = async (data, token) => {
    return await axios.post(`${API}`, data, {
        withCredentials: true,
        headers: {
            'x-csrf-token': token
        }
    })
}

export const GetAllServiceRequests = async () => {
    return await axios.get(`${API}`, {
        withCredentials: true
    })
}

export const AdminUpdateServiceRequest = async (id, data, token) => {
    return await axios.put(`${API}/${id}`, data, {
        withCredentials: true,
        headers: {
            'x-csrf-token': token
        }
    })
}