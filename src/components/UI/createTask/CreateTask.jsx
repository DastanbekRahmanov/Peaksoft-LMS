import React, { useCallback, useState, useRef } from 'react'
import { useDropzone } from 'react-dropzone'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import styled from 'styled-components'
import { Tooltip } from '@mui/material'
import UiInput from '../UiInput'
import TextImage from '../../../assets/Text.svg'
import { ReactComponent as ListImage } from '../../../assets/List.svg'
import LinkImage from '../../../assets/Export.svg'
import CodeImage from '../../../assets/Export2.svg'
import DeleteImage from '../../../assets/Delete.svg'
import UIButton from '../UIButton'
import TextEditor from './TextEditor'
import { ReactComponent as Gallery } from '../../../assets/Gallery.svg'
import ModalWindow from '../ModalWindow'

const CreateTask = ({ getDataHandler }) => {
   const editor = useEditor({
      extensions: [StarterKit, Underline],
      content: ` `,
   })
   const textEditorVakue = editor?.getText()

   const [images, setImages] = useState([])

   const [values, setValue] = useState({
      text: '',
      link: '',
   })

   const [stateItems, setStateItems] = useState({
      showTextEditor: false,
      showImage: false,
      showCode: false,
      showModal: false,
      showModalImage: false,
      showModalLink: false,
      showModalLinkDelete: false,
      selectedFile: null,
      valueNameTask: '',
      valueCode: '',
   })

   const onSendingData = () => {
      getDataHandler({
         nameTask: stateItems.valueNameTask,
         textEditor: textEditorVakue,
         file: stateItems.selectedFile,
         link: data,
         image: images,
         code: stateItems.valueCode,
      })
   }
   const [data, setData] = useState([])

   const filePicker = useRef(null)

   const handleChange = (event) => {
      setStateItems({ ...stateItems, selectedFile: event.target.files[0] })
   }

   const handlePick = () => {
      filePicker.current.click()
   }

   const openImageHandler = () => {
      open(setStateItems({ ...stateItems, showImage: !stateItems.showImage }))
   }

   const openLinkModal = () => {
      setStateItems({ ...stateItems, showModalLink: !stateItems.showModalLink })
   }
   const openModalDelete = () => {
      setStateItems({ ...stateItems, showModal: !stateItems.showModal })
   }
   const openModalLinkDelete = () => {
      setStateItems({
         ...stateItems,
         showModalLinkDelete: !stateItems.showModalLinkDelete,
      })
   }
   const openModalDeleteImage = () => {
      setStateItems({
         ...stateItems,
         showModalImage: !stateItems.showModalImage,
      })
   }
   const closeModalLink = () => {
      setStateItems({ ...stateItems, showModalLink: !stateItems.showModalLink })
   }
   const closeModal = () => {
      setStateItems({
         ...stateItems,
         showModalImage: !stateItems.showModalImage,
      })
   }

   const closeModalImage = () => {
      setStateItems({ ...stateItems, showModal: !stateItems.showModal })
   }
   const closeModalLinkDelete = () => {
      setStateItems({
         ...stateItems,
         showModalLinkDelete: !stateItems.showModalLinkDelete,
      })
   }
   const deleteFileInModal = () => {
      setStateItems({ ...stateItems, selectedFile: null, showModal: false })
   }
   const deleteModalLink = (text) => {
      setStateItems({
         ...stateItems,
         showModalLinkDelete: false,
      })
      const deletedLink = data.filter((item) => item.text !== text)
      setData(deletedLink)
   }
   const deleteImageModal = () => {
      setStateItems({ ...stateItems, showImage: null, showModalImage: false })
   }
   const onDrop = useCallback((acceptedFiles) => {
      acceptedFiles.forEach((file) => {
         const reader = new FileReader()
         reader.onload = () => {
            setImages((prevState) => [...prevState, reader.result])
         }
         reader.readAsDataURL(file)
      })
      setImages([])
   }, [])

   const getValueNameTask = (e) => {
      setStateItems({
         ...stateItems,
         valueNameTask: e.target.value,
      })
   }

   const getValueCode = (e) => {
      setStateItems({
         ...stateItems,
         valueCode: e.target.value,
      })
   }

   const getValueText = (e) => {
      setValue({ ...values, text: e.target.value })
   }
   const getValueLink = (e) => {
      setValue({ ...values, link: e.target.value })
   }

   const sendingData = () => {
      setData([...data, values])
      setStateItems({ ...stateItems, showModalLink: null })
   }
   const { getRootProps, isDragActive, open } = useDropzone({
      onDrop,
      maxFiles: 1,
      accept: {
         'image/jpeg': [],
         'image/png': [],
         'image/JPG': [],
      },
   })
   return (
      <Container>
         <h1>Создать задание</h1>

         <TopBox>
            <UiInput
               onChange={getValueNameTask}
               width="842px"
               placeholder="название задания"
            />
            <ImgTopBox>
               <Tooltip title="Текстовое поле" placement="top">
                  <ImageBackground>
                     <p
                        onClick={() =>
                           setStateItems({
                              ...stateItems,
                              showTextEditor: !stateItems.showTextEditor,
                           })
                        }
                     >
                        <TextImg src={TextImage} alt="TextImage" />
                     </p>
                  </ImageBackground>
               </Tooltip>
               <Tooltip title="Прикрепить файл" placement="top">
                  <ImageBackground>
                     <ListImage onClick={handlePick} />
                  </ImageBackground>
               </Tooltip>
               <Tooltip title="Добавить картинку" placement="top">
                  <ImageBackground>
                     <Gallery onClick={openImageHandler} />
                  </ImageBackground>
               </Tooltip>
               <Tooltip title="Вставить ссылку" placement="top">
                  <ImageBackground>
                     <LinkImg
                        onClick={openLinkModal}
                        src={LinkImage}
                        alt="ExportImage"
                     />
                  </ImageBackground>
               </Tooltip>

               {stateItems.showModalLink && (
                  <ModalWindow
                     open={stateItems.showModalLink}
                     handleClose={closeModalLink}
                     modalTitle="Добавить ссылку"
                     footerContent={
                        <>
                           <InputContainer>
                              <UiInput
                                 width="491px"
                                 placeholder="отображаемый текст"
                                 onChange={getValueText}
                                 value={values.text}
                              />
                              <UiInput
                                 width="491px"
                                 placeholder="вставьте ссылку"
                                 onChange={getValueLink}
                                 value={values.link}
                              />
                           </InputContainer>
                           <BoxButton>
                              <UIButton
                                 onClick={closeModalLink}
                                 variant="outlined"
                              >
                                 Отмена
                              </UIButton>
                              <UIButton
                                 variant="contained"
                                 onClick={sendingData}
                              >
                                 Добавить
                              </UIButton>
                           </BoxButton>
                        </>
                     }
                  />
               )}
               <Tooltip title="Код" placement="top">
                  <ImageBackground>
                     <CodeImg
                        onClick={() =>
                           setStateItems({
                              ...stateItems,
                              showCode: !stateItems.showCode,
                           })
                        }
                        src={CodeImage}
                        alt="CodeImage"
                     />
                  </ImageBackground>
               </Tooltip>
            </ImgTopBox>
         </TopBox>

         <BottomBox>
            {stateItems.showTextEditor && <TextEditor editor={editor} />}
            <input
               className="hidden"
               type="file"
               ref={filePicker}
               onChange={handleChange}
               multiple
            />

            {stateItems.selectedFile && (
               <ListBox>
                  <ListImage />
                  <a href={stateItems.selectedFile}>
                     {stateItems.selectedFile.name}
                  </a>
                  <Deleteimage onClick={openModalDelete}>
                     <img src={DeleteImage} alt="DeleteImage" />
                  </Deleteimage>
               </ListBox>
            )}

            {stateItems.showModal && (
               <ModalWindow
                  open={stateItems.showModal}
                  handleClose={closeModalImage}
                  modalTitle="Вы уверены что хотите удалить этот элемент?"
                  footerContent={
                     <ModalButton>
                        <UIButton onClick={closeModalImage} variant="outlined">
                           Отмена
                        </UIButton>
                        <UIButton
                           onClick={deleteFileInModal}
                           variant="contained"
                           background="#C91E1E"
                           hover="#B62727"
                           active="#E13A3A"
                        >
                           Удалить
                        </UIButton>
                     </ModalButton>
                  }
               />
            )}

            {data.map((item) => (
               <>
                  <LinkBox>
                     <LinkImg src={LinkImage} alt="ExportImage" />
                     <a href={item.link}>{item.text}</a>
                     <Deleteimage onClick={openModalLinkDelete}>
                        <img src={DeleteImage} alt="DeleteImage" />
                     </Deleteimage>
                  </LinkBox>
                  {stateItems.showModalLinkDelete && (
                     <ModalWindow
                        open={open}
                        handleClose={closeModalLinkDelete}
                        modalTitle="Вы уверены что хотите удалить этот элемент?"
                        footerContent={
                           <ModalButton>
                              <UIButton
                                 onClick={closeModalLinkDelete}
                                 variant="outlined"
                              >
                                 Отмена
                              </UIButton>
                              <UIButton
                                 onClick={() => deleteModalLink(item.text)}
                                 variant="contained"
                                 background="#C91E1E"
                                 hover="#B62727"
                                 active="#E13A3A"
                              >
                                 Удалить
                              </UIButton>
                           </ModalButton>
                        }
                     />
                  )}
               </>
            ))}

            {stateItems.showImage && (
               <UploadImage>
                  <div {...getRootProps()}>
                     {images.length === 0 ? (
                        <StyledImagePickerTittle>
                           {isDragActive}
                        </StyledImagePickerTittle>
                     ) : (
                        <StyledImagePicker src={images} />
                     )}
                  </div>
                  <DeleteButton onClick={openModalDeleteImage}>
                     Удалить
                  </DeleteButton>
               </UploadImage>
            )}

            {stateItems.showModalImage && (
               <ModalWindow
                  open={open}
                  handleClose={closeModal}
                  modalTitle="Вы уверены что хотите удалить этот элемент?"
                  footerContent={
                     <ModalButton>
                        <UIButton onClick={closeModal} variant="outlined">
                           Отмена
                        </UIButton>
                        <UIButton
                           onClick={deleteImageModal}
                           variant="contained"
                           background="#C91E1E"
                           hover="#B62727"
                           active="#E13A3A"
                        >
                           Удалить
                        </UIButton>
                     </ModalButton>
                  }
               />
            )}

            {stateItems.showCode && (
               <InputBox>
                  <CodeImg src={CodeImage} alt="CodeImage" />
                  <UiInput onChange={getValueCode} placeholder="Вставьте код" />
               </InputBox>
            )}
         </BottomBox>

         <ButtonBox>
            <UIButton
               borderradius="8px"
               fontSize="14px"
               hover=" rgba(29, 96, 255, 0.1)"
               active=" rgba(97, 144, 255, 0.3)"
               variant="outlined"
            >
               Отмена
            </UIButton>
            <UIButton
               borderradius="8px"
               fontSize="14px"
               variant="contained"
               onClick={onSendingData}
            >
               Сохранить
            </UIButton>
         </ButtonBox>
      </Container>
   )
}

