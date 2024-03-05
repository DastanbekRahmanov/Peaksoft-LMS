import React, { useEffect, useState } from 'react'
import { Button, styled as style } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { useSearchParams } from 'react-router-dom'
import ModalWindow from '../UI/ModalWindow'
import { GroupSelect } from './GroupSelect'
import { getGroups } from '../../store/slices/admin-slices/group-slices/group-actions'
import PopUp from '../UI/PopUp'
import { assignGroups } from '../../store/slices/instructor-slices/courses/course-actions'

export const AssignGroupModal = ({ open, onClose }) => {
   const [valueSelect, setValueSelect] = useState('')
   const dispatch = useDispatch()
   const [params] = useSearchParams()

   const { id } = Object.fromEntries(params)
   const [data, setData] = React.useState({
      groupId: null,
      courseId: null,
   })

   const { groups } = useSelector((state) => state.groups)
   const { error } = useSelector((state) => state.insCourses)

   const render = groups.map(({ id, groupName }) => {
      return {
         id,
         name: groupName,
      }
   })

   const getGroupId = (selectedId) => {
      setData({ courseId: id, groupId: selectedId })
   }

   const assignGroupHandler = () => {
      dispatch(assignGroups(data))
      onClose()
   }

   useEffect(() => {
      dispatch(getGroups())
   }, [])

   return (
      <>
         {error && <PopUp message={error} messageType="error" />}
         <ModalWindow
            open={open}
            handleClose={() => onClose()}
            modalTitle="Добавить студентов группы в курс"
            bodyContent={
               <InputBlock>
                  <GroupSelect
                     getIdHandler={getGroupId}
                     personName={valueSelect}
                     setPersonName={setValueSelect}
                     data={render}
                     placeholder="Группа"
                  />
               </InputBlock>
            }
            footerContent={
               <>
                  <CustomButton onClick={() => onClose()} variant="outlined">
                     Отмена
                  </CustomButton>
                  <CustomButton
                     variant="contained"
                     onClick={assignGroupHandler}
                  >
                     Добавить
                  </CustomButton>
               </>
            }
         />
      </>
   )
}
const CustomButton = style(Button)`
   width: 108px;
   margin: 10px 10px 18px 0;
   padding: 10px 24px;
   border-radius: 10px;
   font-size: 14px;
   :last-child {
      margin-right: 0;
   }
`
const InputBlock = styled.div`
   margin: 16px 0;
`
