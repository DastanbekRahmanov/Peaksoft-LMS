import React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import { MenuItem, FormControl, Checkbox, styled, Select } from '@mui/material'

export const CourseSelect = (props) => {
   const { value, setValue, data, pleceholder, getIdHandler, checkbox } = props
   return (
      <div>
         <FormControl>
            <CustomSelect
               displayEmpty
               value={value}
               onChange={({ target }) => setValue(target.value)}
               input={<OutlinedInput />}
               renderValue={(selected) => {
                  if (!selected.length === 0) {
                     return selected.name
                  }
                  return <p>{pleceholder}</p>
               }}
            >
               {data.map((item) => (
                  <CustomMenuItem
                     onClick={() =>
                        getIdHandler({ id: item.id, name: item.fullName })
                     }
                     key={item.id}
                     value={item.fullName}
                  >
                     {item.fullName}
                     {checkbox && (
                        <Checkbox
                           checked={value.some((e) =>
                              e.includes(item.fullName)
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