export default CreateTask
const Container = styled.div`
   box-sizing: border-box;
   width: 1140px;
   height: auto;
   margin: 0 auto;
   border-radius: 10px;
   background: #fbfbfb;
   border: 1px solid #d4d4d4;
   h1 {
      font-weight: 600;
      font-size: 18px;
      line-height: 22px;
      margin: 20px 0 18px 20px;
      color: #1f6ed4;
      font-style: normal;
   }
`
const Deleteimage = styled.div`
   display: flex;
   align-items: center;
   padding-left: 3.08px;
   :hover {
      background: #c4c4c4;
      border-radius: 3px;
      width: 26px;
      height: 28.74px;
   }
`
const TopBox = styled.div`
   display: flex;
   margin-left: 20px;
   input {
      width: 842px;
   }
`
const ImgTopBox = styled.div`
   display: flex;
   justify-content: space-between;
   width: 225px;
   margin-top: 9px;
   margin-left: 29px;
   margin-right: 34px;
   p {
      padding-top: 5px;
   }
`
const ImageBackground = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   width: 34px;
   height: 28px;
   :hover {
      text-align: center;
      background: #d4d4d4;
      border-radius: 6px;
   }
`
const InputBox = styled.div`
   display: flex;
   align-items: center;
   margin: 38px 38px 27px 0;
   input {
      width: 1000px;
   }
   img {
      margin: 0 10px 0 18px;
   }
