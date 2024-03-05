import axios from 'axios'
// eslint-disable-next-line import/no-cycle
import store from '../store/index'

import { BASE_URL, JWT_TOKEN_KEY } from '../utils/constants/constants'

const headers = {
   'Content-Type': 'application/json',
}

const axiosInstance = axios.create({ baseURL: BASE_URL, headers })
axiosInstance.interceptors.request.use((config) => {
   const updatedConfig = { ...config }
   const { token } = store.getState().auth.user

   if (token) {
      updatedConfig.headers.Authorization = `Bearer ${token}`
   }
   return updatedConfig
})

axiosInstance.interceptors.response.use(
   (response) => {
      return Promise.resolve(response)
   },
   (error) => {
      if (error.response.status === 401) {
         localStorage.removeItem(JWT_TOKEN_KEY)
      }
      return Promise.reject(error)
   }
)
export default axiosInstance
