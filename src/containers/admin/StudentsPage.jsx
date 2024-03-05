import styled from 'styled-components'
import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import UIButton from '../../components/UI/UIButton'
import PopUp from '../../components/UI/PopUp'
import { ReactComponent as ExporExcelIcon } from '../../assets/exportExcel.svg'
import { ReactComponent as AddPlusIcon } from '../../assets/addPlusIcon.svg'
import { ReactComponent as RenameIcon } from '../../assets/renameIcon.svg'
import { ReactComponent as DeleteIcon } from '../../assets/deleteIcon.svg'
import AddStudentModal from '../../components/student-groups/AddStudentModal'
import {
   deleteStudent,
   getAllStudents,
   getFilteredlStudents,
} from '../../store/slices/admin-slices/admin-student/student-actions'
import Wrapper from '../../components/UI/Wrapper'
import UiTable from '../../components/UI/UiTable'
import {
   LEARNING_FORMAT_STUDENTS,
   STUDENT_HEADER,
} from '../../utils/constants/constants'
import FilteredStudyFormat from '../../components/UI/StudentsSelects/FilteredStudyFormat'
import EditStudentModal from '../../components/student-groups/EditStudentModal'
import ImportExcelModal from '../../components/student-groups/ImportExcelModal'
import HeaderLoyout from '../../components/UI/HeaderLoyout'

export const StudentsPage = () => {
   const dispatch = useDispatch()
   const [stateItems, setStateItems] = useState({
      openModalAddStudents: false,
      openModalImportExcel: false,
   })
   const [params, setParams] = useSearchParams()
   const { modalOpen } = Object.fromEntries(params)

   const { students, status, error, fulfilled } = useSelector(
      (state) => state.students
   )

   useEffect(() => {
      dispatch(getAllStudents())
   }, [])

   const render = students.map((item, i) => {
      return {
         itemId: item.id,
         id: i + 1,
         name: item.fullName,
         format: item.studyFormat,
         group: item.groupName,
         phone: item.phoneNumber,
         email: item.email,
      }
   })

   const [filteredFormat, setFilteredFormat] = useState('')

   const onCloseHandler = () => {
      setParams({})
   }

   const renameHandler = (id) => {
      setParams({ modalOpen: 'EDIT-STUDENT', id })
   }

   const openModalAddStudent = () => {
      setStateItems({
         ...stateItems,
         openModalAddStudents: false,
      })
   }

   const onCloseImportExcelHandler = () => {
      setStateItems({
         ...stateItems,
         openModalImportExcel: false,
      })
   }
   const getValueFormatsSelect = (format) => {
      dispatch(getFilteredlStudents(format))
      setFilteredFormat(format)
   }

   const deleteHandler = (id) => {
      dispatch(deleteStudent(id))
   }

   return (
      <>
         {status === 'mistake' && <PopUp message={error} messageType="error" />}
         {status === 'rejected' && (
            <PopUp message={error} messageType="error" />
         )}

         {status === 'created' && (
            <PopUp message={fulfilled} messageType="success" />
         )}
         {status === 'deleted' && (
            <PopUp message={fulfilled} messageType="success" />
         )}
         {status === 'edited' && (
            <PopUp message={fulfilled} messageType="success" />
         )}

         <Conatiner>
            <HeaderBlock>
               <HeaderLoyout roles="Администратор" />
            </HeaderBlock>
            <Block>
               <FilteredStudyFormat
                  valueFormats={filteredFormat}
                  setValueFormats={getValueFormatsSelect}
                  formats={LEARNING_FORMAT_STUDENTS}
               />

               <ButtonBlock>
                  <UIButton
                     startIcon={<ExporExcelIcon />}
                     onClick={() =>
                        setStateItems({
                           ...stateItems,
                           openModalImportExcel: true,
                        })
                     }
                     variant="outlined"
                     borderradius="8px"
                     margin="0 10px 0 0"
                     fontSize="14px"
                     width="162px"
                     height="40px"
                  >
                     Импорт Excel
                  </UIButton>

                  <UIButton
                     onClick={() =>
                        setStateItems({
                           ...stateItems,
                           openModalAddStudents: true,
                        })
                     }
                     startIcon={<AddPlusIcon />}
                     variant="contained"
                     borderradius="8px"
                     fontSize="14px"
                     width="204px"
                     height="40px"
                  >
                     Добавить студента
                  </UIButton>
               </ButtonBlock>
            </Block>
            <TableMain>
               <Wrapper width="100%" margin="24px 0" height="100%">
                  <UiTable
                     data={render}
                     headData={STUDENT_HEADER}
                     actions
                     secondIcon={<RenameIcon />}
                     secondOnClick={renameHandler}
                     thirdIcon={<DeleteIcon />}
                     thirdOnClick={deleteHandler}
                  />
               </Wrapper>
            </TableMain>
            <AddStudentModal
               handleClose={openModalAddStudent}
               open={stateItems.openModalAddStudents}
            />
            {modalOpen === 'EDIT-STUDENT' && (
               <EditStudentModal
                  handleClose={onCloseHandler}
                  open={modalOpen === 'EDIT-STUDENT'}
               />
            )}
            <ImportExcelModal
               handleClose={onCloseImportExcelHandler}
               open={stateItems.openModalImportExcel}
            />
         </Conatiner>
      </>
   )
}
const Conatiner = styled.div`
   width: 100%;
   background: #eff0f4;
`
const TableMain = styled.div`
   display: flex;
   justify-content: center;
   padding: 0 10px;
`
const Block = styled.div`
   margin-top: 20px;
   display: flex;
   justify-content: space-between;
   padding: 0 10px;
`
const ButtonBlock = styled.div`
   display: flex;
   gap: 10px;
`
const HeaderBlock = styled.div`
   padding: 0 25px;
`
