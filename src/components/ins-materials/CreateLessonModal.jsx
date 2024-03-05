import React, { useState } from 'react'
import { Button, styled as style } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import ModalWindow from '../UI/ModalWindow'
import UiInput from '../UI/UiInput'
import { createNewLessons } from '../../store/slices/instructor-slices/materials/materials-actions'

export const CreateLessonModal = ({ open, onClose }) => {
   const [lessonTitle, setLessonTitle] = useState('')
   const dispatch = useDispatch()
   const { id } = useParams()

   const submitHandler = () => {
      dispatch(createNewLessons({ courseId: id, lessonName: lessonTitle }))
      onClose()
   }

   return (
      <ModalWindow
         open={open}
         handleClose={() => onClose()}
         modalTitle="Добавить урок"
         bodyContent={
            <InputBlock>
               <UiInput
                  placeholder="Название урока"
                  width="491px"
                  onChange={(e) => setLessonTitle(e.target.value)}
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
`
const ButtonBlock = styled.div`
   display: flex;
   justify-content: end;
   margin-right: 25px;
`
