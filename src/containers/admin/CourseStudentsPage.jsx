/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { UiLoading } from '../../components/UI/UiLoading'
import Wrapper from '../../components/UI/Wrapper'
import UiTable from '../../components/UI/UiTable'
import BreadCrumbs from '../../components/UI/BreadCrambs'
import PopUp from '../../components/UI/PopUp'
import { NoDataInfo } from '../../components/UI/NoDataInfo'
import { COURSE_DATA_STUDENT } from '../../utils/constants/constants'
import {
   courseStudentsRequest,
   getCourseById,
} from '../../store/slices/admin-slices/courses-slices/courses-actions'
import HeaderLoyout from '../../components/UI/HeaderLoyout'

export const CourseStudentsPage = () => {
   const { id } = useParams()
   const dispatch = useDispatch()
   const [currentCourse, setCurrentCourse] = useState('')
   const { courseStudent, error, status } = useSelector(
      (state) => state.courses
   )
   useEffect(() => {
      dispatch(courseStudentsRequest(id))

      dispatch(getCourseById(id))
         .unwrap()
         .then((response) => {
            setCurrentCourse(response.courseName)
         })
   }, [])

   const ADMIN_COURSE_PATH = [
      { path: '/admin/courses', to: '/admin/courses', name: 'Курсы ' },
      {
         path: '',
         to: '',
         name: currentCourse,
      },
      { path: `/admin/course/${id}`, name: 'Студенты' },
   ]

   const COURSE_STUDENT_PATH = [
      {
         path: `/admin/courses/course-teachers/${id}`,
         name: 'Учителя',
      },
      { path: `/admin/courses/course-students/${id}`, name: 'Студенты' },
   ]

   const courseStudentDate = courseStudent.map((el, i) => {
      return {
         id: i + 1,
         name: el.fullName,
         group: el.groupName,
         format: el.studyFormat,
         phone: el.phoneNumber,
         email: el.email,
      }
   })
   return (
      <>
         <StudetsMain>
            <StudentContainer>
               <HeaderLoyout
                  links={COURSE_STUDENT_PATH}
                  roles="Администратор"
               />
               <BreadcrumsBlock>
                  <BreadCrumbs paths={ADMIN_COURSE_PATH} />
               </BreadcrumsBlock>

               {status === 'loading' ? (
                  <UiLoading />
               ) : courseStudent.length === 0 ? (
                  <NoDataInfo title="В этой группе пока нет студентов" />
               ) : (
                  <Wrapper width="1140px" margin="24px 0" height="100vh">
                     <UiTable
                        headData={COURSE_DATA_STUDENT}
                        data={courseStudentDate}
                     />
                  </Wrapper>
               )}
            </StudentContainer>
         </StudetsMain>
         {error && <PopUp message={error} messageType="error" />}
      </>
   )
}
const StudetsMain = styled.div`
   background-color: #eff0f4;
   width: 100%;
   display: flex;
   justify-content: center;
`
const StudentContainer = styled.div`
   width: 1140px;
`

const BreadcrumsBlock = styled.div`
   display: flex;
   justify-content: start;
   margin: 34px 0 24px 0;
`