`
const DeleteButton = styled.button`
   position: absolute;
   cursor: pointer;
   width: 125px;
   height: 42px;
   border-radius: 8px;
   padding: 10px 24px;
   font-weight: 600;
   font-size: 18px;
   line-height: 22px;
   background-color: #c91e1e;
   transition: 0.7s;
   color: white;
   border: none;
   display: none;
   :hover {
      background-color: #b62727;
   }
   :active {
      background-color: #e13a3a;
   }
`
const UploadImage = styled.div`
   display: flex;
   align-items: center;
   background-size: cover;
   justify-content: center;
   background-repeat: no-repeat;
   margin-right: 270px;
   border-radius: 10px;
   background-image: url(${(p) => p.bcgImage});
   &:hover ${DeleteButton} {
      transition: 0.6s;
      display: block;
      filter: none;
   }
   :hover {
      filter: brightness(80%);
   }
`
const ButtonBox = styled.div`
   display: flex;
   justify-content: flex-end;
   margin: 17px 20px 22px 0;
   gap: 10px;
`
const TextImg = styled.img`
   width: 14px;
   height: 17px;
`
const LinkImg = styled.img`
   width: 23px;
   height: 16px;
`
const CodeImg = styled.img`
   width: 24px;
   height: 18px;
`
const StyledImagePickerTittle = styled.span`
   font-size: 18px;
   font-weight: bold;
