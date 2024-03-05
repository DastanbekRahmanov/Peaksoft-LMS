import React, { useState } from 'react'
import styled from 'styled-components'
import { useForm, Controller, useFormState } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { unwrapResult } from '@reduxjs/toolkit'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import UiIsPassword from '../UI/UiIsPasswod'
import UIButton from '../UI/UIButton'
import { ForgotPasswordModal } from './ForgotPasswordModal'
import UiInput from '../UI/UiInput'
import { signIn } from '../../api/loginServices/userAuthService'
import {
   PATTERN_FOR_EMAIL,
   POLE_ZAPOLNEN,
} from '../../utils/constants/constants'

function SignIn() {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [open, setOpen] = useState(false)
   const onCloseHandler = () => {
      setOpen(false)
   }
   const { control, handleSubmit, reset, setError } = useForm({
      mode: 'onBlur',
      defaultValues: {
         email: '',
         password: '',
         error: '',
      },
   })
   const { errors } = useFormState({
      control,
   })
   const onSubmit = (data) => {
      dispatch(signIn({ data, navigate, setError }))
         .then(unwrapResult)
         .then(() => {
            reset()
         })
   }

   return (
      <>
         <ToastContainer theme="colored" />
         <Wrapper onSubmit={handleSubmit(onSubmit)}>
            <PeaksoftParagraph>
               Добро пожаловать в<RedLms>PEAKSOFT LMS !</RedLms>
            </PeaksoftParagraph>
            <WrapperLogin>
               <LabelLogin
                  style={{ color: errors.email && 'red' }}
                  htmlFor="email"
               >
                  Логин:
                  <Controller
                     control={control}
                     name="email"
                     rules={{
                        required: POLE_ZAPOLNEN,
                        minLength: { value: 6, message: 'Минимум 6 символов' },
                        pattern: {
                           value: PATTERN_FOR_EMAIL,
                           message: 'Адрес электронной почты введен не верно',
                        },
                     }}
                     render={({ field }) => (
                        <UiInput
                           id="login"
                           onChange={(e) => field.onChange(e)}
                           value={field.value}
                           placeholder="Введите логин"
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
               </LabelLogin>
               <LabelPassword
                  htmlFor="password"
                  style={{ color: errors.password && 'red' }}
               >
                  Пароль:
                  <Controller
                     control={control}
                     name="password"
                     rules={{
                        required: POLE_ZAPOLNEN,
                        minLength: { value: 6, message: 'Минимум 6 символов' },
                     }}
                     render={({ field }) => (
                        <UiIsPassword
                           onChange={(e) => field.onChange(e)}
                           value={field.value}
                           error={!!errors.password?.message}
                           placeholder="Введите пароль "
                           id="password"
                        />
                     )}
                  />
                  {errors?.password && (
                     <ErrorMessage>
                        {errors?.password?.message || 'Error'}
                     </ErrorMessage>
                  )}
               </LabelPassword>
               <ForgotPass>
                  <Paragraph onClick={() => setOpen(true)}>
                     Забыли пароль?
                  </Paragraph>
               </ForgotPass>
            </WrapperLogin>
            <SignInBtn type="submit" variant="contained" background="#3772FF">
               Войти
            </SignInBtn>
         </Wrapper>
         {open && (
            <ForgotPasswordModal handleClose={onCloseHandler} open={open} />
         )}
      </>
   )
}

export default SignIn
const Wrapper = styled.form`
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 720px;
   height: 100%;
`
const PeaksoftParagraph = styled.h1`
   font-family: 'Open Sans';
   font-style: normal;
   font-weight: 600;
   font-size: 24px;
   line-height: 33px;
   width: 262px;
   height: 66px;
   margin-bottom: 54px;
`
const RedLms = styled.span`
   color: red;
   font-family: 'Open Sans';
   font-style: normal;
   font-weight: 600;
   font-size: 24px;
   line-height: 33px;
   margin-left: 6px;
`
const WrapperLogin = styled.div`
   display: flex;
   flex-direction: column;
   width: 440px;
   margin-bottom: 28px;
`
const LabelLogin = styled.label`
   font-family: 'Open Sans';
   font-style: normal;
   font-weight: 400;
   font-size: 16px;
   line-height: 22px;
   color: #6a6a6a;
   display: flex;
   flex-direction: column;
   margin-bottom: 18px;
   div {
      margin-top: 5px;
   }
`
const LabelPassword = styled.label`
   font-family: 'Open Sans';
   font-style: normal;
   font-weight: 400;
   font-size: 16px;
   line-height: 22px;
   color: #6a6a6a;
   display: flex;
   flex-direction: column;
   div {
      margin-top: 5px;
   }
`

const ForgotPass = styled.div`
   width: 100%;
   height: 100%;
   margin-top: 9px;
   display: flex;
   justify-content: end;
`
const Paragraph = styled.p`
   font-family: 'Open Sans';
   font-style: normal;
   font-weight: 400;
   font-size: 16px;
   line-height: 16px;
   color: #3772ff;
   cursor: pointer;
`
const SignInBtn = styled(UIButton)`
   width: 214px;
   height: 51px;
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
