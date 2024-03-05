import React, { useState } from 'react'
import { Button, styled as style } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import ModalWindow from '../UI/ModalWindow'
import UiInput from '../UI/UiInput'
import { postLink } from '../../store/slices/instructor-slices/materials/materials-actions'
import PopUp from '../UI/PopUp'

export const CreateLinkModal = ({ open, onClose }) => {
   const [linkValueData, setLinkValueData] = useState({
      linkText: '',
      link: '',
   })
   const [params] = useSearchParams()
   const { courseId, idLesson } = Object.fromEntries(params)
   const { error } = useSelector((state) => state.materials)
   const [validateError, setValidateError] = useState(false)

   const dispatch = useDispatch()

   const submitHandler = (e) => {
      e.preventDefault()
      const isFormNotFilled = Object.values({
         ...linkValueData,
         lessonId: idLesson,
      }).some((value) => !value)

      if (isFormNotFilled) return setValidateError(true)

      const sendingData = {
         ...linkValueData,
         lessonId: idLesson,
      }
      return dispatch(postLink({ linkValueData: sendingData, courseId }))
         .unwrap()
         .then(() => onClose())
   }

   return (
      <>
         {error && <PopUp message={error} messageType="error" />}
         {validateError && (
            <PopUp messageType="error" message="Произошла ошибка" />
         )}

         <ModalWindow
            open={open}
            handleClose={() => onClose()}
            modalTitle="Добавить ссылку"
            bodyContent={
               <InputBlock>
                  {validateError && (
                     <ErrorMessage>
                        Все поля обязательны к заполнению
                     </ErrorMessage>
                  )}
                  <UiInput
                     placeholder="Отображаемый текст"
                     width="491px"
                     onChange={(e) =>
                        setLinkValueData({
                           ...linkValueData,
                           linkText: e.target.value,
                        })
                     }
                  />
                  <UiInput
                     placeholder="Вставьте ссылку"
                     width="491px"
                     onChange={(e) =>
                        setLinkValueData({
                           ...linkValueData,
                           link: e.target.value,
                        })
                     }
                  />
               </InputBlock>
            }
            footerContent={
               <ButtonBlock>
                  <CustomButton onClick={() => onClose()} variant="outlined">
                     Отмена
                  </CustomButton>
                  <CustomButton onClick={submitHandler} variant="contained">
                     Добавить
                  </CustomButton>
               </ButtonBlock>
            }
         />
      </>
   )
}
const CustomButton = style(Button)`
   width: 108px;
   margin: 10px 10px 18px 0;
   padding: 10px 24px;
   border-radius: 10px;
   font-size: 14px;
   :last-child {
      margin-right: 0;
   }
`

const InputBlock = styled.div`
   margin: 16px 0;

   .MuiInputBase-root {
      margin: 12px 0 0 12px;
   }
`
const ButtonBlock = styled.div`
   display: flex;
   justify-content: end;
   margin-right: 25px;
`
const ErrorMessage = styled.p`
   color: red;
`
