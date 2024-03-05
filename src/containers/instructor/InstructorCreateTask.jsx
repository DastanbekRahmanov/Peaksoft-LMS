import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import BreadCrumbs from '../../components/UI/BreadCrambs'
import CreateTask from '../../components/UI/createTask/CreateTask'
import HeaderLayout from '../../components/UI/HeaderLoyout'
import { taskCrumbs } from '../../utils/helpers/helper'

export const InstructorCreateTask = () => {
   const { courseId } = useParams()
   const { courseName } = useSelector((state) => state.insCourses)

   return (
      <TaskPageMain>
         <HeaderLayout roles="Инструктор" />
         <BreadCrumbsBlock>
            <BreadCrumbs
               paths={taskCrumbs(courseName, 'Создание Задания', courseId)}
            />
         </BreadCrumbsBlock>
         <CreateTask />
      </TaskPageMain>
   )
}

const TaskPageMain = styled.div`
   padding: 0 10px;
   background-color: #eff0f4;
   width: 100%;
   overflow: auto;
`
const BreadCrumbsBlock = styled.div`
   margin: 47px 0 24px 41px;
`
