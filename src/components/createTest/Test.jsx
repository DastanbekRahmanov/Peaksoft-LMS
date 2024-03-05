/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import styled from 'styled-components'
import MainFormTest from './MainFormTest'
import Wrapper from '../UI/Wrapper'
import { ReactComponent as CopyIcon } from '../../assets/basket.svg'
import { ReactComponent as DeleteIcon } from '../../assets/copy.svg'
import { ReactComponent as PlusIcon } from '../../assets/Plus.svg'
import UiInput from '../UI/UiInput'
import UIButton from '../UI/UIButton'
import IconButton from '../UI/IconButton'

const Test = () => {
   const [newTest, setNewTest] = useState([])

   const deleteTestHandler = (id) => {
      const filteredDelete = newTest.filter((item) => item.id !== id)
      setNewTest(filteredDelete)
   }
   const deleteVariantHandler = (itemId) => {
      setNewTest(
         newTest.map((item) => ({
            ...item,
            data: item.data.filter((tag) => tag.id !== itemId),
         }))
      )
   }
   const otmenaTestHandler = (product) => {
      setNewTest(
         newTest.filter((productItem) => productItem.id.id !== product.id)
      )
   }
   const newTestHandler = () => {
      setNewTest([...newTest, { id: Math.random().toString(), data: [] }])
   }

   const addVariantHandler = (i) => {
      const changeTest = [...newTest]
      changeTest[i].data = [
         ...changeTest[i].data,
         { id: Math.random().toString() },
      ]
      setNewTest(changeTest)
   }

   return (
      <Container>
         <Form>
            <Wrapper margin="24px 0px 20px 0px" width="1140px" height="124px">
               <TestName>Название теста</TestName>
               <UiInput
                  margin="20px"
                  width="1100px"
                  placeholder="Введите название теста"
               />
            </Wrapper>
            {newTest.map((question, index) => {
               return (
                  <Wrapper
                     key={question.id}
                     id={index + 1}
                     padding="20px"
                     margin="0px 0px 20px 0px "
                     width="1140px"
                  >
                     <MainFormTest
                        question={question}
                        index={index}
                        deleteVariantHandler={deleteVariantHandler}
                     />

                     <BottomBlock>
                        <p>
                           <ButtonAddOption
                              onClick={() => addVariantHandler(index)}
                           >
                              Добавить вариант
                           </ButtonAddOption>
                        </p>
                        <IconBlock>
                           <IconCopy />
                           <IconDelete
                              onClick={() => deleteTestHandler(question.id)}
                           />
                        </IconBlock>
                     </BottomBlock>
                  </Wrapper>
               )
            })}
            <ContainerUIbutton>
               <SaveButton variant="contained" width="125px" height="40px">
                  Сохранить
               </SaveButton>
               <UIButton
                  marginright="10px"
                  onClick={otmenaTestHandler}
                  variant="outlined"
                  width="103px"
                  height="40px"
               >
                  Отмена
               </UIButton>
            </ContainerUIbutton>
         </Form>
         <ContainerIconButton>
            <IconButton onclick={() => newTestHandler()} background=" #FA2B56 ">
               <PlusIcon />
            </IconButton>
         </ContainerIconButton>
      </Container>
   )
}

export default Test

const Form = styled.form`
   width: 1140px;
`
const IconDelete = styled(DeleteIcon)`
   :hover {
      background-color: #e6e3e3;
      border-radius: 4px;
   }
   cursor: pointer;
`
const IconCopy = styled(CopyIcon)`
   cursor: pointer;
   :hover {
      background-color: #e6e3e3;
      border-radius: 4px;
   }
`
const Container = styled.div`
   /* margin: 0 30px 0 20px; */
   background-color: #eff0f4;
`
const TestName = styled.h3`
   color: #1f6ed4;
   margin: 20px 0px 0px 20px;
`

const BottomBlock = styled.div`
   display: flex;
   justify-content: space-between;
   margin: 24px 10px 0px 40px;
`
const ButtonAddOption = styled.span`
   cursor: pointer;
   margin-right: 3px;
   color: #7a7a7a;
`
const IconBlock = styled.div`
   display: flex;
   justify-content: space-between;
   float: right;
   width: 60px;
`
const ContainerUIbutton = styled.div`
   display: flex;
   flex-direction: row-reverse;
   margin-right: 10px;
   /* width: 1140px;  */
`
const ContainerIconButton = styled.div`
   float: right;
   margin: 160px 31px 0 0;
`
const SaveButton = styled(UIButton)``
