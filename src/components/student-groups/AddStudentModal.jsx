import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useForm, Controller, useFormState } from 'react-hook-form'
import { useState, useEffect } from 'react'
import UIButton from '../UI/UIButton'
import UiInput from '../UI/UiInput'
import ModalWindow from '../UI/ModalWindow'
import { getGroups } from '../../store/slices/admin-slices/group-slices/group-actions'
import {
   LEARNING_FORMAT,
   PATTERN_FOR_EMAIL,
   POLE_ZAPOLNEN,
} from '../../utils/constants/constants'
import GroupsSelect from '../UI/StudentsSelects/GroupsSelect'
import StudyFormatSelect from '../UI/StudentsSelects/StudyFormatSelect'
import { addStudents } from '../../store/slices/admin-slices/admin-student/student-actions'

const AddStudentModal = ({ open, handleClose }) => {
   const dispatch = useDispatch()
   const { groups } = useSelector((state) => state.groups)

   const { control, handleSubmit, reset } = useForm({
      mode: 'onblur',
      defaultValues: {
         firstName: '',
         lastName: '',
         phoneNumber: '',
         email: '',
         password: '',
         studyFormat: '',
      },
   })

   const [value, setValue] = useState({
      groupId: '',
      studyFormat: '',
   })

   const getOptionValue = (id) => {
      setValue({ ...value, groupId: id })
   }

   const getValueGroupsSelect = (grName) => {
      setValue({ ...value, groupId: grName })
   }

   const getValueFormatsSelect = (format) => {
      setValue({ ...value, studyFormat: format })
   }

   const { errors } = useFormState({
      control,
   })

   useEffect(() => {
      dispatch(getGroups())
   }, [])

   const onSubmit = ({ email, firstName, lastName, phoneNumber, password }) => {
      dispatch(
         addStudents({
            firstName,
            lastName,
            groupId: value.groupId,
            studyFormat: value.studyFormat,
            phoneNumber,
            email,
            password,
         })
      )
      handleClose()
      reset()
   }

   return (
      <ModalWindow
         open={open}
         handleClose={handleClose}
         modalTitle="Добавить студента"
         bodyContent={
            <DivContainer onSubmit={handleSubmit(onSubmit)}>
               <Controller
                  control={control}
                  name="firstName"
                  rules={{
                     required: POLE_ZAPOLNEN,
                     minLength: {
                        value: 3,
                        message: 'Введите не менее 3 символов',
                     },
                  }}
                  render={({ field }) => (
                     <UiInput
                        margintop="16px"
                        placeholder="Имя"
                        onChange={(e) => field.onChange(e)}
                        value={field.value}
                        type="text"
                        error={!!errors.firstName?.message}
                     />
                  )}
               />
               {errors?.firstName && (
                  <ErrorMessage>
                     {errors?.firstName?.message || 'Error'}
                  </ErrorMessage>
               )}
               <Controller
                  control={control}
                  name="lastName"
                  rules={{
                     required: POLE_ZAPOLNEN,
                     minLength: {
                        value: 4,
                        message: 'Введите не менее 4 символов',
                     },
                  }}
                  render={({ field }) => (
                     <UiInput
                        margintop="12px"
                        placeholder="Фамилия"
                        onChange={(e) => field.onChange(e)}
                        value={field.value}
                        type="text"
                        error={!!errors.lastName?.message}
                     />
                  )}
               />
               {errors?.lastName && (
                  <ErrorMessage>
                     {errors?.lastName?.message || 'Error'}
                  </ErrorMessage>
               )}
               <Controller
                  control={control}
                  name="phoneNumber"
                  rules={{
                     required: POLE_ZAPOLNEN,
                     maxLength: {
                        value: 12,
                        message: 'Введите не более 12 символовн',
                     },
                  }}
                  render={({ field }) => (
                     <UiInput
                        margintop="12px"
                        placeholder="+996 ___ __ __ __"
                        onChange={(e) => field.onChange(e)}
                        value={field.value}
                        type="number"
                        error={!!errors.phoneNumber?.message}
                     />
                  )}
               />
               {errors?.phoneNumber && (
                  <ErrorMessage>
                     {errors?.phoneNumber?.message || 'Error'}
                  </ErrorMessage>
               )}
               <Controller
                  control={control}
                  name="email"
                  rules={{
                     required: POLE_ZAPOLNEN,
                     pattern: {
                        value: PATTERN_FOR_EMAIL,
                        message: 'Адрес электронной почты введен не верно',
                     },
                     minLength: {
                        value: 6,
                        message: 'Введите более 6 символов',
                     },
                  }}
                  render={({ field }) => (
                     <UiInput
                        margintop="12px"
                        placeholder="Email"
                        onChange={(e) => field.onChange(e)}
                        value={field.value}
                        type="email"
                        error={!!errors.email?.message}
                     />
                  )}
               />
               {errors?.email && (
                  <ErrorMessage>
                     {errors?.email?.message || 'Error'}
                  </ErrorMessage>
               )}
               <Controller
                  control={control}
                  name="password"
                  rules={{
                     required: POLE_ZAPOLNEN,
                     minLength: {
                        value: 6,
                        message: 'Введите не менее 6 символов',
                     },
                  }}
                  render={({ field }) => (
                     <UiInput
                        margintop="12px"
                        placeholder="Пароль"
                        onChange={(e) => field.onChange(e)}
                        value={field.value}
                        type="password"
                        error={!!errors.password?.message}
                     />
                  )}
               />
               {errors?.password && (
                  <ErrorMessage>{errors?.password?.message}</ErrorMessage>
               )}
               <GroupsSelect
                  valueGroupSelect={value.groupId}
                  setValueGroupSelect={getValueGroupsSelect}
                  options={groups}
                  getOptionValue={getOptionValue}
               />
               <StudyFormatSelect
                  valueFormats={value.studyFormat}
                  setValueFormats={getValueFormatsSelect}
                  formats={LEARNING_FORMAT}
               />
               <ContaiberButton>
                  <UIButton
                     onClick={handleClose}
                     variant="outlined"
                     width="103px"
                     borderradius="8px"
                  >
                     Отмена
                  </UIButton>
                  <UIButton
                     type="submit"
                     variant="contained"
                     background="#3772FF"
                     width="117px"
                     borderradius="8px"
                  >
                     Добавить
                  </UIButton>
               </ContaiberButton>
            </DivContainer>
         }
      />
   )
}
export default AddStudentModal

const DivContainer = styled.form`
   margin-bottom: 20px;
   .MuiOutlinedInput-root {
      width: 491px;
      height: 42px;
      padding-top: 2px;
   }
   :first-child {
      margin-top: 16px;
   }
   div {
      padding-top: 12px;
   }
   .MuiSelect-select {
      width: 491px;
      height: 42px;
      div {
         display: flex;
         justify-content: flex-start;
         margin-bottom: 5px;
      }
   }
`
const ContaiberButton = styled.div`
   margin-bottom: 15px;
   margin-left: 35px;
   margin-top: 8px;
   width: 491px;
   gap: 10px;
   display: flex;
   justify-content: end;
`
const ErrorMessage = styled.p`
   color: red;
   font-family: 'Open Sans';
   font-style: normal;
   font-weight: 400;
   margin-top: 5px;
   font-size: 13px;
   line-height: 16px;
`
