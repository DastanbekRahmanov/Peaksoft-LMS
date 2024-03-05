/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { Button, styled as style } from '@mui/material'
import BreadCrumbs from '../../components/UI/BreadCrambs'
import HeaderLoyout from '../../components/UI/HeaderLoyout'
import { getCoursesById } from '../../store/slices/instructor-slices/courses/course-actions'
import { getCoursesLessons } from '../../store/slices/instructor-slices/materials/materials-actions'
import { courseCrumbs, courseLinks } from '../../utils/helpers/helper'
import EditLesson from '../../assets/editLesson.svg'
import DeleteLesson from '../../assets/deleteLesson.svg'
import { ActionSelect } from '../../components/ins-materials/LessonActionSelect'
import PopUp from '../../components/UI/PopUp'
import { UiLoading } from '../../components/UI/UiLoading'
import { NoDataInfo } from '../../components/UI/NoDataInfo'
import { ReactComponent as AddIcon } from '../../assets/plusIconAdmin.svg'
import { CreateLessonModal } from '../../components/ins-materials/CreateLessonModal'
import { RenameModal } from '../../components/ins-materials/RenameModal'
import { CreatePresentationModal } from '../../components/ins-materials/CreatePresentation'
import { EditPresentationModal } from '../../components/ins-materials/EditPresentationModal'
import { PpesentationDeleteModal } from '../../components/ins-materials/DeletePresentationModal'
import { CreateVideoModal } from '../../components/ins-materials/CreateVideoModal'
import { EditVideoModal } from '../../components/ins-materials/EditVideoModal'
import { DeleteVideoModal } from '../../components/ins-materials/DeleteVideoModal'
import { CreateLinkModal } from '../../components/ins-materials/CreateLinkModal'
import { EditLinkModal } from '../../components/ins-materials/EditLinkModal'
import { DeleteLinkModal } from '../../components/ins-materials/DeleteLinkModal'
import { SELECT_OPTIONS } from '../../utils/constants/constants'
import MaterialsLessonCard from '../../components/ins-materials/MaterialsLessonCard'
import { DeleteLessonModal } from '../../components/ins-materials/DeleteLessonModal'

