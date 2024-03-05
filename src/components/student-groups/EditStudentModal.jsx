import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import UIButton from '../UI/UIButton'
import UiInput from '../UI/UiInput'
import ModalWindow from '../UI/ModalWindow'
import { getGroups } from '../../store/slices/admin-slices/group-slices/group-actions'
import { LEARNING_FORMAT } from '../../utils/constants/constants'
import GroupsSelect from '../UI/StudentsSelects/GroupsSelect'
import StudyFormatSelect from '../UI/StudentsSelects/StudyFormatSelect'
import PopUp from '../UI/PopUp'
import {
   editStudents,
   getStudentById,
} from '../../store/slices/admin-slices/admin-student/student-actions'

const EditStudentModal = ({ open, handleClose }) => {
   const [validateError, setValidateError] = useState(false)
   const [editStudent, setEditStudent] = useState({
      fullName: '',
      email: '',
      phoneNumber: '',
      groupId: '',
   })

   const { status, error } = useSelector((state) => state.students)

   const [params] = useSearchParams()
   const { id } = Object.fromEntries(params)
   const dispatch = useDispatch()
   const { groups } = useSelector((state) => state.groups)

   const [value, setValue] = useState({
      fullName: '',
      phoneNumber: '',
      email: '',
      groupId: '',
      studyFormat: '',
   })

   const getOptionValue = (grId) => {
      setValue({ ...value, groupId: grId })
   }

   const getValueGroupsSelect = (grName) => {
      setValue({ ...value, groupId: grName })
      setEditStudent({
         ...editStudent,
         groupId: grName,
      })
   }

   const getValueFormatsSelect = (format) => {
      setValue({ ...value, studyFormat: format })
      setEditStudent({
         ...editStudent,
         studyFormat: format,
      })
   }

   // eslint-disable-next-line consistent-return
   const editGroupHandler = (e) => {
      e.preventDefault()
      if (
         !editStudent.fullName &&
         !editStudent.phoneNumber &&
         !editStudent.email &&
         !editStudent.groupId &&
         !editStudent.studyFormat
      )
         return setValidateError(true)
      dispatch(
         editStudents({
            id,
            body: {
               ...editStudent,
               fullName: editStudent.fullName,
               phoneNumber: editStudent.phoneNumber,
               email: editStudent.email,
               groupId: editStudent.groupId,
               studyFormat: editStudent.studyFormat,
            },
         })
      )
      handleClose()
   }

   useEffect(() => {
      dispatch(getGroups())
      dispatch(getStudentById(id))
         .unwrap()
         .then((result) => {
            setEditStudent({
               ...editStudent,
               fullName: result.fullName,
               phoneNumber: result.phoneNumber,
               email: result.email,
               groupId: result.groupId,
               studyFormat: result.studyFormat,
            })
         })
   }, [])

   const getNumber = (number) => {
      if (number.length < 13) {
         setEditStudent({
            ...editStudent,
            phoneNumber: number,
         })
      }
   }

   return (
      <>
         {status === 'error' && <PopUp message={error} messageType="error" />}

         <ModalWindow
            open={open}
            handleClose={handleClose}
            modalTitle="Редактирование студента"
            bodyContent={
               <DivContainer>
                  {validateError && (
                     <ErrorMessage>
                        Все поля обязательны к заполнению
                     </ErrorMessage>
                  )}
                  <UiInput
                     margintop="16px"
                     placeholder="ФИО"
                     type="text"
                     onChange={(e) =>
                        setEditStudent({
                           ...editStudent,
                           fullName: e.target.value,
                        })
                     }
                     value={editStudent.fullName || ''}
                  />

                  <UiInput
                     margintop="12px"
                     placeholder="+996 ___ __ __ __"
                     type="number"
                     onChange={(e) => getNumber(e.target.value)}
                     value={editStudent.phoneNumber || ''}
                  />

                  <UiInput
                     margintop="12px"
                     placeholder="Email"
                     type="email"
                     onChange={(e) =>
                        setEditStudent({
                           ...editStudent,
                           email: e.target.value,
                        })
                     }
                     value={editStudent.email || ''}
                  />

                  <GroupsSelect
                     valueGroupSelect={
                        editStudent.groupId
                           ? editStudent.groupId
                           : value.groupId
                     }
                     setValueGroupSelect={getValueGroupsSelect}
                     options={groups}
                     getOptionValue={getOptionValue}
                  />

                  <StudyFormatSelect
                     valueFormats={
                        editStudent.studyFormat
                           ? editStudent.studyFormat
                           : value.studyFormat
                     }
                     setValueFormats={getValueFormatsSelect}
                     formats={LEARNING_FORMAT}
                  />

                  <ContaiberButton>
                     <UIButton
                        onClick={handleClose}
                        variant="outlined"
                        width="103px"
                        borderradius="8px"
                     >
                        Отмена
                     </UIButton>
                     <UIButton
                        onClick={editGroupHandler}
                        type="submit"
                        variant="contained"
                        background="#3772FF"
                        width="117px"
                        borderradius="8px"
                     >
                        Добавить
                     </UIButton>
                  </ContaiberButton>
               </DivContainer>
            }
         />
      </>
   )
}
export default EditStudentModal

const DivContainer = styled.form`
   margin-bottom: 20px;
   .MuiOutlinedInput-root {
      width: 491px;
      height: 42px;
      padding-top: 2px;
   }
   :first-child {
      margin-top: 16px;
   }
   div {
      padding-top: 12px;
   }
   .MuiSelect-select {
      width: 491px;
      height: 42px;
      div {
         display: flex;
         justify-content: flex-start;
         margin-bottom: 5px;
      }
   }
`
const ContaiberButton = styled.div`
   margin-bottom: 15px;
   margin-left: 35px;
   margin-top: 8px;
   width: 491px;
   gap: 10px;
   display: flex;
   justify-content: end;
`
const ErrorMessage = styled.p`
   color: red;
   font-family: 'Open Sans';
   font-style: normal;
   font-weight: 400;
   font-size: 15px;
   line-height: 16px;
`
