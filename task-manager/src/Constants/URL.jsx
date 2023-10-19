import axios from 'axios'

export const API_URL = "https://64de51cf825d19d9bfb27202.mockapi.io/task"

export const fetchTask = async () => {
    const response = await axios.get(`${API_URL}`);
    return response.data
}

export const createTask = async (data) => {
    const response = await axios.post(`${API_URL}`, data);
    console.log("added")
    return response.data
}


export const updateTask = async (id, data) => {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data
}

export const deleteTask = async(id) =>{
    const response = await axios.delete(`${API_URL}/${id}`);
}

