import axios from "axios"

const supabaseApiUrl = process.env.REACT_APP_SUPABASE_API_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

//apply base url for axios
const API_URL = supabaseApiUrl

const axiosApi = axios.create({
	baseURL: API_URL,
	headers: {
    "Authorization": `Bearer ${supabaseAnonKey}`,
  },
})

axiosApi.interceptors.response.use(
response => response,
error => Promise.reject(error)
)

export async function get(url, config = {}) {
	return await axiosApi.get(url, { ...config }).then(response => response.data)
}

export async function post(url, data, config = {}) {
	return axiosApi
		.post(`${API_URL}${url}`, data, { ...config })
		.then(response => response.data)
}

