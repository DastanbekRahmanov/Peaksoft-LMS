import React from 'react'
import styled from 'styled-components'
import { useForm, Controller, useFormState } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { unwrapResult } from '@reduxjs/toolkit'
import UIButton from '../UI/UIButton'
import UiInput from '../UI/UiInput'
import ModalWindow from '../UI/ModalWindow'
import { forgotPassword } from '../../api/loginServices/forgotPasswordService'

export const ForgotPasswordModal = ({ open, handleClose }) => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { control, handleSubmit, reset, setError } = useForm({
      mode: 'onblur',
      defaultValues: {
         email: '',
         link: 'http://localhost:3000/forgot-password',
      },
   })
   const { errors } = useFormState({
      control,
   })
   const onSubmit = (data) => {
      // console.log(data)
      dispatch(forgotPassword({ data, navigate, setError }))
         .then(unwrapResult)
         .then(() => {
            reset()
         })
   }
   return (
      <ModalWindow
         open={open}
         handleClose={handleClose}
         modalTitle="Забыли пароль?"
         headerContent={
            <LabelModal>
               Вам будет отправлена ссылка для сброса пароля
            </LabelModal>
         }
         bodyContent={
            <DivContainer>
               <Controller
                  control={control}
                  name="email"
                  rules={{
                     required: 'Поле обязательно к заполнению',
                     pattern: {
                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Адрес электронной почты введен не верно',
                     },
                     minLength: {
                        value: 6,
                        message: 'Минимум 6 и символов',
                     },
                  }}
                  render={({ field }) => (
                     <UiInput
                        onChange={(e) => field.onChange(e)}
                        onBlur={(e) => field.onBlur(e)}
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
            </DivContainer>
         }
         footerContent={
            <DivBtn>
               <ButtonPass
                  onClick={handleSubmit(onSubmit)}
                  variant="contained"
                  background="#3772FF"
               >
                  Создать
               </ButtonPass>
            </DivBtn>
         }
      />
   )
}

const DivContainer = styled.div`
   width: 100%;
   margin-bottom: 20px;
   & .MuiInputBase-input {
      width: 491px;
      height: 42px;
   }
`
const DivBtn = styled.div`
   margin-bottom: 25px;
`
const LabelModal = styled.div`
   text-align: left;
   font-style: normal;
   font-weight: 400;
   font-size: 14px;
   line-height: 16px;
   margin: 16px 12px;
   color: #87898e;
`
const ButtonPass = styled(UIButton)`
   width: 483px;
   height: 42px;
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
