import axios from 'axios'

// eslint-disable-next-line import/no-cycle
import store from '../store/index'

import { BASE_URL } from '../utils/constants/constants'

const headers = { 'Content-Type': 'multipart/form-data' }
const fileUpload = axios.create({ baseURL: BASE_URL, headers })
fileUpload.interceptors.request.use((config) => {
   const updatedConfig = { ...config }
   const { token } = store.getState().auth.user

   if (token) {
      updatedConfig.headers.Authorization = `Bearer ${token}`
   }
   return updatedConfig
})

fileUpload.interceptors.response.use(
   (response) => {
      return Promise.resolve(response)
   },
   (error) => {
      return Promise.reject(error)
   }
)
export default fileUpload
