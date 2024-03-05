import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import BreadCrumbs from '../../components/UI/BreadCrambs'
import HeaderLayout from '../../components/UI/HeaderLoyout'
import Test from '../../components/createTest/Test'
import { taskCrumbs } from '../../utils/helpers/helper'

export const InstructorTest = () => {
   const courseId = useParams()

   const { courseName } = useSelector((state) => state.insCourses)

   return (
      <TestPageMain>
         <HeaderLayout roles="Инструктор" />
         <BreadCrumbsBlock>
            <BreadCrumbs paths={taskCrumbs(courseName, 'Teст', courseId)} />
         </BreadCrumbsBlock>
         <Test />
      </TestPageMain>
   )
}
const TestPageMain = styled.div`
   padding: 0 10px;
   background-color: #eff0f4;
   width: auto;
   /* overflow: auto; */
`
const BreadCrumbsBlock = styled.div`
   margin: 47px 0 24px 41px;
`
