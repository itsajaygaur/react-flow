import axios from 'axios'

const token = localStorage.getItem('token')

export const authInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
    headers: {Authorization: `Bearer ${token}`},
})

export const publicInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
})