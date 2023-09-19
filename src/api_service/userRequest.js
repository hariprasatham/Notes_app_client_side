import axios from 'axios'

const BASE_URL = `${import.meta.env.VITE_SERVER_URL}/api`

export const userRequest = axios.create({
        baseURL: BASE_URL
    })

