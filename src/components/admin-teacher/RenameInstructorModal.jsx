import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
   editTeacher,
   renameTeacher,
} from '../../store/slices/admin-slices/teacher-slices/teacherActions'
import UIButton from '../UI/UIButton'
import UiInput from '../UI/UiInput'
import ModalWindow from '../UI/ModalWindow'
import PopUp from '../UI/PopUp'

const RenameInstructorModal = ({ open, handleClose }) => {
   const dispatch = useDispatch()
   const [validateError, setValidateError] = useState(false)
   const [groupData, setGroupData] = useState({
      fullName: '',
      phoneNumber: '',
      specialization: '',
      email: '',
   })
   const [params] = useSearchParams()
   const { itemId } = Object.fromEntries(params)

   // eslint-disable-next-line consistent-return
   const editGroupHandler = (e) => {
      e.preventDefault()
      if (
         !groupData.fullName &&
         !groupData.phoneNumber &&
         !groupData.specialization &&
         !groupData.email
      )
         return setValidateError(true)
      dispatch(
         editTeacher({
            itemId,
            body: {
               fullName: groupData.fullName,
               phoneNumber: groupData.phoneNumber,
               specialization: groupData.specialization,
               email: groupData.email,
            },
         })
      )
      handleClose()
   }

   useEffect(() => {
      dispatch(renameTeacher(itemId))
         .unwrap()
         .then((result) => {
            setGroupData({
               ...groupData,
               fullName: result.fullName,
               phoneNumber: result.phoneNumber,
               specialization: result.specialization,
               email: result.email,
            })
         })
   }, [])
   return (
      <>
         {validateError && (
            <PopUp messageType="error" message="Произошла ошибка" />
         )}
         <ModalWindow
            open={open}
            handleClose={handleClose}
            modalTitle="Изменить учителя"
            bodyContent={
               <DivContainer>
                  {validateError && (
                     <ErrorMessage>
                        Все поля обязательны к заполнению
                     </ErrorMessage>
                  )}
                  <UiInput
                     margintop="16px"
                     placeholder="Имя"
                     onChange={(e) =>
                        setGroupData({
                           ...groupData,
                           fullName: e.target.value,
                        })
                     }
                     value={groupData.fullName}
                     type="text"
                  />

                  <UiInput
                     margintop="12px"
                     placeholder="+996 ___ __ __ __"
                     onChange={(e) =>
                        setGroupData({
                           ...groupData,
                           phoneNumber: e.target.value,
                        })
                     }
                     value={groupData.phoneNumber}
                     type="number"
                  />
                  <UiInput
                     margintop="12px"
                     placeholder="Специализация"
                     onChange={(e) =>
                        setGroupData({
                           ...groupData,
                           specialization: e.target.value,
                        })
                     }
                     value={groupData.specialization}
                     type="text"
                  />
                  <UiInput
                     margintop="12px"
                     placeholder="Email"
                     onChange={(e) =>
                        setGroupData({
                           ...groupData,
                           email: e.target.value,
                        })
                     }
                     value={groupData.email}
                     type="email"
                  />
                  <DivBtn>
                     <ButtonCloseTeacher
                        marginleft="10px"
                        onClick={handleClose}
                        variant="outlined"
                     >
                        Отмена
                     </ButtonCloseTeacher>
                     <ButtonAddTeacher
                        marginleft="10px"
                        onClick={editGroupHandler}
                        variant="contained"
                        background="#3772FF"
                     >
                        Создать
                     </ButtonAddTeacher>
                  </DivBtn>
               </DivContainer>
            }
         />
      </>
   )
}
export default RenameInstructorModal

const DivContainer = styled.form`
   width: 100%;
   margin-bottom: 20px;
   & .MuiInputBase-input {
      width: 491px;
      height: 42px;
   }
`
const DivBtn = styled.div`
   margin-bottom: 15px;
   width: 491px;
   display: flex;
   justify-content: end;
   margin-left: 35px;
   margin-top: 20px;
`
const ButtonAddTeacher = styled(UIButton)`
   width: 117px;
   &.cojpMK.MuiButtonBase-root {
      margin-left: 10px;
   }
`
const ButtonCloseTeacher = styled(UIButton)`
   width: 117px;
`
const ErrorMessage = styled.p`
   color: red;
   font-family: 'Open Sans';
   font-style: normal;
   font-weight: 400;
   font-size: 15px;
   line-height: 16px;
`
