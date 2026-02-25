import axios from 'axios';
const API = import.meta.env.VITE_BACKEND_URL + '/api/user';

export const AdminCreateUser = async (data, token) => {
    return await axios.post(`${API}`, data, {
        withCredentials: true,
        headers: {
            'x-csrf-token': token
        }
    })
}

export const AdminGetAllUsers = async (role) => {
    return await axios.get(`${API}?role=${role || ''}`, {
        withCredentials: true
    })
}

export const UserUpdateProfile = async (id, data, token) => {
    return await axios.put(`${API}/${id}`, data, {
        withCredentials: true,
        headers: {
            'x-csrf-token': token
        }
    })
}

export const AdminDeleteUser = async (id, token) => {
    return await axios.delete(`${API}/${id}`, {
        withCredentials: true,
        headers: {
            'x-csrf-token': token
        }
    })
}

export const UserGetDashStats = async () => {
    return await axios.get(`${API}/stats`, {
        withCredentials: true
    })
}