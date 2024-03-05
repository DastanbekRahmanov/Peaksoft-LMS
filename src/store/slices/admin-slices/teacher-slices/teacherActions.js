import { createAsyncThunk } from '@reduxjs/toolkit'
// eslint-disable-next-line import/no-cycle
import axiosInstace from '../../../../api/axiosConfig'

export const getAllTeacher = createAsyncThunk(
   'teacherAdmin/getAllTeacher',
   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosInstace.get('instructor')
         return response.data
      } catch (err) {
         return rejectWithValue(err.response.data.message)
      }
   }
)
export const deleteTeacher = createAsyncThunk(
   'teacherAdmin/deleteTeacher',
   async (id, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosInstace.delete(`instructor/${id}`)
         return dispatch(getAllTeacher(response.data))
      } catch (err) {
         return rejectWithValue(err.response.data.message)
      }
   }
)
export const getTeacherById = createAsyncThunk(
   'teacherAdmin/getTeacherById',
   async (id, { rejectWithValue }) => {
      try {
         const response = await axiosInstace.get(`instructor/${id}`)
         return response.data
      } catch (err) {
         return rejectWithValue(err.response.data.message)
      }
   }
)
export const renameTeacher = createAsyncThunk(
   'teacherAdmin/renameTeacher',
   async (itemId, { rejectWithValue }) => {
      try {
         const response = await axiosInstace.get(`instructor/${itemId}`)
         return response.data
      } catch (err) {
         return rejectWithValue(err.response.data.message)
      }
   }
)

export const addTeacher = createAsyncThunk(
   'addTeacher',
   async ({ data }, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosInstace.post('instructor', data)
         const result = response.data
         return dispatch(getAllTeacher(result))
      } catch (err) {
         return rejectWithValue(err.response.data.message)
      }
   }
)

export const editTeacher = createAsyncThunk(
   'admin-teacher/edit',
   async (data, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosInstace.put(`instructor/${data.itemId}`, {
            fullName: data.body.fullName,
            specialization: data.body.specialization,
            phoneNumber: data.body.phoneNumber,
            email: data.body.email,
         })
         return dispatch(getAllTeacher(response))
      } catch (err) {
         return rejectWithValue(err.response.data.message)
      }
   }
)
