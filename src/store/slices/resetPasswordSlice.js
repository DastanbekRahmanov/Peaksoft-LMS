import { createSlice } from '@reduxjs/toolkit'
import { resetPassword } from '../../api/loginServices/resetPasswordService'

const initialState = {
   user: {
      status: null,
   },
}
export const resetPassSlice = createSlice({
   name: 'newPassword',
   initialState,
   reducers: {},
   extraReducers: {
      [resetPassword.pending]: (state) => {
         state.status = 'loading'
      },
      [resetPassword.fulfilled]: (state) => {
         state.status = 'succes'
      },
      [resetPassword.rejected]: (state) => {
         state.status = 'error'
      },
   },
})

export const userAction = resetPassSlice.actions
