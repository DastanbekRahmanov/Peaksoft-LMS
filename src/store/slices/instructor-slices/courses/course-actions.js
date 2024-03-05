/* eslint-disable import/no-cycle */
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../../api/axiosConfig'

export const getCourses = createAsyncThunk(
   'instructor-courses/get',
   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get('course')
         const { data } = response
         return data
      } catch (err) {
         return rejectWithValue(err.response.data.message)
      }
   }
)
export const getCoursesById = createAsyncThunk(
   'instructor-courses/getById',
   async (id, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`course/${id}`)
         const { data } = response
         return data
      } catch (err) {
         return rejectWithValue(err.response.data.message)
      }
   }
)
export const getCourseStudentsById = createAsyncThunk(
   'instructor-courses/getCourseStudentsById',
   async (id, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`course/students/${id}`)
         const { data } = response
         return data
      } catch (err) {
         return rejectWithValue(err.response.data.message)
      }
   }
)

export const assignGroups = createAsyncThunk(
   'instructor-courses/assignGroups',
   async (incomingData, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.post('course/assign/group', incomingData)
         return dispatch(getCourseStudentsById(incomingData.courseId))
      } catch (err) {
         return rejectWithValue(err.response.data.message)
      }
   }
)
