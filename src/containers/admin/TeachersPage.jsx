import styled from 'styled-components'
import { useSearchParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UiTable from '../../components/UI/UiTable'
import Wrapper from '../../components/UI/Wrapper'
import UIButton from '../../components/UI/UIButton'
import { ReactComponent as RenameIcon } from '../../assets/renameIcon.svg'
import { ReactComponent as DeleteIcon } from '../../assets/deleteIcon.svg'
import AddInstructorModal from '../../components/admin-teacher/AddInstructorModal'
import { ReactComponent as PlusIcon } from '../../assets/buttonPlusIcon.svg'
import { HEAD_DATA } from '../../utils/constants/constants'
import {
   deleteTeacher,
   getAllTeacher,
} from '../../store/slices/admin-slices/teacher-slices/teacherActions'
import RenameInstructorModal from '../../components/admin-teacher/RenameInstructorModal'
import PopUp from '../../components/UI/PopUp'
import HeaderLoyout from '../../components/UI/HeaderLoyout'
import { UiLoading } from '../../components/UI/UiLoading'

export const TeachersPage = () => {
   const dispatch = useDispatch()
   const { error, status } = useSelector((state) => state.teacher)
   const [params, setParams] = useSearchParams()
   const { modalOpen } = Object.fromEntries(params)
   const { getTeacher } = useSelector((state) => state.teacher)
   const [open, setOpen] = useState(false)

   const render = getTeacher.map((el, i) => {
      return {
         itemId: el.id,
         id: i + 1,
         name: el.fullName,
         format: el.specialization,
         phone: el.phoneNumber,
         email: el.email,
      }
   })
   useEffect(() => {
      dispatch(getAllTeacher())
   }, [])

   const onCloseHandler = () => {
      setOpen(false)
   }
   const onCloseRenameHandler = () => {
      setParams({})
   }
   const deleteHandler = (id) => {
      dispatch(deleteTeacher(id))
   }
   const renameHandler = (itemId) => {
      setParams({ modalOpen: 'EDIT-TEACHER', itemId })
   }
   const openModalHandler = () => {
      setOpen(true)
   }

   return (
      <>
         {error && <PopUp message={error} messageType="error" />}
         {status === 'created' && (
            <PopUp message="Учитель успешно создана" messageType="success" />
         )}
         {status === 'deleted' && (
            <PopUp message="Учитель удален" messageType="success" />
         )}
         {status === 'edited' && (
            <PopUp
               message="Учитель успешно отредактирована"
               messageType="success"
            />
         )}
         <Container>
            <HeaderBlock>
               <HeaderLoyout roles="Администратор" />
            </HeaderBlock>
            <ButtonWrapper>
               <UIButton
                  startIcon={<PlusIcon />}
                  onClick={openModalHandler}
                  variant="contained"
                  background="#3772FF"
               >
                  Добавить учителя
               </UIButton>
            </ButtonWrapper>
            {status === 'loading' ? (
               <UiLoading />
            ) : (
               <GroupsMain>
                  <Wrapper height="100%">
                     <UiTable
                        headData={HEAD_DATA}
                        data={render}
                        actions
                        secondIcon={<RenameIconTeacher />}
                        secondOnClick={renameHandler}
                        thirdIcon={<DeleteIconTeacher />}
                        thirdOnClick={deleteHandler}
                     />
                  </Wrapper>
               </GroupsMain>
            )}
         </Container>

         {modalOpen === 'EDIT-TEACHER' && (
            <RenameInstructorModal
               handleClose={onCloseRenameHandler}
               open={modalOpen === 'EDIT-TEACHER'}
            />
         )}

         {open && (
            <AddInstructorModal handleClose={onCloseHandler} open={open} />
         )}
      </>
   )
}
const Container = styled.div`
   width: 100%;
   background-color: #eff0f4;
   padding: 0 10px;
`
const GroupsMain = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   background-color: #eff0f4;
`
const ButtonWrapper = styled.div`
   display: flex;
   justify-content: end;
   margin: 20px 0;
`
const DeleteIconTeacher = styled(DeleteIcon)`
   cursor: pointer;
`
const RenameIconTeacher = styled(RenameIcon)`
   cursor: pointer;
`
const HeaderBlock = styled.div`
   padding: 0 15px;
`
