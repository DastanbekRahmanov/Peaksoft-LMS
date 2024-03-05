import React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import { MenuItem, FormControl, Checkbox, styled, Select } from '@mui/material'

export const GroupSelect = (props) => {
   const {
      personName,
      setPersonName,
      data,
      placeholder,
      getIdHandler,
      checkbox,
   } = props

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
               renderValue={(selected) => {
                  if (selected.length === 0) {
                     return <p>{placeholder}</p>
                  }

                  return selected
               }}
            >
               {data.map((item) => (
                  <CustomMenuItem
                     onClick={() => getIdHandler(item.id)}
                     key={item.id}
                     value={item.name}
                  >
                     {item.name}
                     {checkbox && (
                        <Checkbox
                           checked={personName.some((e) =>
                              e.includes(item.name)
                           )}
                        />
                     )}
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
   width: 491px;
   border-radius: 10px;
`
