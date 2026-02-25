import axios from 'axios';
const API = import.meta.env.VITE_BACKEND_URL + '/api/project';

export const GetAllProjects = async () => {
    return await axios.get(`${API}`, {
        withCredentials: true
    })
}

export const AdminAssignEmployee = async (id, data, token) => {
    return await axios.put(`${API}/${id}/assign`, data, {
        withCredentials: true,
        headers: {
            'x-csrf-token': token
        }
    })
}

export const EmployeeUpdateProjectStatus = async (id, data, token) => {
    return await axios.put(`${API}/${id}/status`, data, {
        withCredentials: true,
        headers: {
            'x-csrf-token': token
        }
    })
}