import axios from "axios";

const api = axios.create({
  baseURL:
    "https://task-management-system-production-450f.up.railway.app/api",
});

export default api;