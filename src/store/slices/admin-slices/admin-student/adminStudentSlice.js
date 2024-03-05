/* eslint-disable import/no-cycle */
import { createSlice } from '@reduxjs/toolkit'
import {
   addStudents,
   deleteStudent,
   editStudents,
   getAllStudents,
   getFilteredlStudents,
   getStudentById,
   postImportExcel,
} from './student-actions'

const initialState = {
   students: [],
   status: null,
   error: null,
}

export const adminStudentSlice = createSlice({
   name: 'student',
   initialState,
   reducers: {},
   extraReducers: {
      // get all students
      [getAllStudents.pending]: (state) => {
         state.status = 'loading'
      },
      [getAllStudents.fulfilled]: (state, action) => {
         state.students = action.payload
         state.status = 'success'
      },
      [getAllStudents.rejected]: (state, action) => {
         state.status = null
         state.error = action.payload
      },

      // format learning
      [getFilteredlStudents.pending]: (state) => {
         state.status = 'loading'
      },
      [getFilteredlStudents.fulfilled]: (state, action) => {
         state.status = 'success'
         state.students = action.payload
      },
      [getFilteredlStudents.rejected]: (state, action) => {
         state.status = null
         state.error = action.payload
      },

      // post add students
      [addStudents.pending]: (state) => {
         state.status = 'loading'
      },
      [addStudents.fulfilled]: (state) => {
         state.status = 'created'
         state.fulfilled = 'Студент успешно создан'
      },
      [addStudents.rejected]: (state) => {
         state.status = 'mistake'
         state.error = 'Произошла ошибка, не удалось создать студента'
      },

      // delete deleteStudent
      [deleteStudent.pending]: (state) => {
         state.status = 'loading'
      },
      [deleteStudent.fulfilled]: (state) => {
         state.status = 'deleted'
         state.fulfilled = 'Студент удалён'
      },
      [deleteStudent.rejected]: (state) => {
         state.status = 'rejected'
         state.error = 'Произошла ошибка, не удалось удалить студента'
      },

      //  edit editStudent
      [editStudents.pending]: (state) => {
         state.status = 'loading'
      },
      [editStudents.fulfilled]: (state) => {
         state.status = 'edited'
         state.fulfilled = 'Редактирование успешно проведено'
      },
      [editStudents.rejected]: (state) => {
         state.status = 'error'
         state.error = 'Не удалось провести редактирование'
      },

      //  rename editStudent
      [getStudentById.pending]: (state) => {
         state.status = 'loading'
      },
      [getStudentById.fulfilled]: (state) => {
         state.status = 'success'
      },
      [getStudentById.rejected]: (state, { payload }) => {
         state.status = 'error'
         state.error = payload
      },

      // post import excel
      [postImportExcel.pending]: (state) => {
         state.status = 'loading'
      },
      [postImportExcel.fulfilled]: (state) => {
         state.status = 'imported'
         state.fulfilled = 'Excel file успешно импортирован'
      },
      [postImportExcel.rejected]: (state) => {
         state.status = 'error'
         state.error = 'Произошла ошибка, не удалось импортировать Excel'
      },
   },
})

export const groupsAction = adminStudentSlice.actions
