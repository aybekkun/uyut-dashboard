import axios from "axios"
import { BASE_URL } from "src/config/url.config"
import { getToken } from "src/utils/storage.utils"


const api = axios.create({
	baseURL: BASE_URL
})

api.interceptors.request.use((config) => {
	const token = getToken()
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

export { api }
