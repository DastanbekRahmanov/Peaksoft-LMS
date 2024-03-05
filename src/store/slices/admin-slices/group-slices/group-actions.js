/* eslint-disable import/no-cycle */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { format } from 'date-fns'
import axiosInstance from '../../../../api/axiosConfig'
import fileUpload from '../../../../api/axiosFileUpload'

export const getGroups = createAsyncThunk(
   'admin-groups/get',
   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get('group')
         const { data } = response
         return data
      } catch (err) {
         return rejectWithValue(err.response.data.message)
      }
   }
)
export const getGroupsById = createAsyncThunk(
   'admin-groups/getById',
   async (id, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`group/${id}`)
         const { data } = response
         return data
      } catch (err) {
         return rejectWithValue(err.response.data.message)
      }
   }
)

export const getGroupStudentById = createAsyncThunk(
   'admin-groups/getStudentById',
   async (id, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`group/students/${id}`)
         const { data } = response
         return data
      } catch (err) {
         return rejectWithValue(err.response.data.message)
      }
   }
)

export const postGroups = createAsyncThunk(
   'admin-groups/post',
   async (newGroup, { rejectWithValue, dispatch }) => {
      try {
         const values = { ...newGroup }
         values.dateOfStart = format(
            new Date(newGroup.dateOfStart),
            'yyyy-MM-dd'
         )

         const formData = new FormData()
         formData.append('file', values.image)
         const response = await fileUpload.post('file', formData)

         const resp = await axiosInstance.post('group', {
            ...newGroup,
            image: response.data.link,
         })
         const { data } = resp

         return dispatch(getGroups(data))
      } catch (err) {
         return rejectWithValue(err.response.data.message)
      }
   }
)

export const deleteGroups = createAsyncThunk(
   'admin-groups/delete',
   async (id, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosInstance.delete(`group/${id}`)
         const { data } = response
         return dispatch(getGroups(data))
      } catch (err) {
         return rejectWithValue(err.response.data.message)
      }
   }
)

export const editGroups = createAsyncThunk(
   'admin-groups/edit',
   async (newGroup, { rejectWithValue, dispatch }) => {
      const dateGroup = format(
         new Date(newGroup.body.dateOfStart),
         'yyyy-MM-dd'
      )
      try {
         const responseGroup = {}
         if (typeof newGroup.body.image === 'object') {
            const formData = new FormData()
            formData.set('file', newGroup.body.image)
            const response = await fileUpload.post('file', formData)
            responseGroup.link = response.data.link
         } else {
            responseGroup.link = newGroup.body.image
         }

         const response = await axiosInstance.put(`group/${newGroup.id}`, {
            groupName: newGroup.body.groupName,
            description: newGroup.body.description,
            dateOfStart: dateGroup,
            image: responseGroup.link,
         })
         return dispatch(getGroups(response))
      } catch (err) {
         return rejectWithValue(err.response.data.message)
      }
   }
)
