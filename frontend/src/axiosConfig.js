import axios from "axios";
const instance = axios.create({
    baseURL:
    "http://scriptguru-backend.onrender.com",
});
export default instance