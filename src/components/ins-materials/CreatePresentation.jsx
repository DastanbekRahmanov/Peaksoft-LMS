import React, { useRef, useState } from 'react'
import { Button, styled as style } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import ModalWindow from '../UI/ModalWindow'
import UiInput from '../UI/UiInput'
import UIButton from '../UI/UIButton'
import { createPresentation } from '../../store/slices/instructor-slices/materials/materials-actions'
import PopUp from '../UI/PopUp'

export const CreatePresentationModal = ({ open, onClose }) => {
   const [validateError, setValidateError] = useState(false)

   const [presentationData, setPresentationData] = useState({
      presentationName: '',
      description: '',
      uploadFile: [],
   })
   const [params] = useSearchParams()
   const { courseId, idLesson } = Object.fromEntries(params)
   const filePicker = useRef(null)

   const handlePick = () => {
      filePicker.current.click()
   }
   const handleChange = (event) => {
      setPresentationData({
         ...presentationData,
         uploadFile: event.target.files[0],
      })
   }
   const dispatch = useDispatch()

   const submitHandler = () => {
      const isFormNotFilled = Object.values({
         ...presentationData,
      }).some((value) => !value)

      if (isFormNotFilled) return setValidateError(true)

      const sendingData = {
         ...presentationData,
         lessonId: idLesson,
         courseId,
      }
      return dispatch(createPresentation({ presentationData: sendingData }))
         .unwrap()
         .then(() => onClose())
   }

   return (
      <>
         <ModalWindow
            open={open}
            handleClose={() => onClose()}
            modalTitle="Добавить презентацию"
            bodyContent={
               <InputBlock>
                  {validateError && (
                     <ErrorMessage>
                        Все поля обязательны к заполнению
                     </ErrorMessage>
                  )}
                  <UiInput
                     placeholder="Введите название презентации"
                     width="491px"
                     onChange={(e) =>
                        setPresentationData({
                           ...presentationData,
                           presentationName: e.target.value,
                        })
                     }
                  />
                  <UiInput
                     placeholder="Введите описание презентации"
                     width="491px"
                     onChange={(e) =>
                        setPresentationData({
                           ...presentationData,
                           description: e.target.value,
                        })
                     }
                  />
                  <FileUploadBlock>
                     <UiInput
                        placeholder="Выберите файл в формате ppt"
                        isDisabled
                        type="text"
                        onChange={(e) =>
                           setPresentationData({
                              ...presentationData,
                              uploadFile: e.target.value,
                           })
                        }
                        value={presentationData.uploadFile.name || ''}
                     />
                     <input
                        type="file"
                        className="hidden"
                        accept=".xlsx,.xls,.doc, .docx, .ppt, .pptx,.pdf"
                        ref={filePicker}
                        onChange={handleChange}
                     />
                     <UIButton
                        onClick={handlePick}
                        variant="outlined"
                        borderradius="8px"
                        background="rgba(26, 35, 126, 0.07)"
                     >
                        Обзор...
                     </UIButton>
                  </FileUploadBlock>
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
         {validateError && (
            <PopUp messageType="error" message="Произошла ошибка" />
         )}
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

const FileUploadBlock = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   .MuiInputBase-root {
      width: 369px;
   }
   button {
      width: 110px;
      height: 42px;
      margin: 12px 0 0 12px;
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
