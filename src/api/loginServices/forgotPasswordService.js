import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL } from '../../utils/constants/constants'
import showError from '../../utils/helpers/helper'

export const forgotPassword = createAsyncThunk(
   'email',
   async ({ data, navigate }) => {
      try {
         const response = await axios.post(
            `${`${BASE_URL}${'auth/forgot/password?'}`}email=${
               data.email
            }&link=${data.link}`,
            {
               email: data.email,
               link: data.link,
            }
         )
         if (response.data) {
            navigate('/forgot-password')
         }
         const result = response.data
         return result
      } catch (err) {
         //  console.error(err)
         showError(err.response.data.message)
      }
      return null
   }
)
