import { Grid, Modal, styled, Typography } from '@mui/material/'

const ModalWindow = ({
   modalTitle,
   bodyContent,
   headerContent,
   footerContent,
   open,
   handleClose,
}) => {
   return (
      <ModalMain open={open} onClose={handleClose}>
         <ModalBlock>
            {modalTitle && <TitleBlock>{modalTitle}</TitleBlock>}
            <Grid>{headerContent}</Grid>
            <Grid>{bodyContent}</Grid>
            <Grid>{footerContent}</Grid>
         </ModalBlock>
      </ModalMain>
   )
}
export default ModalWindow
const ModalMain = styled(Modal)`
   height: 100vh;
   width: 100vw;
   position: fixed;
   top: 0;
   left: 0;
   display: flex;
   align-items: center;
   justify-content: center;
`

const ModalBlock = styled(Grid)`
   border-radius: 10px;
   background-color: #fff;
   text-align: center;
   padding: 0 0 10px 0;
   width: 540px;
`
const TitleBlock = styled(Typography)`
   border-radius: 10px 10px 0 0;
   width: auto;
   font-size: 19px;
   font-weight: 400;
   padding: 25px 100px;
   background: #1f6ed4;
   color: #fff;
`
