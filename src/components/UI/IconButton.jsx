import { Button } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { ReactComponent as PlusIcon } from '../../assets/plusIcon.svg'

const IconButton = ({ hover, disabled, clicked, onclick, background }) => {
   return (
      <ButtonIcon
         hover={hover}
         disabled={disabled}
         variant="contained"
         onClick={onclick}
         clicked={clicked}
         background={background}
         startIcon={<PlusIcon />}
      />
   )
}

const ButtonIcon = styled(Button)`
   &.MuiButtonBase-root {
      width: 58px;
      height: 58px;
      margin: auto;
      padding-left: 27.85px;
      border-radius: 50%;
      background-color: ${(props) => props.background};
      border: none;
   }
   &.MuiButtonBase-root:hover {
      background-color: ${(props) => props.hover};
   }
   &.MuiButtonBase-root:focus {
      background-color: ${(props) => props.clicked};
   }
`
export default IconButton
