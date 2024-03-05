/* eslint-disable import/no-cycle */
import { createSlice } from '@reduxjs/toolkit'
import {
   addTeacher,
   deleteTeacher,
   editTeacher,
   getAllTeacher,
   getTeacherById,
   renameTeacher,
} from './teacherActions'

const initialState = {
   teachers: [],
   getTeacher: [],
   rename: [],
   updateTeacher: [],
   status: null,
   error: null,
}
export const teacherAdminSlice = createSlice({
   name: 'teacherAdmin',
   initialState,
   reducers: {},
   extraReducers: {
      [addTeacher.pending]: (state) => {
         state.status = 'loading'
      },
      [addTeacher.fulfilled]: (state, { payload }) => {
         state.status = 'created'
         state.teachers = payload
      },
      [addTeacher.rejected]: (state, { payload }) => {
         state.status = 'rejected'
         state.error = payload
      },
      [getAllTeacher.pending]: (state) => {
         state.status = 'loading'
      },
      [getAllTeacher.fulfilled]: (state, action) => {
         state.status = 'success'
         state.getTeacher = action.payload
      },
      [getAllTeacher.rejected]: (state) => {
         state.status = 'rejected'
         state.error = 'Произошла ошибка, не удалось загрузить учителя'
      },
      [deleteTeacher.pending]: (state) => {
         state.status = 'loading'
      },
      [deleteTeacher.fulfilled]: (state) => {
         state.status = 'deleted'
      },
      [deleteTeacher.rejected]: (state) => {
         state.status = 'rejected'
         state.error = 'Произошла ошибка,не удалось удалить учителя'
      },
      [renameTeacher.pending]: (state) => {
         state.status = 'loading'
      },
      [renameTeacher.fulfilled]: (state, action) => {
         state.status = 'success'
         state.rename = action.payload
      },
      [renameTeacher.rejected]: (state, { payload }) => {
         state.status = 'error'
         state.error = payload
      },
      [editTeacher.pending]: (state) => {
         state.status = 'loading'
      },
      [editTeacher.fulfilled]: (state, action) => {
         state.status = 'edited'
         state.updateTeacher = action.payload
      },
      [editTeacher.rejected]: (state) => {
         state.status = 'error'
         state.error = 'Не удалось провести редактирование'
      },
      [getTeacherById.pending]: (state) => {
         state.status = 'loading'
      },
      [getTeacherById.fulfilled]: (state, action) => {
         state.status = 'success'
         state.updateTeacher = action.payload
      },
      [getTeacherById.rejected]: (state) => {
         state.status = 'rejected'
         state.error = 'Произошла ошибка, не удалось загрузить данные'
      },
   },
})

export const userAction = teacherAdminSlice.actions
