import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import GroupCard from '../../components/UI/GroupCard'
import { getCurse } from '../../store/slices/student-slices/student-actions'
import HeaderLayout from '../../components/UI/HeaderLoyout'
import { UiLoading } from '../../components/UI/UiLoading'

const StudentMain = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { course, status } = useSelector((state) => state.student)

   const navigateHandler = (id) => {
      navigate(`/student/lessons/${id}`)
   }

   useEffect(() => {
      dispatch(getCurse())
   }, [])

   return (
      <CourseMain>
         <HeaderLayout roles="Студент" />
         {status === 'loading' ? (
            <UiLoading />
         ) : (
            <GridCourse>
               {course.map((element) => (
                  <GroupCard
                     key={element.id}
                     someImage={element.image}
                     someName={element.courseName}
                     someParagraph={element.description}
                     someYear={element.dateOfStart}
                     onClick={() => navigateHandler(element.id)}
                  />
               ))}
            </GridCourse>
         )}
      </CourseMain>
   )
}

export default StudentMain

const GridCourse = styled.div`
   display: grid;
   grid-template-columns: repeat(4, 1fr);
   column-gap: 20px;
   row-gap: 20px;
   margin-top: 25px;
`
const CourseMain = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   padding: 0 40px 0 20px;
   background-color: #eff0f4;
`
