/* eslint-disable import/no-cycle */
import { createSlice } from '@reduxjs/toolkit'
import { getCurse, getCurseLessons } from './student-actions'

const initialState = {
   course: [],
   status: null,
   error: null,
   lessons: [],
}

export const studentSlice = createSlice({
   name: 'student',
   initialState,
   reducers: {},
   extraReducers: {
      [getCurse.pending]: (state) => {
         state.status = 'loading'
      },
      [getCurse.fulfilled]: (state, action) => {
         state.status = null
         state.course = action.payload
      },
      [getCurse.rejected]: (state, action) => {
         state.status = 'rejected'
         state.error = action.payload
      },
      [getCurseLessons.pending]: (state) => {
         state.status = 'loading'
      },
      [getCurseLessons.fulfilled]: (state, action) => {
         state.status = null
         state.lessons = action.payload
      },
      [getCurseLessons.rejected]: (state, action) => {
         state.status = 'rejected'
         state.error = action.payload
      },
   },
})

export const studentAction = studentSlice.actions
