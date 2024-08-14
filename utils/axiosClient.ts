import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import { deleteCookie, getCookie } from "cookies-next"

const jwt = getCookie("jwt") as string | undefined
const axiosClient = axios.create({
  baseURL: `${process.env.API_URL}`,
  headers: {
    Authorization: `Bearer ${jwt}`,
  },
})

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.config.method === "POST") {
      window.scrollTo(0, 0)
    }
    return response
  },
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      deleteCookie("jwt")
      window.location.href = window.location.origin + "/login"
    }
    return Promise.reject(error)
  }
)

export default axiosClient
