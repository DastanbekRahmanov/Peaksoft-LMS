/* eslint-disable import/no-cycle */
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../../api/axiosConfig'
import fileUpload from '../../../../api/axiosFileUpload'

export const getCoursesLessons = createAsyncThunk(
   'instructor-materials/getLessons',
   async (id, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`lesson/course/${id}`)
         const { data } = response
         return data
      } catch (err) {
         return rejectWithValue(err.response.data.message)
      }
   }
)
export const getSingleLesson = createAsyncThunk(
   'instructor-materials/getSingleLesson',
   async (lessonId, { rejectWithValue }) => {
      try {
         return await axiosInstance.get(`lesson/${lessonId}`)
      } catch (err) {
         return rejectWithValue(err.response.data.message)
      }
   }
)

export const deleteLesson = createAsyncThunk(
   'instructor-materials/deleteLesson',
   async ({ lessonId, courseId }, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.delete(`lesson/${lessonId}`)
         return dispatch(getCoursesLessons(courseId))
      } catch (err) {
         return rejectWithValue(err.response.data.message)
      }
   }
)
export const createNewLessons = createAsyncThunk(
   'instructor-materials/createLessons',
   async (incomingData, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.post(`lesson`, incomingData)
         return dispatch(getCoursesLessons(incomingData.courseId))
      } catch (err) {
         return rejectWithValue(err.response.data.message)
      }
   }
)
export const renameLessons = createAsyncThunk(
   'instructor-materials/createLessons',
   async ({ sendedData, lessonId }, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.put(`lesson/${lessonId}`, sendedData)
         return dispatch(getCoursesLessons(sendedData.courseId))
      } catch (err) {
         return rejectWithValue(err.response.data.message)
      }
   }
)

// * presentation CRUD functions

export const createPresentation = createAsyncThunk(
   'instructor-materials/createPresentation',
   async ({ presentationData }, { rejectWithValue, dispatch }) => {
      try {
         const formData = new FormData()
         formData.append('file', presentationData.uploadFile)
         const response = await fileUpload.post('file', formData)

         const sendingData = {
            lessonId: presentationData.lessonId,
            presentationName: presentationData.presentationName,
            description: presentationData.description,
            presentationLink: response.data.link,
         }

         await axiosInstance.post(`presentation`, sendingData)
         return dispatch(getCoursesLessons(presentationData.courseId))
      } catch (err) {
         return rejectWithValue(err.response.data.message)
      }
   }
)

export const editPresentation = createAsyncThunk(
   'instructor-materials/editPresentation',
   async ({ presentationData }, { rejectWithValue, dispatch }) => {
      try {
         const formData = new FormData()
         formData.append('file', presentationData.uploadFile)
         const response = await fileUpload.post('file', formData)

         const sendingData = {
            lessonId: presentationData.lessonId,
            presentationName: presentationData.presentationName,
            description: presentationData.description,
            presentationLink: response.data.link,
         }
         await axiosInstance.put(
            `presentation/${presentationData.presentationId}`,
            sendingData
         )
         return dispatch(getCoursesLessons(presentationData.courseId))
      } catch (err) {
         return rejectWithValue(err.response.data.message)
      }
   }
)
export const getPresentationById = createAsyncThunk(
   'instructor-materials/getPresentation',
   async (id, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`presentation/${id}`)
         const { data } = response
         return data
      } catch (err) {
         return rejectWithValue(err.response.data.message)
      }
   }
)

export const deletePresentation = createAsyncThunk(
   'instructor-materials/deletePresentation',
   async ({ presentationId, courseId }, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.delete(`presentation/${presentationId}`)
         return dispatch(getCoursesLessons(courseId))
      } catch (err) {
         return rejectWithValue(err.response.data.message)
      }
   }
)
// * video CRUD functions

export const postVideo = createAsyncThunk(
   'instructor-materials/postVideo',
   async ({ videoValueData, courseId }, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.post(`video`, videoValueData)
         return dispatch(getCoursesLessons(courseId))
      } catch (err) {
         return rejectWithValue(err.response.data.message)
      }
   }
)
export const editVideo = createAsyncThunk(
   'instructor-materials/editVideo',
   async (
      { videoValueData, videoId, courseId },
      { rejectWithValue, dispatch }
   ) => {
      try {
         await axiosInstance.put(`video/${videoId}`, videoValueData)
         return dispatch(getCoursesLessons(courseId))
      } catch (err) {
         return rejectWithValue(err.response.data.message)
      }
   }
)

export const getVideoById = createAsyncThunk(
   'instructor-materials/getVideo',
   async (id, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`video/${id}`)
         const { data } = response
         return data
      } catch (err) {
         return rejectWithValue(err.response.data.message)
      }
   }
)

export const deleteVideoLesson = createAsyncThunk(
   'instructor-materials/deleteVideoLesson',
   async ({ videoId, courseId }, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.delete(`video/${videoId}`)
         return dispatch(getCoursesLessons(courseId))
      } catch (err) {
         return rejectWithValue(err.response.data.message)
      }
   }
)
// * link CRUD functions

export const postLink = createAsyncThunk(
   'instructor-materials/postLink',
   async ({ linkValueData, courseId }, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.post(`link`, linkValueData)
         return dispatch(getCoursesLessons(courseId))
      } catch (err) {
         return rejectWithValue(err.response.data.message)
      }
   }
)

export const getLinkById = createAsyncThunk(
   'instructor-materials/getLinkById',
   async (id, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`link/${id}`)
         const { data } = response
         return data
      } catch (err) {
         return rejectWithValue(err.response.data.message)
      }
   }
)

export const editLink = createAsyncThunk(
   'instructor-materials/editLink',
   async (
      { linkValueData, linkId, courseId },
      { rejectWithValue, dispatch }
   ) => {
      try {
         await axiosInstance.put(`link/${linkId}`, linkValueData)
         return dispatch(getCoursesLessons(courseId))
      } catch (err) {
         return rejectWithValue(err.response.data.message)
      }
   }
)

export const deleteLessonLink = createAsyncThunk(
   'instructor-materials/deleteLessonLink',
   async ({ linkId, courseId }, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.delete(`link/${linkId}`)
         return dispatch(getCoursesLessons(courseId))
      } catch (err) {
         return rejectWithValue(err.response.data.message)
      }
   }
)
