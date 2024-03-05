import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL } from '../../utils/constants/constants'
import showError from '../../utils/helpers/helper'

export const resetPassword = createAsyncThunk(
   'newPassword',
   async ({ data, navigate }) => {
      try {
         const response = await axios.post(
            `${BASE_URL}email=${data.id}&link=${data.newPassword}`,
            {
               id: data.id,
               newPassword: data.newPassword,
            }
         )
         //  console.log(response.data)
         if (response.data) {
            navigate('/login')
         }
         const result = response.data
         //  console.log(data)
         return result
      } catch (err) {
         //  console.error(err)
         showError(err.response.data.message)
      }
      return null
   }
)
