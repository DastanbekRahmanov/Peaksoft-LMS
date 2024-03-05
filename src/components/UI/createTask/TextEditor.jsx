import React from 'react'
import { EditorContent } from '@tiptap/react'
import { BsTypeUnderline } from 'react-icons/bs'
import { RiItalic, RiBold } from 'react-icons/ri'
import { AiOutlineUnorderedList, AiOutlineOrderedList } from 'react-icons/ai'
import styled from 'styled-components'
import { Tooltip } from '@mui/material'
import { ReactComponent as Heading } from '../../../assets/Aa.svg'
import TextImage from '../../../assets/Text.svg'

const MenuBar = ({ editor }) => {
   if (!editor) {
      return null
   }

   return (
      <Container>
         <Tooltip title="Заголовок" placement="top">
            <button
               onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
               }
               className={
                  editor.isActive('heading', { level: 3 }) ? 'is-active' : ''
               }
            >
               <Heading />
            </button>
         </Tooltip>
         <Tooltip title="Курсив" placement="top">
            <button
               onClick={() => editor.chain().focus().toggleItalic().run()}
               disabled={!editor.can().chain().focus().toggleItalic().run()}
               className={editor.isActive('italic') ? 'is-active' : ''}
            >
               <RiItalic />
            </button>
         </Tooltip>
         <Tooltip title="Подчеркнутый текст" placement="top">
            <button
               onClick={() => editor.chain().focus().toggleUnderline().run()}
               className={editor.isActive('underline') ? 'is-active' : ''}
            >
               <BsTypeUnderline />
            </button>
         </Tooltip>
         <Tooltip title="Жирный текст" placement="top">
            <button
               onClick={() => editor.chain().focus().toggleBold().run()}
               disabled={!editor.can().chain().focus().toggleBold().run()}
               className={editor.isActive('bold') ? 'is-active' : ''}
            >
               <RiBold />
            </button>
         </Tooltip>
         <Tooltip title="Маркированный список" placement="top">
            <button
               onClick={() => editor.chain().focus().toggleBulletList().run()}
               className={editor.isActive('bulletList') ? 'is-active' : ''}
            >
               <AiOutlineUnorderedList />
            </button>
         </Tooltip>
         <Tooltip title="Нумерованный список" placement="top">
            <button
               onClick={() => editor.chain().focus().toggleOrderedList().run()}
               className={editor.isActive('orderedList') ? 'is-active' : ''}
            >
               <AiOutlineOrderedList />
            </button>
         </Tooltip>
      </Container>
   )
}

const TextEditor = ({ editor }) => {
   // console.log(text, 'texxxt')
   return (
      <div>
         <MenuBar editor={editor} />
         <ContainerDiv>
            <img src={TextImage} alt="TextImage" />
            <Text editor={editor} />
         </ContainerDiv>
      </div>
   )
}

export default TextEditor

const Container = styled.div`
   width: 298px;
   height: 44px;
   margin-bottom: 9px;
   margin-left: 52px;
   display: flex;
   align-items: flex-end;
   background: #ffffff;
   border-radius: 10px;
   button {
      font-size: 22px;
      width: 34px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: none;
      margin-left: 10px;
   }
   button:hover {
      background: #d4d4d4;
      border-radius: 6px;
   }
`
const Text = styled(EditorContent)`
   width: 1030px;
   border: 1px solid #d4d4d4;
   border-radius: 10px;
   :hover {
      border: 1px solid black;
   }
   p {
      margin: 0;
      font-size: 16px;
   }
   .ProseMirror {
      width: 660px;
      margin: 10px 557px 10px 28px;
      display: flex;
      justify-content: start;
   }
   .ProseMirror-focused {
      outline: none;
   }
`
const ContainerDiv = styled.div`
   display: flex;
   img {
      margin: 0 15px 0 23px;
   }
`
