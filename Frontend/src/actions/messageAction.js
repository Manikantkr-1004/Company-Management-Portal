import axios from 'axios';
const API = import.meta.env.VITE_BACKEND_URL + '/api/message';

export const SendChatMessages = async (data, token) => {
    return await axios.post(`${API}`, data, {
        withCredentials: true,
        headers: {
            'x-csrf-token': token
        }
    })
}

export const GetChatUsers = async () => {
    return await axios.get(`${API}`, {
        withCredentials: true
    })
}

export const GetChatConversations = async (userId) => {
    return await axios.get(`${API}/${userId}`, {
        withCredentials: true
    })
}