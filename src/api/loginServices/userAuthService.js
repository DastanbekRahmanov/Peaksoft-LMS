import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL } from '../../utils/constants/constants'
import showError from '../../utils/helpers/helper'

export const signIn = createAsyncThunk(
   'user/sign',
   async ({ data, navigate }) => {
      try {
         const response = await axios.post(`${BASE_URL}${'auth/login'}`, data)
         const result = response.data
         if (result?.role === 'ADMIN') {
            navigate('/admin')
         } else if (result?.role === 'INSTRUCTOR') {
            navigate('/instructor')
         } else if (result?.role === 'STUDENT') {
            navigate('/student')
         } else {
            navigate('/login')
         }
         return result
      } catch (err) {
         showError(err.response.data.message)
      }
      return null
   }
)
