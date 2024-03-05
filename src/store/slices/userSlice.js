import { createSlice } from '@reduxjs/toolkit'
import { signIn } from '../../api/loginServices/userAuthService'

const initialState = {
   user: JSON.parse(localStorage.getItem('role'))
      ? {
           status: null,
           token: JSON.parse(localStorage.getItem('token')),
           role: JSON.parse(localStorage.getItem('role')),
        }
      : {
           status: null,
           token: null,
           role: null,
        },
}
export const userSlice = createSlice({
   name: 'user/userSlice',
   initialState,
   reducers: {},
   extraReducers: {
      [signIn.pending]: (state) => {
         state.status = 'loading'
      },
      [signIn.fulfilled]: (state, action) => {
         state.status = 'succes'
         // console.log(action)
         state.user.role = action.payload.role
         state.user.token = action.payload.token
         localStorage.setItem('token', JSON.stringify(action.payload.token))
         localStorage.setItem('role', JSON.stringify(action.payload.role))
      },
      [signIn.rejected]: (state) => {
         state.status = 'error'
      },
   },
})

export const userAction = userSlice.actions
