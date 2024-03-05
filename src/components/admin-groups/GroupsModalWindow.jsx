import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import ModalWindow from '../UI/ModalWindow'
import ImagePicker from '../UI/ImagePicker'
import UiInput from '../UI/UiInput'
import DatePicker from '../UI/DatePicker'
import TextArea from '../UI/TextArea'
import UIButton from '../UI/UIButton'
import { postGroups } from '../../store/slices/admin-slices/group-slices/group-actions'
import PopUp from '../UI/PopUp'

export const GroupsModalWindow = ({ onClose, open }) => {
   const dispatch = useDispatch()
   const [uploadedImage, setUploadedImage] = useState(null)
   const [validateError, setValidateError] = useState(false)

   const [groupData, setGroupData] = useState({
      groupName: '',
      description: '',
      dateOfStart: '',
   })
   const closeHadler = () => {
      setValidateError(false)
      onClose()
   }
   const createNewGroupHandler = () => {
      const isFormNotFilled = Object.values({
         ...groupData,
         image: uploadedImage,
      }).some((value) => !value)

      if (isFormNotFilled) return setValidateError(true)

      dispatch(postGroups({ ...groupData, image: uploadedImage }))
      setUploadedImage(null)
      setGroupData({ groupName: '', description: '', dateOfStart: '' })
      return closeHadler()
   }

   return (
      <>
         {validateError && (
            <PopUp messageType="error" message="Ошибка заполнения" />
         )}
         <ModalWindow
            open={open}
            handleClose={closeHadler}
            modalTitle="Создание группы"
            headerContent={
               <ImagePickerBlock>
                  <ImagePicker
                     setUploadedImage={setUploadedImage}
                     uploadedImage={uploadedImage}
                  />
               </ImagePickerBlock>
            }
            bodyContent={
               <ModalFormBLock>
                  {validateError && (
                     <ErrorMessage>
                        Все поля обязательны к заполнению
                     </ErrorMessage>
                  )}
                  <FormInputBlock>
                     <UiInput
                        width="327px"
                        placeholder="Название группы"
                        onChange={(e) =>
                           setGroupData({
                              ...groupData,
                              groupName: e.target.value,
                           })
                        }
                     />
                     <DatePicker
                        value={groupData.dateOfStart}
                        width="149px"
                        height="42px"
                        placeholder="дд.мм.гг"
                        onChange={(event) =>
                           setGroupData({
                              ...groupData,
                              dateOfStart: event,
                           })
                        }
                     />
                  </FormInputBlock>
                  <TextArea
                     onChange={(e) =>
                        setGroupData({
                           ...groupData,
                           description: e.target.value,
                        })
                     }
                     placeholder="Описание группы"
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
                     onClick={closeHadler}
                  >
                     Отмена
                  </UIButton>
                  <UIButton
                     borderradius="8px"
                     width="117px"
                     height="40px"
                     variant="contained"
                     onClick={createNewGroupHandler}
                  >
                     Добавить
                  </UIButton>
               </FooterBlock>
            }
         />
      </>
   )
}

const ImagePickerBlock = styled.div`
   display: flex;
   justify-content: center;
   margin: 10px;
`

const ModalFormBLock = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
`
const FormInputBlock = styled.div`
   display: flex;
   justify-content: space-between;
   column-gap: 12px;
   padding: 15px 0;
`
const FooterBlock = styled.div`
   display: flex;
   justify-content: flex-end;
   margin: 20px 25px 15px 0;
   column-gap: 10px;
`
const ErrorMessage = styled.p`
   color: red;
`
