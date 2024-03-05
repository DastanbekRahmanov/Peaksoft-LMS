import { createSlice } from '@reduxjs/toolkit'
// eslint-disable-next-line import/no-cycle
import {
   deleteCourse,
   editCourse,
   getCourse,
   postCourses,
   assignCourseinstructor,
   courseStudentsRequest,
   courseTeachersRequest,
   deleteCourseTeachers,
   getAllTeachers,
} from './courses-actions'

const initialState = {
   courses: [],
   status: null,
   error: null,
   teachers: [],
   courseStudent: [],
   courseTeachers: [],
}

export const coursesSlice = createSlice({
   name: 'coursesSlices',
   initialState,
   reducers: {},
   extraReducers: {
      [getCourse.pending]: (state) => {
         state.error = null
         state.status = 'loading'
      },
      [getCourse.fulfilled]: (state, { payload }) => {
         state.status = 'success'
         state.courses = payload
      },
      [getCourse.rejected]: (state, { payload }) => {
         state.status = null
         state.error = payload
      },
      [postCourses.pending]: (state) => {
         state.status = 'loading'
      },
      [postCourses.fulfilled]: (state) => {
         state.status = 'created'
      },
      [postCourses.rejected]: (state) => {
         state.status = 'rejected'
         state.error = 'Не удалось создать курс, проверьте заполнение'
      },
      // * deleting course
      [deleteCourse.fulfilled]: (state) => {
         state.status = 'deleted'
      },
      [editCourse.fulfilled]: (state) => {
         state.status = 'edited'
      },
      [editCourse.rejected]: (state) => {
         state.error = 'Не удалось провести редактирование'
      },

      [getAllTeachers.fulfilled]: (state, { payload }) => {
         state.status = 'success'
         state.teachers = payload
      },
      [getAllTeachers.rejected]: (state) => {
         state.status = 'rejected'
         state.error = 'Произошла ошибка, не удалось загрузить учителя'
      },

      [assignCourseinstructor.fulfilled]: (state) => {
         state.status = 'assigned'
      },
      [assignCourseinstructor.rejected]: (state, actions) => {
         state.error = actions.payload
      },
      [courseStudentsRequest.pending]: (state) => {
         state.status = 'loading'
      },
      [courseStudentsRequest.fulfilled]: (state, { payload }) => {
         state.courseStudent = payload
         state.status = 'succes'
      },
      [courseStudentsRequest.rejected]: (state) => {
         state.status = 'rejected'
         state.error = 'Произошла ошибка, не удалось загрузить данные'
      },
      [courseTeachersRequest.pending]: (state) => {
         state.status = 'loading'
      },
      [courseTeachersRequest.fulfilled]: (state, { payload }) => {
         state.status = 'succes'
         state.courseTeachers = payload
      },
      [courseTeachersRequest.rejected]: (state) => {
         state.status = 'rejected'
         state.error = 'Произошла ошибка, не удалось загрузить данные'
      },

      [deleteCourseTeachers.fulfilled]: (state) => {
         state.status = 'deleted'
      },
      [deleteCourseTeachers.rejected]: (state) => {
         state.status = 'rejected'
         state.error = 'Произошла ошибка,не удалось удалить учителя'
      },
   },
})

export const courseActions = coursesSlice.actions
