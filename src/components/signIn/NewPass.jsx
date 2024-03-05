import React from 'react'
import styled from 'styled-components'
import { useForm, Controller, useFormState } from 'react-hook-form'
import { unwrapResult } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import UiIsPassword from '../UI/UiIsPasswod'
import UIButton from '../UI/UIButton'
import { resetPassword } from '../../api/loginServices/resetPasswordService'

function NewPass() {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { control, handleSubmit, reset } = useForm({
      mode: 'onblur',
      defaultValues: {
         newpass: '',
         renewpass: '',
      },
   })
   const { errors } = useFormState({
      control,
   })
   const onSubmit = (data) => {
      dispatch(resetPassword({ data, navigate }))
         .then(unwrapResult)
         .then(() => {
            reset()
         })
   }
   return (
      <Wrapper onSubmit={handleSubmit(onSubmit)}>
         <PeaksoftParagraph>Создать пароль</PeaksoftParagraph>
         <WrapperLogin>
            <LabelLogin style={{ color: errors.newpass && 'red' }}>
               Новый пароль:
               <Controller
                  control={control}
                  name="newpass"
                  rules={{
                     required: 'Поле обязательно к заполнению',
                     minLength: { value: 6, message: 'Минимум 6 символов' },
                  }}
                  render={({ field }) => (
                     <UiIsPassword
                        onChange={(e) => field.onChange(e)}
                        onBlur={(e) => field.onBlur(e)}
                        value={field.value}
                        placeholder="Введите новый пароль"
                        error={!!errors.newpass?.message}
                     />
                  )}
               />
               {errors?.newpass && (
                  <ErrorMessage>
                     {errors?.newpass?.message || 'Error'}
                  </ErrorMessage>
               )}
            </LabelLogin>
            <LabelPassword style={{ color: errors.renewpass && 'red' }}>
               Подтверждение:
               <Controller
                  control={control}
                  name="renewpass"
                  rules={{
                     required: 'Поле обязательно к заполнению',
                     minLength: { value: 6, message: 'Минимум 6 символов' },
                  }}
                  render={({ field }) => (
                     <UiIsPassword
                        onChange={(e) => field.onChange(e)}
                        onBlur={(e) => field.onBlur(e)}
                        value={field.value}
                        placeholder="Подтвердите  пароль"
                        error={!!errors.renewpass?.message}
                     />
                  )}
               />
               {errors?.renewpass && (
                  <ErrorMessage>
                     {errors?.renewpass?.message || 'Error'}
                  </ErrorMessage>
               )}
            </LabelPassword>
         </WrapperLogin>
         <NewPassBtn type="submit" variant="contained" background="#3772ff">
            Создать
         </NewPassBtn>
      </Wrapper>
   )
}

export default NewPass

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
   display: flex;
   align-items: center;
   justify-content: center;
`
const WrapperLogin = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   width: 440px;
   margin-bottom: 53px;
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
   div {
      margin-top: 9px;
      margin-bottom: 9px;
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
      margin-top: 9px;
   }
`
const NewPassBtn = styled(UIButton)`
   width: 214px;
   height: 51px;
   border-radius: 8px;
`
const ErrorMessage = styled.p`
   color: red;
   font-family: 'Open Sans';
   font-style: normal;
   font-weight: 400;
   margin-top: 3px;
   margin-bottom: 5px;
   font-size: 13px;
   line-height: 16px;
   margin-bottom: 3px;
`
