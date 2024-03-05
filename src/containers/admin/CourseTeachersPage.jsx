/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { UiLoading } from '../../components/UI/UiLoading'
import Wrapper from '../../components/UI/Wrapper'
import UiTable from '../../components/UI/UiTable'
import BreadCrumbs from '../../components/UI/BreadCrambs'
import PopUp from '../../components/UI/PopUp'
import { NoDataInfo } from '../../components/UI/NoDataInfo'
import { COURSE_DATA_TEACHERS } from '../../utils/constants/constants'
import { ReactComponent as DeleteIcon } from '../../assets/deleteIcon.svg'
import UIButton from '../../components/UI/UIButton'
import { ReactComponent as AsignTeacherModal } from '../../assets/asignTeacherModal.svg'
import {
   courseTeachersRequest,
   deleteCourseTeachers,
   getCourseById,
} from '../../store/slices/admin-slices/courses-slices/courses-actions'
import CourseAssignModal from '../../components/admin-courses/CourseAssignModal'
import HeaderLoyout from '../../components/UI/HeaderLoyout'

export const CourseTeachersPage = () => {
   const { id } = useParams()

   const [params, setParams] = useSearchParams()
   const { modalOpen } = Object.fromEntries(params)
   const [currentCourse, setCurrentCourse] = useState('')
   const { courseTeachers, error, status } = useSelector(
      (state) => state.courses
   )
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(courseTeachersRequest(id))
      dispatch(getCourseById(id))
         .unwrap()
         .then((response) => {
            setCurrentCourse(response.courseName)
         })
   }, [dispatch])

   const ADMIN_COURSE_PATH = [
      { path: '/admin/courses', to: '/admin/courses', name: 'Курсы ' },
      {
         path: '',
         to: '',
         name: currentCourse,
      },
      { path: `/admin/course/${id}`, name: 'Учителя' },
   ]
   const COURSE_TEACHERS_PATH = [
      { path: `/admin/courses/course-teachers/${id}`, name: 'Учителя' },
      {
         path: `/admin/courses/course-students/${id}`,
         name: ' Студенты',
      },
   ]

   const courseStudentDate = courseTeachers.map((el, i) => {
      return {
         itemId: el.id,
         id: i + 1,
         name: el.fullName,
         format: el.specialization,
         phone: el.phoneNumber,
         email: el.email,
      }
   })

   const deleteHandler = (instructorId) => {
      dispatch(
         deleteCourseTeachers({
            instructorId,
            courseId: +id,
         })
      )
   }

   const openAssignModal = () => {
      setParams({ modalOpen: 'ASSIGN-TEACHER', id })
   }
   const closeModalHandler = () => {
      setParams({})
   }
   return (
      <TeacherMain>
         <TeacherContainer>
            <HeaderLoyout links={COURSE_TEACHERS_PATH} roles="Администратор" />
            <Block>
               <BreadCrumbs paths={ADMIN_COURSE_PATH} />
               <UIButton
                  width="250px"
                  startIcon={<AsignTeacherModal />}
                  onClick={openAssignModal}
                  variant="contained"
                  background="#3772FF"
                  colour="#FFF"
                  height="40px"
               >
                  Назначить учителя
               </UIButton>
            </Block>
            {status === 'loading' ? (
               <UiLoading />
            ) : courseTeachers.length === 0 ? (
               <NoDataInfo title="В этой группе не назначены учителя" />
            ) : (
               <Wrapper width="1140px" margin="24px 0" height="100vh">
                  <UiTable
                     headData={COURSE_DATA_TEACHERS}
                     data={courseStudentDate}
                     actions
                     thirdIcon={<DeleteIconTeacher />}
                     thirdOnClick={deleteHandler}
                  />
               </Wrapper>
            )}
         </TeacherContainer>
         <CourseAssignModal
            open={modalOpen === 'ASSIGN-TEACHER'}
            onClose={closeModalHandler}
         />
         {status === 'deleted' && (
            <PopUp message="Учитель удален" messageType="success" />
         )}

         {error && <PopUp message={error} messageType="error" />}
      </TeacherMain>
   )
}
const TeacherContainer = styled.div`
   width: 1140px;
   display: flex;
   align-items: center;
   flex-direction: column;
`

const TeacherMain = styled.div`
   background-color: #eff0f4;
   width: 100%;
   display: flex;
   justify-content: center;
`

const Block = styled.div`
   display: flex;
   width: 100%;
   justify-content: space-between;
   align-items: center;
   margin: 25px 0 20px 0;
   nav > {
      display: inline-block;
   }
`

const DeleteIconTeacher = styled(DeleteIcon)`
   cursor: pointer;
`
