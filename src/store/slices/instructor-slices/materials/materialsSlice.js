/* eslint-disable import/no-cycle */
import { createSlice } from '@reduxjs/toolkit'
import { setError, setLoading } from '../../../../utils/helpers/helper'
import {
   createNewLessons,
   createPresentation,
   deleteLesson,
   deleteLessonLink,
   deletePresentation,
   deleteVideoLesson,
   editLink,
   editPresentation,
   editVideo,
   getCoursesLessons,
   postLink,
   postVideo,
} from './materials-actions'

const initialState = {
   lessons: [],
   status: null,
   error: null,
}

export const insMaterials = createSlice({
   name: 'instructor-courses',
   initialState,
   reducers: {},
   extraReducers: {
      // * get all lessons
      [getCoursesLessons.pending]: setLoading,
      [getCoursesLessons.fulfilled]: (state, { payload }) => {
         state.status = null
         state.lessons = payload
      },
      [getCoursesLessons.rejected]: setError,

      // * deleting lesson
      [deleteLesson.pending]: setLoading,
      [deleteLesson.fulfilled]: (state) => {
         state.status = 'deleted'
      },
      [deleteLesson.rejected]: setError,

      // * creating new lesson
      [createNewLessons.fulfilled]: (state) => {
         state.status = 'created'
      },
      [createNewLessons.rejected]: setError,

      // * adding presentation to lesson
      [createPresentation.fulfilled]: (state) => {
         state.status = 'uploaded'
      },
      [createPresentation.rejected]: setError,

      // * editing presentation
      [editPresentation.fulfilled]: (state) => {
         state.status = 'edited'
      },
      [editPresentation.rejected]: setError,

      // * deleting presentation
      [deletePresentation.fulfilled]: (state) => {
         state.status = 'deleted'
      },
      [deletePresentation.rejected]: setError,

      // * adding a video link
      [postVideo.fulfilled]: (state) => {
         state.status = 'uploaded'
      },
      [postVideo.fulfilled]: setError,

      // * editing video lesson
      [editVideo.fulfilled]: (state) => {
         state.status = 'edited'
      },
      [editVideo.rejected]: setError,
      // * deleteing video lesson
      [deleteVideoLesson.fulfilled]: (state) => {
         state.status = 'deleted'
      },
      [deleteVideoLesson.rejected]: setError,
      // * creating lesson link
      [postLink.fulfilled]: (state) => {
         state.status = 'uploaded'
      },
      [postLink.rejected]: setError,
      // * delete lesson link
      [deleteLessonLink.fulfilled]: (state) => {
         state.status = 'deleted'
      },
      [deleteLessonLink.rejected]: setError,
      // * edit lesson link
      [editLink.fulfilled]: (state) => {
         state.status = 'edited'
      },
      [editLink.rejected]: setError,
   },
})

export const insMaterialsAction = insMaterials.actions
