import React from 'react'
import styled from 'styled-components'
import lessonVideoIcon from '../../assets/LessonVideoIcon.svg'
import presentationIcon from '../../assets/PresentationIcon.svg'
import iconTask from '../../assets/IconTask.svg'
import linkIcon from '../../assets/LinkIcon.svg'
import testIcon from '../../assets/TestIcon.svg'

const LessonCard = (props) => {
   const {
      navigateLink,
      navigateTest,
      navigateTask,
      navigatePresentation,
      navigateVideoLesson,
      title,
   } = props

   return (
      <CardBody>
         <CardHeader>
            <h2>{title}</h2>
         </CardHeader>
         <CardMain>
            <ContentLessonCard onClick={navigateVideoLesson}>
               <img src={lessonVideoIcon} alt="icon" />
               <TextLesson>Видеоурок</TextLesson>
            </ContentLessonCard>

            <ContentLessonCard onClick={navigatePresentation}>
               <img src={presentationIcon} alt="icon" />
               <TextLesson>Презентация</TextLesson>
            </ContentLessonCard>

            <ContentLessonCard onClick={navigateTask}>
               <img src={iconTask} alt="icon" />
               <TextLesson>Задание</TextLesson>
            </ContentLessonCard>

            <ContentLessonCard onClick={navigateLink}>
               <img src={linkIcon} alt="icon" />
               <TextLesson>Ссылка</TextLesson>
            </ContentLessonCard>

            <ContentLessonCard onClick={navigateTest}>
               <img src={testIcon} alt="icon" />
               <TextLesson>Тест</TextLesson>
            </ContentLessonCard>
         </CardMain>
      </CardBody>
   )
}
export default LessonCard

const CardBody = styled.div`
   background-color: #ffffff;
   width: 367px;
   border: 1px solid #d4d4d4;
   border-radius: 10px;
`
const CardHeader = styled.div`
   padding-left: 20px;
   display: flex;
   height: 80px;
   align-items: center;
   border-bottom: 0.5px solid #bfc4ce;
`

const CardMain = styled.div`
   margin: 10px 0px;
`
const ContentLessonCard = styled.div`
   display: flex;
   padding: 13px 22px;
   :hover {
      cursor: pointer;
      background: rgba(26, 35, 126, 0.07);
   }
`
const TextLesson = styled.p`
   margin: 0px 0px 0px 18px;
   font-style: normal;
   font-weight: 400;
   font-size: 16px;
   line-height: 22px;
   color: #000000;
`
