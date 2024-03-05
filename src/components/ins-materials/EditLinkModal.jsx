import React, { useEffect, useState } from 'react'
import { Button, styled as style } from '@mui/material'
import { useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import ModalWindow from '../UI/ModalWindow'
import UiInput from '../UI/UiInput'
import {
   editLink,
   getLinkById,
} from '../../store/slices/instructor-slices/materials/materials-actions'
import PopUp from '../UI/PopUp'

export const EditLinkModal = ({ open, onClose }) => {
   const [validateError, setValidateError] = useState(false)

   const [linkValueData, setLinkValueData] = useState({
      linkText: '',
      link: '',
   })

   const [params] = useSearchParams()
   const { linkId, lessonId } = Object.fromEntries(params)
   const { error } = useSelector((state) => state.materials)
   const { id } = useParams()

   const dispatch = useDispatch()

   const submitHandler = () => {
      const isFormNotFilled = Object.values({
         ...linkValueData,
         lessonId,
      }).some((value) => !value)

      if (isFormNotFilled) return setValidateError(true)

      const sendingData = {
         ...linkValueData,
         lessonId,
      }
      return dispatch(
         editLink({ linkValueData: sendingData, linkId, courseId: id })
      )
         .unwrap()
         .then(() => onClose())
   }

   useEffect(() => {
      dispatch(getLinkById(linkId))
         .unwrap()
         .then((result) =>
            setLinkValueData({
               ...linkValueData,
               linkText: result.linkText,
               link: result.link,
            })
         )
   }, [])

   return (
      <>
         {error && <PopUp message={error} messageType="error" />}
         {validateError && (
            <PopUp messageType="error" message="Произошла ошибка" />
         )}

         <ModalWindow
            open={open}
            handleClose={() => onClose()}
            modalTitle="Редактировать ссылку"
            bodyContent={
               <InputBlock>
                  {validateError && (
                     <ErrorMessage>
                        Все поля обязательны к заполнению
                     </ErrorMessage>
                  )}
                  <UiInput
                     placeholder="Введите название видеоурока"
                     value={linkValueData.linkText || ''}
                     width="491px"
                     onChange={(e) =>
                        setLinkValueData({
                           ...linkValueData,
                           linkText: e.target.value,
                        })
                     }
                  />
                  <UiInput
                     placeholder="Введите описание видеоурока"
                     value={linkValueData.link || ''}
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
                     Редактировать
                  </CustomButton>
               </ButtonBlock>
            }
         />
      </>
   )
}
const CustomButton = style(Button)`
   width: 178px;
   text-transform: capitalize;
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
