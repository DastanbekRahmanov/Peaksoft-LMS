import { createSlice } from '@reduxjs/toolkit'
import { forgotPassword } from '../../api/loginServices/forgotPasswordService'

const initialState = {
   user: {
      status: null,
   },
}
export const forgotPassSlice = createSlice({
   name: 'email',
   initialState,
   reducers: {},
   extraReducers: {
      [forgotPassword.pending]: (state) => {
         state.status = 'loading'
      },
      [forgotPassword.fulfilled]: (state) => {
         state.status = 'succes'
      },
      [forgotPassword.rejected]: (state) => {
         state.status = 'error'
      },
   },
})

export const userAction = forgotPassSlice.actions