`
const StyledImagePicker = styled.img`
   width: 792px;
   height: 464px;
   border-radius: 10px;
   object-fit: cover;
`
const BottomBox = styled.div`
   width: 1100px;
   height: auto;
   border-radius: 10px;
   margin: 23px 20px 17px 20px;
   background: #ffffff;
   border: 1px solid #d4d4d4;
`
const ListBox = styled.div`
   height: 24px;
   width: auto;
   display: flex;
   align-items: center;
   margin: 0px 0 25px 18px;
   p {
      padding: 0 8px;
   }
   a {
      margin: 0 13px;
   }
`
const LinkBox = styled.div`
   height: 24px;
   width: auto;
   display: flex;
   align-items: center;
   margin: 0px 0 25px 18px;
   p {
      padding: 0 8px;
   }
   a {
      margin: 0 13px;
   }
`
const ModalButton = styled.div`
   button {
      margin: 10px;
      width: 120px;
      border-radius: 6px;
   }
`
const InputContainer = styled.div`
   display: flex;
   flex-direction: column;
   div {
      margin: 6px 13px;
   }
`
const BoxButton = styled.div`
   display: flex;
   justify-content: end;
   margin-right: 20px;
   button {
      width: 117px;
      border-radius: 8px;
      margin: 15px 5px;
   }
`
