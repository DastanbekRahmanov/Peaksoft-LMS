import { Button, styled as style } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { deletePresentation } from '../../store/slices/instructor-slices/materials/materials-actions'
import ModalWindow from '../UI/ModalWindow'

export const PpesentationDeleteModal = ({ open, onClose }) => {
   const dispatch = useDispatch()
   const [params] = useSearchParams()
   const { presentationId } = Object.fromEntries(params)
   const { id } = useParams()

   const deleteHandler = () => {
      const sendingData = {
         presentationId,
         courseId: id,
      }
      dispatch(deletePresentation(sendingData))
      onClose()
   }

   return (
      <ModalWindow
         open={open}
         handleClose={() => onClose()}
         headerContent={
            <TitleText>
               <h3>Вы точно хотите удалить презентацию?</h3>
            </TitleText>
         }
         footerContent={
            <ButtonBlock>
               <CustomButton onClick={() => onClose()} variant="outlined">
                  Отмена
               </CustomButton>
               <CustomButton
                  onClick={deleteHandler}
                  variant="contained"
                  color="error"
               >
                  Удалить
               </CustomButton>
            </ButtonBlock>
         }
      />
   )
}
const ButtonBlock = styled.div`
   width: 100%;
`
const TitleText = styled.div`
   padding: 35px 0;
`
const CustomButton = style(Button)`
   width: 108px;
   margin-right: 10px;
   margin-bottom: 18px;
   padding: 10px 24px;
   border-radius: 10px;
   font-size: 14px;
   :last-child {
      margin-right: 0;
   }
`
