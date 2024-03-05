import React from 'react'
import Checkbox from '@mui/material/Checkbox'

export default function UiCheckbox({
   value,
   disabled,
   setIsClicked,
   id,
   checked,
}) {
   const clickHandler = () => {
      setIsClicked((prev) => !prev)
   }
   return (
      <Checkbox
         checked={checked}
         id={id}
         value={value}
         disabled={disabled}
         onClick={clickHandler}
      />
   )
}
