import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useRef } from 'react'
import UIButton from '../UI/UIButton'
import ModalWindow from '../UI/ModalWindow'
import GroupsSelect from '../UI/StudentsSelects/GroupsSelect'
import PopUp from '../UI/PopUp'
import UiInput from '../UI/UiInput'
import { postImportExcel } from '../../store/slices/admin-slices/admin-student/student-actions'

const ImportExcelModal = ({ open, handleClose }) => {
   const dispatch = useDispatch()

   const { status, fulfilled, error } = useSelector((state) => state.students)

   const [importExcel, setImportExcel] = useState({
      groupId: '',
      uploadFile: [],
   })

   const filePicker = useRef(null)

   const { groups } = useSelector((state) => state.groups)

   const [value, setValue] = useState({
      groupId: '',
   })

   const getOptionValue = (grId) => {
      setValue({ ...value, groupId: grId })
   }

   const getValueGroupsSelect = (grName) => {
      setValue({ ...value, groupId: grName })
   }

   const handlePick = () => {
      filePicker.current.click()
   }
   const handleChange = (event) => {
      setImportExcel({
         ...importExcel,
         uploadFile: event.target.files[0],
         groupId: value.groupId,
      })
   }

   const sendingFile = (e) => {
      e.preventDefault()
      dispatch(postImportExcel(importExcel))
      handleClose()
   }

   return (
      <>
         {status === 'error' && <PopUp message={error} messageType="error" />}

         {status === 'imported' && (
            <PopUp message={fulfilled} messageType="success" />
         )}
         <ModalWindow
            open={open}
            handleClose={handleClose}
            modalTitle="Импорт Excel в БД"
            bodyContent={
               <DivContainer>
                  <GroupsSelect
                     valueGroupSelect={
                        importExcel.groupId
                           ? importExcel.groupId
                           : value.groupId
                     }
                     setValueGroupSelect={getValueGroupsSelect}
                     options={groups}
                     getOptionValue={getOptionValue}
                  />
                  <StyledBox>
                     <UiInput
                        placeholder="Выберите Excel файл для импорта"
                        type="text"
                        isDisabled
                        onChange={(event) =>
                           setImportExcel({
                              ...importExcel,
                              uploadFile: event.target.files,
                           })
                        }
                        value={importExcel.uploadFile.name || ''}
                     />
                     <input
                        className="hidden"
                        accept=".xlsx, application/vnd.openxmlformsts-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        type="file"
                        ref={filePicker}
                        onChange={handleChange}
                     />
                     <UIButton
                        onClick={handlePick}
                        variant="outlined"
                        borderradius="8px"
                        background="rgba(26, 35, 126, 0.07)"
                     >
                        Обзор...
                     </UIButton>
                  </StyledBox>

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
                        onClick={sendingFile}
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
export default ImportExcelModal

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
const StyledBox = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   .MuiInputBase-root {
      width: 369px;
   }
   button {
      width: 110px;
      height: 42px;
      margin: 12px 0 0 12px;
   }
`
