import React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import { MenuItem, FormControl, styled, Select } from '@mui/material'

export const ActionSelect = (props) => {
   const { personName, setPersonName, data, placeholder, getActionHandler } =
      props

   const handleChange = (event) => {
      setPersonName(event.target.value)
   }

   return (
      <div>
         <FormControl>
            <CustomSelect
               displayEmpty
               value={personName}
               onChange={handleChange}
               input={<OutlinedInput />}
               renderValue={() => <p>{placeholder}</p>}
            >
               {data.map((item) => (
                  <CustomMenuItem
                     onClick={() => getActionHandler(item.name, props.idLesson)}
                     key={item.id}
                     value={item.name}
                  >
                     {item.name}
                  </CustomMenuItem>
               ))}
            </CustomSelect>
         </FormControl>
      </div>
   )
}

const CustomMenuItem = styled(MenuItem)`
   display: flex;
   justify-content: space-between;
`

const CustomSelect = styled(Select)`
   border: 1px solid #d4d4d4;
   height: 48px;
   padding: 0 !important;
   width: 125px;
   border-radius: 10px;
`
