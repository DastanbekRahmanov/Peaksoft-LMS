import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import BreadCrumbs from '../../components/UI/BreadCrambs'
import HeaderLayout from '../../components/UI/HeaderLoyout'
import Wrapper from '../../components/UI/Wrapper'
import { getCoursesById } from '../../store/slices/instructor-slices/courses/course-actions'
import { getPresentationById } from '../../store/slices/instructor-slices/materials/materials-actions'
import { VIEWER } from '../../utils/constants/constants'
import { taskCrumbs } from '../../utils/helpers/helper'

export const InstructorPresentaion = () => {
   const { presentationId, courseId } = useParams()
   const dispatch = useDispatch()
   const { courseName } = useSelector((state) => state.insCourses)
   const [data, setData] = useState({})

   useEffect(() => {
      dispatch(getCoursesById(courseId))
      dispatch(getPresentationById(presentationId))
         .unwrap()
         .then((result) => setData(result))
   }, [])

   return (
      <TestPageMain>
         <HeaderLayout roles="Инструктор" />
         <BreadCrumbsBlock>
            <BreadCrumbs
               paths={taskCrumbs(courseName, 'Презентация', courseId)}
            />
         </BreadCrumbsBlock>
         <Wrapper padding="20px 300px 20px 20px">
            <Embet
               src={VIEWER + data.presentationLink}
               type="application/pdf"
               title="PeakSoft presentation viewer"
            />

            <h2>{data.presentationName}</h2>
            <p>{data.description}</p>
         </Wrapper>
      </TestPageMain>
   )
}
const TestPageMain = styled.div`
   padding: 0 10px;
   background-color: #eff0f4;
   width: 100%;
   overflow: auto;
`
const BreadCrumbsBlock = styled.div`
   margin: 47px 0 24px 41px;
`
const Embet = styled.embed`
   width: 792px;
   height: 464px;
   border-radius: 10px;
`
