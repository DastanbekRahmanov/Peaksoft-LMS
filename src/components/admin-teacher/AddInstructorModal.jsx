import styled from 'styled-components'
import { useForm, Controller, useFormState } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { addTeacher } from '../../store/slices/admin-slices/teacher-slices/teacherActions'
import UIButton from '../UI/UIButton'
import UiInput from '../UI/UiInput'
import ModalWindow from '../UI/ModalWindow'
import {
   PATTERN_FOR_EMAIL,
   POLE_ZAPOLNEN,
} from '../../utils/constants/constants'

const AddInstructorModal = ({ open, handleClose }) => {
   const dispatch = useDispatch()
   const { control, handleSubmit, reset } = useForm({
      mode: 'onblur',
      defaultValues: {
         firstName: '',
         lastName: '',
         phoneNumber: '',
         email: '',
         password: '',
         specialization: '',
      },
   })

   const { errors } = useFormState({
      control,
   })
   const onSubmit = (data) => {
      dispatch(addTeacher({ data }))
      handleClose()
      reset()
   }

   return (
      <ModalWindow
         open={open}
         handleClose={handleClose}
         modalTitle="Добавление учителя"
         bodyContent={
            <DivContainer onSubmit={handleSubmit(onSubmit)}>
               <Controller
                  control={control}
                  name="firstName"
                  rules={{
                     required: POLE_ZAPOLNEN,
                     minLength: {
                        value: 3,
                        message: 'Минимум 3 символов и не должень быть число',
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
                        value: 3,
                        message: 'Минимум 3 символов и не должень быть число',
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
                        message: 'Минимум 6 символов',
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
                        message:
                           'Минимум 6 символов и должен содержать хотя бы одно число ',
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
               <Controller
                  control={control}
                  name="specialization"
                  rules={{
                     required: POLE_ZAPOLNEN,
                     minLength: {
                        value: 3,
                        message: 'Минимум 3 символов',
                     },
                  }}
                  render={({ field }) => (
                     <UiInput
                        margintop="12px"
                        placeholder="Специализация"
                        onChange={(e) => field.onChange(e)}
                        value={field.value}
                        type="text"
                        error={!!errors.specialization?.message}
                     />
                  )}
               />
               {errors?.specialization && (
                  <ErrorMessage>
                     {errors?.specialization?.message || 'Error'}
                  </ErrorMessage>
               )}
               <DivBtn>
                  <ButtonCloseTeacher onClick={handleClose} variant="outlined">
                     Отмена
                  </ButtonCloseTeacher>
                  <ButtonAddTeacher
                     marginleft="10px"
                     type="submit"
                     variant="contained"
                     background="#3772FF"
                  >
                     Создать
                  </ButtonAddTeacher>
               </DivBtn>
            </DivContainer>
         }
      />
   )
}
export default AddInstructorModal
const DivContainer = styled.form`
   width: 100%;
   margin-bottom: 20px;
   & .MuiInputBase-input {
      width: 491px;
      height: 42px;
   }
`
const DivBtn = styled.div`
   margin-bottom: 15px;
   width: 491px;
   display: flex;
   justify-content: end;
   margin-left: 35px;
   margin-top: 20px;
`
const ButtonAddTeacher = styled(UIButton)`
   width: 117px;
   &.cojpMK.MuiButtonBase-root {
      margin-left: 10px;
   }
`
const ButtonCloseTeacher = styled(UIButton)`
   width: 117px;
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
