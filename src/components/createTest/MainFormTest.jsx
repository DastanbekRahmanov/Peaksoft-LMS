import React, { useState } from 'react'
import styled from 'styled-components'
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { ReactComponent as XIcon } from '../../assets/xIcon.svg'
import Checkbox from '../UI/CheckBox'
import UiInput from '../UI/UiInput'

const MainFormTest = ({ index, question, deleteVariantHandler }) => {
   const [getOneMore, setGetOneMore] = React.useState('Один из списка')
   const [getRadio, setGetRadio] = useState(null)

   const getVariantHandler = (event) => {
      setGetRadio(event.target.value)
   }
   const getOneOrMoreHandler = (event) => {
      setGetOneMore(event.target.value)
   }

   return (
      <>
         <MainForm>
            <Label id="demo-controlled-radio-buttons-group" htmlFor="my-input">
               <Num>{index + 1}</Num>
               <UiInput marginright="10px" width="659px" placeholder="Вопрос" />
            </Label>
            <FormControl>
               <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={getOneMore}
                  onChange={getOneOrMoreHandler}
               >
                  <Label id="controlled-radio-buttons-group" htmlFor="my-input">
                     <FormControlLabel
                        key={question.id}
                        value="Один из списка"
                        control={<Radio />}
                        label="Один из списка"
                     />
                     <FormControlLabel
                        key={question.id + 1}
                        value="Несколько из списков"
                        control={<Radio />}
                        label="Несколько из списков"
                     />
                  </Label>
               </RadioGroup>
            </FormControl>
         </MainForm>
         {question.data?.map(
            (variant, i) =>
               (getOneMore === 'Один из списка' && (
                  <FormControl>
                     <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={getRadio}
                        onChange={getVariantHandler}
                     >
                        <OptionLabel key={variant.id}>
                           <RadioVariant>
                              <FormControlLabel
                                 value={variant.id}
                                 control={<Radio />}
                              />
                           </RadioVariant>
                           <UiInput
                              key={variant.id + 3}
                              width="1064px"
                              placeholder={`Вариант ${i + 1}`}
                           />
                           <IconX
                              key={variant.id + 6}
                              onClick={() => deleteVariantHandler(variant.id)}
                           />
                        </OptionLabel>
                     </RadioGroup>
                  </FormControl>
               )) || (
                  <OptionLabel key={variant.id + 4} htmlFor="Variant">
                     <Checkbox
                        key={variant.id + 5}
                        value={i + 3}
                        setIsClicked={getVariantHandler}
                     />
                     <UiInput
                        key={variant.id + 6}
                        width="1064px"
                        placeholder={`Вариант ${i + 1}`}
                     />
                     <IconX
                        key={variant.id + 8}
                        onClick={() => deleteVariantHandler(variant.id)}
                     />
                  </OptionLabel>
               )
         )}
      </>
   )
}

export default MainFormTest

const RadioVariant = styled.div`
   margin-right: 12px;
   margin-left: 10px;
   width: 20px;
   border-radius: 50%;
`
const Num = styled.p`
   color: #1f6ed4;
   font-size: 20px;
   margin-right: 18px;
   margin-left: 15px;
`

const IconX = styled(XIcon)`
   position: relative;
   cursor: pointer;
   :hover {
      background-color: #e6e3e3;
      border-radius: 4px;
   }
`
const OptionLabel = styled.label`
   display: flex;
   width: 1100px;
   margin-top: 24px;
   align-items: center;
`
const Label = styled.label`
   display: flex;
   align-items: center;
`
const MainForm = styled.div`
   display: flex;
   justify-content: space-between;
   /* width: 1170px; */
`
