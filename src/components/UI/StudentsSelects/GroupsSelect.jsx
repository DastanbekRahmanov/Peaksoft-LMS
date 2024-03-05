import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import SelectMui from '@mui/material/Select'
import styled from 'styled-components'

function GroupsSelect({
   valueGroupSelect,
   setValueGroupSelect,
   options,
   getOptionValue,
}) {
   const handleChange = (event) => {
      setValueGroupSelect(event.target.value)
   }
   return (
      <Form>
         <SelectMui
            onChange={handleChange}
            value={valueGroupSelect}
            displayEmpty
            renderValue={
               valueGroupSelect !== ''
                  ? undefined
                  : () => <Placeholder>Группа</Placeholder>
            }
         >
            {options?.map((item) => {
               return (
                  <MenuItem
                     key={item.id}
                     value={item.id}
                     onClick={() => getOptionValue(item.id)}
                  >
                     <p>{item.groupName}</p>
                  </MenuItem>
               )
            })}
         </SelectMui>
      </Form>
   )
}
export default GroupsSelect

const Form = styled(FormControl)`
   .MuiSelect-select {
      display: flex;
      justify-content: flex-start;
   }
   & > div {
      height: ${(props) => props.height || '40px'};
      border-radius: 10px;
   }
   width: ${(props) => props.width};
   margin: ${(props) => props.margin};
   background: #ffffff;
   border-radius: 10px;
   & fieldset {
      border-radius: 10px;
      border: ${(props) => props.border};
   }
`
const Placeholder = styled.p`
   font-weight: 400;
   font-size: 16px;
   color: #8d949e;
`
