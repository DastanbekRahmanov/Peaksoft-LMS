import React from 'react'
import styled from 'styled-components'

function TextArea({ onChange, value, type, placeholder, id, ...props }) {
   return (
      <TextAreaContainer>
         <TextAreaIn
            id={id}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            {...props}
         />
      </TextAreaContainer>
   )
}

export default TextArea
const TextAreaContainer = styled.div`
   box-sizing: border-box;
   width: 491px;
   height: 123px;
   border: 1px solid #d4d4d4;
   border-radius: 10px;
`
const TextAreaIn = styled.textarea`
   width: 455px;
   height: 103px;
   font-family: 'Open Sans';
   font-style: normal;
   font-weight: 400;
   font-size: 16px;
   line-height: 22px;
   color: black;
   margin: 10px 18px;
   border: none;
   outline: none;
   resize: none;
   ::placeholder {
      color: #8d949e;
      font-size: 16px;
   }
`
