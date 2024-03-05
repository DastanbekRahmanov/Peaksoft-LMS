import styled from 'styled-components'
import { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, OutlinedInput, FormControl } from '@mui/material'

const UiIsPassword = ({ error, placeholder, onChange, value }) => {
   const [values, setValues] = useState(false)

   function handleViewOnOff() {
      setValues((prevState) => !prevState)
   }
   return (
      <FormControl>
         <InputPassword
            onChange={onChange}
            placeholder={placeholder}
            error={error}
            value={value}
            type={values ? 'text' : 'password'}
            endAdornment={
               <IconButton onClick={() => handleViewOnOff()}>
                  {values ? <Visibility /> : <VisibilityOff />}
               </IconButton>
            }
         />
      </FormControl>
   )
}

export default UiIsPassword
const InputPassword = styled(OutlinedInput)`
   &:hover {
      border: none;
   }

   & .MuiInputBase-input {
      padding: 10px 14px;
      :-webkit-autofill {
         transition-delay: 9999s;
      }
   }

   &.MuiInputBase-root {
      height: 42px;
      border-radius: 8px;
      background: #ffffff;
      caret-color: #258aff;
   }
   &.MuiOutlinedInput-notchedOutline {
      border: solid 1px #d4d4d4;
   }
   &.Mui-focused {
      border: none;
   }
`
