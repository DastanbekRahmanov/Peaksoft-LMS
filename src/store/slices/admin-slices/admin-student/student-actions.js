/* eslint-disable import/no-cycle */
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../../api/axiosConfig'
import fileUpload from '../../../../api/axiosFileUpload'

export const getAllStudents = createAsyncThunk(
   'admin-students/get',
   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            'student/filter?studyFormat=ALL'
         )
         const { data } = response
         return data
      } catch (err) {
         return rejectWithValue(err.response.data.message)
      }
   }
)

export const getFilteredlStudents = createAsyncThunk(
   'admin-students/get-filter',
   async (groupFormat, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `student/filter?studyFormat=${groupFormat}`
         )
         const { data } = response

         return data
      } catch (err) {
         return rejectWithValue(err.message)
      }
   }
)

export const addStudents = createAsyncThunk(
   'student/addStudents',
   async (data, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosInstance.post('student', data)
         const result = response.data
         dispatch(getAllStudents())
         return result
      } catch (err) {
         return rejectWithValue(err.message)
      }
   }
)

export const deleteStudent = createAsyncThunk(
   'student/deleteStudent',
   async (id, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosInstance.delete(`student/${id}`)
         const { data } = response
         return dispatch(getAllStudents(data))
      } catch (err) {
         return rejectWithValue(err.message)
      }
   }
)

export const editStudents = createAsyncThunk(
   'student/editStudent',
   async (data, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosInstance.put(
            `student/${data.id}`,
            data.body
         )
         return dispatch(getAllStudents(response.data))
      } catch (err) {
         return rejectWithValue(err.response.data.message)
      }
   }
)

export const getStudentById = createAsyncThunk(
   'student/getStudentById',
   async (id, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`student/${id}`)
         const { data } = response
         return data
      } catch (err) {
         return rejectWithValue(err.response.data.message)
      }
   }
)

export const postImportExcel = createAsyncThunk(
   'student/postImportExcel',
   async ({ groupId, uploadFile }, { rejectWithValue }) => {
      try {
         const formData = new FormData()
         formData.append('file', uploadFile)
         const resp = await fileUpload.post(
            `student/import/${groupId}`,
            formData
         )

         const { data } = resp
         return data
      } catch (err) {
         return rejectWithValue(err.response.data.message)
      }
   }
)
