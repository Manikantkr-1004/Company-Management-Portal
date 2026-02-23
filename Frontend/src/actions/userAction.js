import axios from 'axios';
const API = import.meta.env.VITE_BACKEND_URL + '/api/user';

export const AdminCreateUser = async (data) => {
    return await axios.post(`${API}`, data, {
        withCredentials: true
    })
}

export const AdminGetAllUsers = async () => {
    return await axios.get(`${API}`, {
        withCredentials: true
    })
}

export const UserUpdateProfile = async (id, data) => {
    return await axios.put(`${API}/${id}`, data, {
        withCredentials: true
    })
}

export const AdminDeleteUser = async (id) => {
    return await axios.delete(`${API}/${id}`, {
        withCredentials: true
    })
}

export const UserGetDashStats = async () => {
    return await axios.get(`${API}/stats`, {
        withCredentials: true
    })
}