export const InstructorMaterials = () => {
   const { id } = useParams()
   const dispatch = useDispatch()
   const [params, setParams] = useSearchParams()
   const { modalOpen } = Object.fromEntries(params)
   const navigate = useNavigate()

   const { courseName } = useSelector((state) => state.insCourses)
   const { lessons, status, error } = useSelector((state) => state.materials)
   const [state, setState] = React.useState('')
   const [validateError, setValidateError] = React.useState(false)

   const openCreateModal = () => {
      setParams({ modalOpen: 'CREATE-LESSON', id })
   }
   const submitEdit = (lessonId) => {
      setParams({ modalOpen: 'RENAME-LESSON', id, lessonId })
   }

   const deletLesson = (lessonId) => {
      setParams({ modalOpen: 'DELETE-LESSON', lessonId })
   }

   const onGetActionHandler = (action, idLesson) => {
      switch (action) {
         case 'Видеоурок':
            setParams({ modalOpen: 'POST-VIDEO', idLesson, courseId: id })
            break
         case 'Презентация':
            setParams({ modalOpen: 'POST-PPTX', idLesson, courseId: id })
            break
         case 'Задание':
            navigate(`/instructor/create-task/${id}/${idLesson}`)
            break
         case 'Ссылка':
            setParams({ modalOpen: 'POST-LINK', idLesson, courseId: id })
            break
         case 'Тест':
            navigate(`/instructor/test/${id}/${idLesson}`)
            break
         default:
            setParams({})
      }
   }

   // * presentation functions
   const editPresentation = (presentationId) => {
      if (presentationId === null) {
         setValidateError((prev) => !prev)
      } else {
         setParams({ modalOpen: 'EDIT-PPTX', presentationId })
      }
   }
   const deletePresentation = (presentationId) => {
      if (presentationId === null) {
         setValidateError((prev) => !prev)
      } else {
         setParams({ modalOpen: 'DELETE-PPTX', presentationId })
      }
   }

   // * video lesson functions
   const editVideo = (videoId, lessonId) => {
      if (videoId === null) {
         setValidateError((prev) => !prev)
      } else {
         setParams({ modalOpen: 'EDIT-VIDEO', videoId, lessonId })
      }
   }
   const deleteVideo = (videoId) => {
      if (videoId === null) {
         setValidateError((prev) => !prev)
      } else {
         setParams({ modalOpen: 'DELETE-VIDEO', videoId })
      }
   }

   // * video lesson functions

   const editLink = (linkId, lessonId) => {
      if (linkId === null) {
         setValidateError((prev) => !prev)
      } else {
         setParams({ modalOpen: 'EDIT-LINK', linkId, lessonId })
      }
   }
   const deleteLink = (linkId) => {
      if (linkId === null) {
         setValidateError((prev) => !prev)
      } else {
         setParams({ modalOpen: 'DELETE-LINK', linkId })
      }
   }

   const navigateHandler = (action, incomingId) => {
      switch (action) {
         case 'Видеоурок':
            navigate(`/instructor/video/${id}/${incomingId}`)
            break
         case 'Презентация':
            navigate(`/instructor/presentataion/${id}/${incomingId}`)

            break
         case 'Задание':
            navigate(`/instructor/task/${id}/${incomingId}`)

            break
         case 'Ссылка':
            navigate(`/instructor/lesson-link/${id}/${incomingId}`)

            break
         case 'Тест':
            navigate(`/instructor/test/${id}/${incomingId}`)
            break
         default:
            navigate()
      }
   }

   useEffect(() => {
      dispatch(getCoursesLessons(id))
      dispatch(getCoursesById(id))
   }, [dispatch])

   return (
      <>
         <StudetsMain>
            <HeaderLoyout roles="Инструктор" links={courseLinks(id)} />
            <HeaderBlock>
               <BreadCrumbsBlock>
                  <BreadCrumbs paths={courseCrumbs(courseName, 'Материалы')} />
               </BreadCrumbsBlock>
               <CustomButton variant="contained" onClick={openCreateModal}>
                  <AddIcon />
                  <ButtonText>Добавить урок</ButtonText>
               </CustomButton>
            </HeaderBlock>

            {status === 'loading' ? (
               <UiLoading />
            ) : (
               <>
                  {lessons.length === 0 && (
                     <NoDataInfo title="Тут пока нет никаких уроков" />
                  )}
                  <LessonGrid>
                     {lessons?.map((element) => (
                        <MaterialsLessonCard
                           key={element.lessonId}
                           headerIcon={EditLesson}
                           actionIcon={DeleteLesson}
                           lessonId={element.lessonId}
                           videoId={element.videoId}
                           presentationId={element.presentationId}
                           editHandler={() =>
                              submitEdit(element.lessonId, element.lessonName)
                           }
                           deleteHandler={() => deletLesson(element.lessonId)}
                           // * presentation functions
                           editPresentation={() =>
                              editPresentation(element.presentationId)
                           }
                           deletePresentation={() =>
                              deletePresentation(element.presentationId)
                           }
                           // * video lesson functions
                           editVideo={() =>
                              editVideo(element.videoId, element.lessonId)
                           }
                           deleteVideo={() => deleteVideo(element.videoId)}
                           // * video lesson functions
                           editLink={() =>
                              editLink(element.linkId, element.lessonId)
                           }
                           deleteLink={() => deleteLink(element.linkId)}
                           navigateHandler={navigateHandler}
                           actionButton={
                              <ActionSelect
                                 getActionHandler={onGetActionHandler}
                                 placeholder="Добавить"
                                 data={SELECT_OPTIONS}
                                 personName={state}
                                 idLesson={element.lessonId}
                                 setPersonName={setState}
                              />
                           }
                           title={element.lessonName}
                        />
                     ))}
                  </LessonGrid>
               </>
            )}
         </StudetsMain>

         {validateError && (
            <PopUp
               messageType="error"
               message="Файл не существует, сначала создайте"
            />
         )}
         {status === 'created' && (
            <PopUp message="Урок успешно создан" messageType="success" />
         )}
         {status === 'deleted' && (
            <PopUp message="Удалено" messageType="success" />
         )}
         {status === 'edited' && (
            <PopUp message="Отредактировано" messageType="success" />
         )}
         {status === 'uploaded' && (
            <PopUp message="Загружено успешно" messageType="success" />
         )}
         {error && <PopUp message={error} messageType="error" />}

         {modalOpen === 'CREATE-LESSON' && (
            <CreateLessonModal
               open={modalOpen === 'CREATE-LESSON'}
               onClose={() => setParams({})}
            />
         )}

         {modalOpen === 'RENAME-LESSON' && (
            <RenameModal
               open={modalOpen === 'RENAME-LESSON'}
               onClose={() => setParams({})}
            />
         )}

         {modalOpen === 'POST-PPTX' && (
            <CreatePresentationModal
               open={modalOpen === 'POST-PPTX'}
               onClose={() => setParams({})}
            />
         )}
         {modalOpen === 'EDIT-PPTX' && (
            <EditPresentationModal
               open={modalOpen === 'EDIT-PPTX'}
               onClose={() => setParams({})}
            />
         )}
         {modalOpen === 'DELETE-PPTX' && (
            <PpesentationDeleteModal
               open={modalOpen === 'DELETE-PPTX'}
               onClose={() => setParams({})}
            />
         )}
         {modalOpen === 'POST-VIDEO' && (
            <CreateVideoModal
               open={modalOpen === 'POST-VIDEO'}
               onClose={() => setParams({})}
            />
         )}
         {modalOpen === 'EDIT-VIDEO' && (
            <EditVideoModal
               open={modalOpen === 'EDIT-VIDEO'}
               onClose={() => setParams({})}
            />
         )}
         {modalOpen === 'DELETE-VIDEO' && (
            <DeleteVideoModal
               open={modalOpen === 'DELETE-VIDEO'}
               onClose={() => setParams({})}
            />
         )}
         {modalOpen === 'POST-LINK' && (
            <CreateLinkModal
               open={modalOpen === 'POST-LINK'}
               onClose={() => setParams({})}
            />
         )}
         {modalOpen === 'EDIT-LINK' && (
            <EditLinkModal
               open={modalOpen === 'EDIT-LINK'}
               onClose={() => setParams({})}
            />
         )}
         {modalOpen === 'DELETE-LINK' && (
            <DeleteLinkModal
               open={modalOpen === 'DELETE-LINK'}
               onClose={() => setParams({})}
            />
         )}
         {modalOpen === 'DELETE-LESSON' && (
            <DeleteLessonModal
               open={modalOpen === 'DELETE-LESSON'}
               onClose={() => setParams({})}
            />
         )}
      </>
   )
}
const StudetsMain = styled.div`
   padding: 0 10px;
   background-color: #eff0f4;
   width: 100%;
   overflow: auto;
`
const LessonGrid = styled.div`
   display: grid;
   grid-template-columns: 1fr 1fr;
   column-gap: 20px;
   row-gap: 20px;
   margin-top: 10px;
`
const BreadCrumbsBlock = styled.div``
const CustomButton = style(Button)`
   height: 40px;
   width: 174px;
   border-radius: 8px;
`
const ButtonText = styled.p`
   font-size: 14px;
   margin-left: 8px;
`
const HeaderBlock = styled.div`
   display: flex;
   justify-content: space-between;
   padding: 24px 0;
   margin: 0 39px;
`
