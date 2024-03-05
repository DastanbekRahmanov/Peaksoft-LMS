/* eslint-disable import/no-cycle */
import { createSlice } from '@reduxjs/toolkit'
import { setError, setLoading } from '../../../../utils/helpers/helper'
import {
   assignGroups,
   getCourses,
   getCoursesById,
   getCourseStudentsById,
} from './course-actions'

const initialState = {
   courses: [],
   courseStudents: [],
   courseName: '',
   status: null,
   error: null,
}

export const InsCoursesSlice = createSlice({
   name: 'instructor-courses',
   initialState,
   reducers: {},
   extraReducers: {
      // * getting all courses
      [getCourses.pending]: setLoading,
      [getCourses.fulfilled]: (state, { payload }) => {
         state.status = null
         state.courses = payload
      },
      [getCourses.rejected]: setError,
      // * assigning groups to course
      [assignGroups.fulfilled]: (state) => {
         state.status = 'assigned'
      },
      [assignGroups.rejected]: setError,
      // * getting all students of course
      [getCourseStudentsById.pending]: setLoading,
      [getCourseStudentsById.fulfilled]: (state, { payload }) => {
         state.status = null
         state.courseStudents = payload
         state.error = null
      },
      [getCourseStudentsById.rejected]: setError,
      // * get course by id
      [getCoursesById.fulfilled]: (state, { payload }) => {
         state.courseName = payload.courseName
      },
   },
})

export const insCourseAction = InsCoursesSlice.actions
