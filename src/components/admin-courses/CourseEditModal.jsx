import { useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import {
   editCourse,
   getCourseById,
} from '../../store/slices/admin-slices/courses-slices/courses-actions'
import ImagePicker from '../UI/ImagePicker'
import ModalWindow from '../UI/ModalWindow'
import UiInput from '../UI/UiInput'
import DatePicker from '../UI/DatePicker'
import TextArea from '../UI/TextArea'
import UIButton from '../UI/UIButton'
import PopUp from '../UI/PopUp'

const CourseEditModal = ({ open, onClose }) => {
   const dispatch = useDispatch()
   const [uploadedImage, setUploadedImage] = useState(null)
   const [validateError, setValidateError] = useState(false)

   const [params] = useSearchParams()
   const { id } = Object.fromEntries(params)

   const [courseData, setCourseData] = useState({
      courseName: '',
      description: '',
      dateOfStart: '',
   })
   // eslint-disable-next-line consistent-return
   const editCourseHandler = () => {
      if (
         !courseData.courseName &&
         !courseData.description &&
         !courseData.dateOfStart &&
         !uploadedImage
      )
         return setValidateError(true)
      dispatch(
         editCourse({ id, body: { ...courseData, image: uploadedImage } })
      )
      onClose()
   }

   useEffect(() => {
      dispatch(getCourseById(id))
         .unwrap()
         .then((result) => {
            setCourseData({
               ...courseData,
               courseName: result.courseName,
               description: result.description,
               dateOfStart: result.dateOfStart,
            })
            setUploadedImage(result.image)
         })
   }, [])

   return (
      <>
         {validateError && (
            <PopUp messageType="error" message="Ошибка заполнения" />
         )}
         <ModalWindow
            open={open}
            handleClose={() => onClose()}
            modalTitle="Редактировать  курс"
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
                        value={courseData.courseName}
                        width="327px"
                        placeholder="Название курс"
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
                     value={courseData.description}
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
                     onClick={() => onClose()}
                  >
                     Отмена
                  </UIButton>
                  <UIButton
                     borderradius="8px"
                     width="117px"
                     height="40px"
                     variant="contained"
                     onClick={editCourseHandler}
                  >
                     Сохранить
                  </UIButton>
               </FooterBlock>
            }
         />
      </>
   )
}

export default CourseEditModal

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
