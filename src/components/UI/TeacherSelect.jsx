import OutlinedInput from '@mui/material/OutlinedInput'
import { MenuItem, FormControl, styled, Select, Checkbox } from '@mui/material'

export const TeacherSelect = (props) => {
   const { data, personName, setPersonName, getIdHandler, pleceholder } = props

   const handleChange = (event) => {
      const { value } = event.target
      setPersonName(typeof value === 'string' ? value.split(',') : value)
   }

   return (
      <div>
         <FormControl>
            <CustomSelect
               multiple
               displayEmpty
               value={personName}
               onChange={handleChange}
               input={<OutlinedInput />}
               renderValue={() => <p>{pleceholder}</p>}
            >
               {data.map((item) => (
                  <CustomMenuItem
                     key={item.id}
                     value={item.fullName}
                     onClick={() => getIdHandler(item.id)}
                  >
                     {item.fullName}
                     <Checkbox
                        checked={personName.some((e) =>
                           e.includes(item.fullName)
                        )}
                     />
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
