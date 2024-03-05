import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { InsMeatBalls } from '../../components/instructor/InsMeatBalls'
import GroupCard from '../../components/UI/GroupCard'
import { getCourses } from '../../store/slices/instructor-slices/courses/course-actions'
import { UiLoading } from '../../components/UI/UiLoading'
import { NoDataInfo } from '../../components/UI/NoDataInfo'
import { AssignGroupModal } from '../../components/instructor/AssignGroupModal'
import PopUp from '../../components/UI/PopUp'
import HeaderLayout from '../../components/UI/HeaderLoyout'

export const InstructorMain = () => {
   const { courses, status } = useSelector((state) => state.insCourses)
   const [params, setParams] = useSearchParams()
   const { modalOpen } = Object.fromEntries(params)
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const openAssignModal = (id) => {
      setParams({ modalOpen: 'ASSIGN-GROUP', id })
   }
   const closeModalHandler = () => {
      setParams({})
   }
   const navigateHanlder = (id) => {
      navigate(`course-students/${id}`)
   }

   useEffect(() => {
      dispatch(getCourses())
   }, [dispatch])

   return (
      <CourseMain>
         <HeaderBlock>
            <HeaderLayout roles="Инструктор" />
         </HeaderBlock>
         {status === 'loading' ? (
            <UiLoading />
         ) : (
            <>
               {courses.length === 0 && (
                  <NoDataInfo title="У вас пока нет курсов" />
               )}
               <GridCourses>
                  {courses?.map((element) => (
                     <GroupCard
                        key={element.id}
                        someImage={element.image}
                        someName={element.courseName}
                        someParagraph={element.description}
                        someYear={element.dateOfStart}
                        onClick={() => navigateHanlder(element.id)}
                        someButton={
                           <InsMeatBalls
                              openAssignModal={openAssignModal}
                              id={element.id}
                           />
                        }
                     />
                  ))}
               </GridCourses>
            </>
         )}

         {status === 'assigned' && (
            <PopUp message="Группа добавлена в курс" messageType="success" />
         )}
         <AssignGroupModal
            open={modalOpen === 'ASSIGN-GROUP'}
            onClose={closeModalHandler}
         />
      </CourseMain>
   )
}

const CourseMain = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   background-color: #eff0f4;
`
const GridCourses = styled.div`
   display: grid;
   grid-template-columns: repeat(4, 1fr);
   column-gap: 20px;
   row-gap: 20px;
   margin-top: 10px;
   padding: 0 40px 0 20px;
`
const HeaderBlock = styled.div`
   padding: 0 10px;
`
