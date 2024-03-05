import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import SelectMui from '@mui/material/Select'
import styled from 'styled-components'

function StudyFormatSelect({ valueFormats, setValueFormats, formats }) {
   const handleChange = (event) => {
      setValueFormats(event.target.value)
   }
   return (
      <Form>
         <SelectMui
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
                     <p>{item.studyFormat}</p>
                  </MenuItem>
               )
            })}
         </SelectMui>
      </Form>
   )
}
export default StudyFormatSelect

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
