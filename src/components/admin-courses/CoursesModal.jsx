import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import React, { useState } from 'react'
import { postCourses } from '../../store/slices/admin-slices/courses-slices/courses-actions'
import ImagePicker from '../UI/ImagePicker'
import ModalWindow from '../UI/ModalWindow'
import UiInput from '../UI/UiInput'
import DatePicker from '../UI/DatePicker'
import TextArea from '../UI/TextArea'
import UIButton from '../UI/UIButton'
import PopUp from '../UI/PopUp'

const CoursesModal = ({ open, isOpen }) => {
   const dispatch = useDispatch()
   const [uploadedImage, setUploadedImage] = useState(null)
   const [validateError, setValidateError] = useState(false)
   const [courseData, setCourseData] = useState({
      courseName: '',
      description: '',
      dateOfStart: '',
   })

   const createNewCourseHandler = () => {
      const isFormNotFilled = Object.values({
         ...courseData,
         image: uploadedImage,
      }).some((value) => !value)

      if (isFormNotFilled) return setValidateError(true)

      dispatch(postCourses({ ...courseData, image: uploadedImage }))
      setUploadedImage(null)
      setCourseData({ courseName: '', description: '', dateOfStart: '' })
      return isOpen(false)
   }

   return (
      <>
         {validateError && (
            <PopUp messageType="error" message="Ошибка заполнения" />
         )}
         <ModalWindow
            open={open}
            handleClose={() => isOpen(false)}
            modalTitle="Создать  курс"
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
                  <FormInputBlock>
                     <UiInput
                        width="327px"
                        placeholder="Название группы"
                        onChange={({ target }) =>
                           setCourseData({
                              ...courseData,
                              courseName: target.value,
                           })
                        }
                     />
                     <DatePicker
                        value={courseData.dateOfStart}
                        width="149px"
                        height="42px"
                        placeholder="дд.мм.гг"
                        onChange={(event) =>
                           setCourseData({
                              ...courseData,
                              dateOfStart: event,
                           })
                        }
                     />
                  </FormInputBlock>
                  <TextArea
                     onChange={({ target }) =>
                        setCourseData({
                           ...courseData,
                           description: target.value,
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
                     onClick={() => isOpen(false)}
                  >
                     Отмена
                  </UIButton>
                  <UIButton
                     borderradius="8px"
                     width="117px"
                     height="40px"
                     variant="contained"
                     onClick={createNewCourseHandler}
                  >
                     Добавить
                  </UIButton>
               </FooterBlock>
            }
         />
      </>
   )
}

export default CoursesModal

const ModalFormBLock = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
`
const ImagePickerBlock = styled.div`
   display: flex;
   justify-content: center;
   margin: 10px;
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
