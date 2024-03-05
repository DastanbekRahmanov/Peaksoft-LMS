/* eslint-disable import/no-cycle */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { format } from 'date-fns'
import axiosInstance from '../../../../api/axiosConfig'
import fileUpload from '../../../../api/axiosFileUpload'

export const getCourse = createAsyncThunk(
   'coursesSlices/getCourse',
   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get('course')
         const { data } = response
         return data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const getCourseById = createAsyncThunk(
   'admin-course/getById',
   async (id, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`course/${id}`)
         const { data } = response
         return data
      } catch (err) {
         return rejectWithValue(err.message)
      }
   }
)

export const postCourses = createAsyncThunk(
   'admin-course/post',
   async (newCourse, { rejectWithValue, dispatch }) => {
      try {
         const values = { ...newCourse }
         values.dateOfStart = format(
            new Date(newCourse.dateOfStart),
            'yyyy-MM-dd'
         )

         const formData = new FormData()
         formData.append('file', values.image)
         const response = await fileUpload.post('file', formData)

         const resp = await axiosInstance.post('course', {
            ...newCourse,
            image: response.data.link,
         })
         const { data } = resp

         return dispatch(getCourse(data))
      } catch (err) {
         return rejectWithValue(err.message)
      }
   }
)

export const deleteCourse = createAsyncThunk(
   'admin-course/delete',
   async (id, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosInstance.delete(`course/${id}`)
         const { data } = response
         return dispatch(getCourse(data))
      } catch (err) {
         return rejectWithValue(err.message)
      }
   }
)

export const editCourse = createAsyncThunk(
   'admin-course/edit',
   async (newCourse, { rejectWithValue, dispatch }) => {
      const dateCourse = format(
         new Date(newCourse.body.dateOfStart),
         'yyyy-MM-dd'
      )
      try {
         const responseGroup = {}
         if (typeof newCourse.body.image === 'object') {
            const formData = new FormData()
            formData.set('file', newCourse.body.image)
            const response = await fileUpload.post('file', formData)
            responseGroup.link = response.data.link
         } else {
            responseGroup.link = newCourse.body.image
         }

         const response = await axiosInstance.put(
            `course/update/${newCourse.id}`,
            {
               courseName: newCourse.body.courseName,
               description: newCourse.body.description,
               dateOfStart: dateCourse,
               image: responseGroup.link,
            }
         )
         return dispatch(getCourse(response))
      } catch (err) {
         return rejectWithValue(err.message)
      }
   }
)

export const getAllTeachers = createAsyncThunk(
   'admin-course/getAllTeachers',
   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get('instructor')
         return response.data
      } catch (err) {
         return rejectWithValue(err.data.message)
      }
   }
)

export const assignCourseinstructor = createAsyncThunk(
   'admin-course/assignCourseinstructor',
   async (assignCourse, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.post('course/assign', assignCourse)
         return dispatch(courseTeachersRequest(assignCourse.courseId))
      } catch (err) {
         return rejectWithValue('Инструктор уже назначен на курс')
      }
   }
)

export const courseStudentsRequest = createAsyncThunk(
   'admin-course/courseStudentsRequest',
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

export const courseTeachersRequest = createAsyncThunk(
   'admin-course/courseTeachersRequest',
   async (id, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`course/instructors/${id}`)
         const { data } = response
         return data
      } catch (err) {
         return rejectWithValue(err.response.data.message)
      }
   }
)

export const deleteCourseTeachers = createAsyncThunk(
   'admin-course/deleteCourseTeachers',
   async (date, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.post(`course/unassigned/`, date)
         return dispatch(courseTeachersRequest(date.courseId))
      } catch (err) {
         return rejectWithValue(err.response.data.message)
      }
   }
)
