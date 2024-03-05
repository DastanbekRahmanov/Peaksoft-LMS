import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import {
   assignCourseinstructor,
   getAllTeachers,
} from '../../store/slices/admin-slices/courses-slices/courses-actions'
import ModalWindow from '../UI/ModalWindow'
import UIButton from '../UI/UIButton'
import DeleteX from '../../assets/removeX.svg'
import { CourseSelect } from '../../containers/admin/CourseSelect'

const CourseAssignModal = ({ open, onClose }) => {
   const dispatch = useDispatch()
   const { teachers } = useSelector((state) => state.courses)
   const [params] = useSearchParams()
   const { id } = Object.fromEntries(params)
   useEffect(() => {
      dispatch(getAllTeachers())
   }, [])
   const [personName, setPersonName] = useState([])
   const [nameInputValue, setNameInputValue] = useState('')
   const [nameID, setNameID] = useState([])

   const newData = (data) => {
      setNameID((prev) => [...prev, data.id])
      setPersonName((prev) => [...prev, { ...data }])
   }

   const assignHandler = () => {
      const asignPost = {
         instructorId: nameID,
         courseId: +id,
      }
      dispatch(assignCourseinstructor(asignPost))
      onClose()
   }

   const filteredRemove = (item) => {
      const deletedItems = personName.filter((el) => el.id !== item)
      setPersonName(deletedItems)
   }
   return (
      <ModalWindow
         open={open}
         handleClose={() => onClose()}
         modalTitle="Назначить учителя"
         headerContent={
            <NameBlock>
               {personName.map((el) => (
                  <Items key={el.id}>
                     <p>{el.name}</p>
                     <img
                        src={DeleteX}
                        alt="icons"
                        onClick={() => filteredRemove(el.id)}
                     />
                  </Items>
               ))}
            </NameBlock>
         }
         bodyContent={
            <ModalFormBLock>
               <CourseSelect
                  data={teachers}
                  value={nameInputValue}
                  setValue={setNameInputValue}
                  getIdHandler={newData}
                  pleceholder="Выбрать учителя"
               />
            </ModalFormBLock>
         }
         footerContent={
            <FooterBlock>
               <UIButton
                  borderradius="8px"
                  width="117px"
                  height="40px"
                  variant="outlined"
                  onClick={() => onClose()}
               >
                  Отмена
               </UIButton>
               <UIButton
                  borderradius="8px"
                  width="117px"
                  height="40px"
                  variant="contained"
                  onClick={assignHandler}
               >
                  Добавить
               </UIButton>
            </FooterBlock>
         }
      />
   )
}

export default CourseAssignModal

const Items = styled.div`
   width: 491px;
   height: 42px;
   border: 1px solid #d4d4d4;
   border-radius: 10px;
   display: flex;
   align-items: center;
   justify-content: space-between;
   margin-bottom: 10px;
   padding: 10px 10px 10px 160px;
   text-align: center;
   cursor: pointer;
`

const ModalFormBLock = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
`
const NameBlock = styled.div`
   display: flex;
   align-items: center;
   flex-direction: column;
   text-align: center;
   margin: 10px;
`

const FooterBlock = styled.div`
   display: flex;
   justify-content: flex-end;
   margin: 20px 25px 15px 0;
   column-gap: 10px;
`
