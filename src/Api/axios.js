import axios from "axios";

const Instance = axios.create({
    baseURL:'http://localhost:4444'
})

Instance.interceptors.request.use(
    (confiq)=>{
        const token = localStorage.getItem('Jwt')
        if(token){
            confiq.headers.Authorization= `Bearer ${token}`
        }
        return confiq
    },
    (error)=>{
        return Promise.reject(error)
    }
)

export default Instance