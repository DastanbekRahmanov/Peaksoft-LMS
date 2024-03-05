import React from 'react'
import styled from 'styled-components'

import lessonVideoIcon from '../../assets/LessonVideoIcon.svg'
import presentationIcon from '../../assets/PresentationIcon.svg'
import iconTask from '../../assets/IconTask.svg'
import linkIcon from '../../assets/LinkIcon.svg'
import testIcon from '../../assets/TestIcon.svg'
import EditLesson from '../../assets/editItem.svg'
import DeleteItem from '../../assets/deleteItem.svg'

const MaterialsLessonCard = (props) => {
   const {
      title,
      headerIcon,
      actionIcon,
      actionButton,
      deleteHandler,
      editHandler,
      editPresentation,
      deletePresentation,
      deleteVideo,
      editVideo,
      editLink,
      deleteLink,
      navigateHandler,
      lessonId,
      videoId,
      presentationId,
   } = props
   return (
      <CardMain>
         <CardHeader>
            <HeaderLeft>
               {headerIcon && (
                  <p onClick={editHandler}>
                     <HeaderIcon src={headerIcon} alt="icon" />
                  </p>
               )}

               <h2>{title}</h2>
            </HeaderLeft>
            <HeaderRight>
               {actionButton}
               {actionIcon && (
                  <p onClick={deleteHandler}>
                     <ActionIcon src={actionIcon} alt="icon" />
                  </p>
               )}
            </HeaderRight>
         </CardHeader>
         <ContentLessonCard>
            <TextBlock onClick={() => navigateHandler('Видеоурок', videoId)}>
               <img src={lessonVideoIcon} alt="icon" />
               <TextLesson>Видеоурок</TextLesson>
            </TextBlock>
            <ButtonBlock>
               <CustomButton onClick={editVideo} variant="contained">
                  <img src={EditLesson} alt="edit" />
                  <p>Редактировать</p>
               </CustomButton>

               <CustomButton onClick={deleteVideo} variant="contained">
                  <img src={DeleteItem} alt="delete" />
                  <p>Удалить</p>
               </CustomButton>
            </ButtonBlock>
         </ContentLessonCard>

         <ContentLessonCard>
            <TextBlock
               onClick={() => navigateHandler('Презентация', presentationId)}
            >
               <img src={presentationIcon} alt="icon" />
               <TextLesson>Презентация</TextLesson>
            </TextBlock>
            <ButtonBlock>
               <CustomButton onClick={editPresentation} variant="contained">
                  <img src={EditLesson} alt="edit" />
                  <p>Редактировать</p>
               </CustomButton>

               <CustomButton onClick={deletePresentation} variant="contained">
                  <img src={DeleteItem} alt="delete" />
                  <p>Удалить</p>
               </CustomButton>
            </ButtonBlock>
         </ContentLessonCard>

         <ContentLessonCard>
            <TextBlock onClick={() => navigateHandler('Задание', lessonId)}>
               <img src={iconTask} alt="icon" />
               <TextLesson>Задание</TextLesson>
            </TextBlock>
            <ButtonBlock>
               <CustomButton variant="contained">
                  <img src={EditLesson} alt="edit" />
                  <p>Редактировать</p>
               </CustomButton>

               <CustomButton variant="contained">
                  <img src={DeleteItem} alt="delete" />
                  <p>Удалить</p>
               </CustomButton>
            </ButtonBlock>
         </ContentLessonCard>

         <ContentLessonCard>
            <TextBlock onClick={() => navigateHandler('Ссылка', lessonId)}>
               <img src={linkIcon} alt="icon" />
               <TextLesson>Ссылка</TextLesson>
            </TextBlock>
            <ButtonBlock>
               <CustomButton onClick={editLink} variant="contained">
                  <img src={EditLesson} alt="edit" />
                  <p>Редактировать</p>
               </CustomButton>

               <CustomButton onClick={deleteLink} variant="contained">
                  <img src={DeleteItem} alt="delete" />
                  <p>Удалить</p>
               </CustomButton>
            </ButtonBlock>
         </ContentLessonCard>

         <ContentLessonCard>
            <TextBlock onClick={() => navigateHandler('Тест', lessonId)}>
               <img src={testIcon} alt="icon" />
               <TextLesson>Тест</TextLesson>
            </TextBlock>

            <ButtonBlock>
               <CustomButton variant="contained">
                  <img src={EditLesson} alt="edit" />
                  <p>Редактировать</p>
               </CustomButton>

               <CustomButton variant="contained">
                  <img src={DeleteItem} alt="delete" />
                  <p>Удалить</p>
               </CustomButton>
            </ButtonBlock>
         </ContentLessonCard>
      </CardMain>
   )
}
export default MaterialsLessonCard

const CardMain = styled.div`
   width: 560px;
   border: 1px solid #d4d4d4;
   border-radius: 10px;
   background-color: #fff;
`
const CardHeader = styled.div`
   justify-content: space-between;
   display: flex;
   height: 80px;
   align-items: center;
   border-bottom: 0.5px solid #bfc4ce;
`
const HeaderLeft = styled.div`
   display: flex;
   align-items: center;
   margin-left: 20px;
`
const HeaderRight = styled.div`
   display: flex;
   align-items: center;
   margin-right: 27px;
`

const ButtonBlock = styled.div`
   display: flex;
`

const CustomButton = styled.button`
   color: #000;
   border-radius: 6px;
   background: #eff0f6;
   border: 0px solid;
   display: flex;
   padding: 8px 6px;
   transition: all 0.2s;
   cursor: pointer;

   p {
      margin-left: 10px;
   }
   :hover {
      background: #d4d4d4;
   }
`
const TextBlock = styled.div`
   display: flex;
   align-items: center;
   cursor: pointer;
`

const ContentLessonCard = styled.div`
   display: flex;
   justify-content: space-between;
   padding: 13px 22px;
   transition: all 0.2s;

   ${ButtonBlock} {
      display: none;
   }

   :hover {
      background: rgba(26, 35, 126, 0.07);
      ${ButtonBlock} {
         display: flex;
         align-items: center;
         height: 23px;

         button {
            margin-left: 20px;
         }
      }
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
const ActionIcon = styled.img`
   margin-left: 30px;
   cursor: pointer;
`
const HeaderIcon = styled.img`
   margin-right: 17px;
   cursor: pointer;
`
