import axios from "axios";


export const jspApi = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 5000
})