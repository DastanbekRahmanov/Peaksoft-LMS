import { Button, styled as style } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import ModalWindow from './ModalWindow'
import { ROUTES } from '../../utils/constants/constants'

export const LogOutModal = ({ open, onClose }) => {
   const navigate = useNavigate()

   const logOutHadler = () => {
      navigate(ROUTES.LOGIN)
   }

   return (
      <ModalWindow
         open={open}
         handleClose={() => onClose()}
         headerContent={
            <TitleText>
               <h3>Вы уверены, что хотите выйти?</h3>
            </TitleText>
         }
         footerContent={
            <ButtonBlock>
               <CustomButton onClick={() => onClose()} variant="outlined">
                  Отмена
               </CustomButton>
               <CustomButton
                  onClick={logOutHadler}
                  variant="contained"
                  color="error"
               >
                  Выйти
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
