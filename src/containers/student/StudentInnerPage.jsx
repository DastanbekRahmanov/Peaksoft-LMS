import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { getCurseLessons } from '../../store/slices/student-slices/student-actions'
import LessonCard from '../../components/UI/LessonCard'
import HeaderLoyout from '../../components/UI/HeaderLoyout'
import { UiLoading } from '../../components/UI/UiLoading'

const StudentInnerPage = () => {
   const { id } = useParams()
   const dispatch = useDispatch()
   const { lessons, status } = useSelector((state) => state.student)
   const navigate = useNavigate()
   useEffect(() => {
      dispatch(getCurseLessons(id))
   }, [])
   const navigateVideoLesson = (videoId) => {
      navigate(`/student/video-page/${videoId}`)
   }
   const navigatePresentation = (presentationId) => {
      navigate(`/student/presentaion-page/${presentationId}`)
   }
   const navigateTask = () => {
      navigate('/student/task-page')
   }
   const navigateLink = () => {
      navigate('/student/link-page')
   }
   const navigateTest = () => {
      navigate('/student/test-page')
   }
   return (
      <CourseMain>
         <HeaderLoyout roles="Студент" />

         {status === 'loading' ? (
            <UiLoading />
         ) : (
            <GridCourse>
               {lessons.map((element) => (
                  <LessonCard
                     title={element.lessonName}
                     navigateVideoLesson={() =>
                        navigateVideoLesson(element.videoId)
                     }
                     navigatePresentation={() =>
                        navigatePresentation(element.presentationId)
                     }
                     navigateTask={navigateTask}
                     navigateLink={navigateLink}
                     navigateTest={navigateTest}
                  />
               ))}
            </GridCourse>
         )}
      </CourseMain>
   )
}
const CourseMain = styled.div`
   width: 100%;
   padding: 0 40px 0 20px;
   background-color: #eff0f4;
`
const GridCourse = styled.div`
   display: flex;
   flex-wrap: wrap;
   column-gap: 20px;
   row-gap: 20px;
   margin-top: 25px;
`
export default StudentInnerPage
