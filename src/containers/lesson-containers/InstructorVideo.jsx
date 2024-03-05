import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Wrapper from '../../components/UI/Wrapper'
import BreadCrumbs from '../../components/UI/BreadCrambs'
import HeaderLayout from '../../components/UI/HeaderLoyout'
import { getVideoById } from '../../store/slices/instructor-slices/materials/materials-actions'
import { getYoutubeThumbnail, taskCrumbs } from '../../utils/helpers/helper'
import { getCoursesById } from '../../store/slices/instructor-slices/courses/course-actions'

export const InstructorVideoPage = () => {
   const { videoId, courseId } = useParams()
   const dispatch = useDispatch()
   const { courseName } = useSelector((state) => state.insCourses)
   const [data, setData] = useState({})

   useEffect(() => {
      dispatch(getCoursesById(courseId))
      dispatch(getVideoById(videoId))
         .unwrap()
         .then((result) => setData(result))
   }, [])

   return (
      <TestPageMain>
         <HeaderLayout roles="Инструктор" />
         <BreadCrumbsBlock>
            <BreadCrumbs
               paths={taskCrumbs(courseName, 'Видеоурок', courseId)}
            />
         </BreadCrumbsBlock>
         <Wrapper padding="20px 300px 20px 20px">
            <Iframe
               width="792px"
               height="464px"
               src={getYoutubeThumbnail(data.link)}
               title="PeakSoft video player"
               frameborder="0"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
               allowfullscreen
            />
            <h2>{data.videoName}</h2>
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
const Iframe = styled.iframe`
   border-radius: 10px;
   border: none;
`
