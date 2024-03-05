import { Alert, Snackbar, styled as style } from '@mui/material'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as ErrorIcon } from '../../assets/error.svg'
import { ReactComponent as SuccesIcon } from '../../assets/success.svg'

const PopUp = ({ message, messageType }) => {
   const [open, setOpen] = useState(true)
   const handleClose = (reason) => {
      if (reason === 'clickaway') {
         return
      }
      setOpen(false)
   }

   return (
      <Snackbar
         open={open}
         autoHideDuration={3000}
         onClose={handleClose}
         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
         <AlertBlock
            variant="filled"
            iconMapping={{ error: <ErrorIcon />, success: <SuccesIcon /> }}
            severity={messageType}
         >
            <p>{message}</p>
         </AlertBlock>
      </Snackbar>
   )
}
PopUp.propTypes = {
   messageType: PropTypes.oneOf(['error', 'success']),
   message: PropTypes.string,
}
PopUp.defaultProps = {
   messageType: 'success' || 'error',
   message: [],
}

export default PopUp

const AlertBlock = style(Alert)`
   display: flex;
   flex-direction: row-reverse;
   justify-items: center;
   align-items: center;
   border-radius: 10px;
   p {
      margin-right: 12px;
   }
`
