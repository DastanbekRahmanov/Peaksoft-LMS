import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import SelectMui from '@mui/material/Select'
import styled from 'styled-components'

function FilteredStudyFormat({
   valueFormats,
   setValueFormats,
   formats,
   onChange,
   onClick,
}) {
   const handleChange = (event) => {
      setValueFormats(event.target.value)
   }
   return (
      <Form>
         <SelectMui
            onClick={onClick}
            onChange={handleChange}
            value={valueFormats}
            displayEmpty
            renderValue={
               valueFormats !== ''
                  ? undefined
                  : () => <Placeholder>Формат обучения</Placeholder>
            }
         >
            {formats?.map((item) => {
               return (
                  <MenuItem key={item.studyFormat} value={item.studyFormat}>
                     <p onChange={onChange}>{item.studyFormat}</p>
                  </MenuItem>
               )
            })}
         </SelectMui>
      </Form>
   )
}
export default FilteredStudyFormat

const Form = styled(FormControl)`
   .MuiSelect-select {
      display: flex;
      justify-content: flex-start;
   }
   & > div {
      height: 40px;
      border-radius: 10px;
   }
   width: 202px;
   height: 40px;
   background: #ffffff;
   border-radius: 10px;
   & fieldset {
      border: 2px solid #3772ff;
   }
`
const Placeholder = styled.p`
   font-weight: 600;
   font-size: 14px;
   color: #3772ff;
`
