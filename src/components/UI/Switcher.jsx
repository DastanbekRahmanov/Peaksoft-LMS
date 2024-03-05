import { styled } from '@mui/material/styles'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Stack from '@mui/material/Stack'

const Switcher = (props) => {
   const { value, AmountAnswer, color, bgcolor, label, clickHandler } = props
   return (
      <FormGroup
         sx={{
            padding: '20px',
            justifyContent: 'center',
            border: '1px solid #D4D4D4',
            borderRadius: '10px',
            color: { color },
            bgcolor: { bgcolor },
            width: '1140px',
            height: '68px',
         }}
      >
         <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
         >
            <p>{AmountAnswer} ответов</p>
            <FormControlLabel
               labelPlacement="start"
               label={label}
               onChange={clickHandler}
               value={value}
               control={<CustomSwitch sx={{ m: 1 }} defaultChecked />}
            />
         </Stack>
      </FormGroup>
   )
}
export default Switcher

const CustomSwitch = styled((props) => (
   <Switch size="medium" focusVisibleClassName=".Mui-focusVisible" {...props} />
))(() => ({
   float: 'right',
   width: 51,
   height: 30,
   padding: 0,
   borderRadius: 100,
   '& .MuiSwitch-switchBase': {
      padding: 4,
      margin: 1,
      color: '#C91E1E',
      '&.Mui-checked': {
         transform: 'translateX(20px)',
         color: '#36AC0C',
         '& + .MuiSwitch-track': {
            backgroundColor: '#fff',
            opacity: 1,
            border: 0,
         },
      },
   },
   '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: '#fff  ',
      opacity: 1,
   },
}))
