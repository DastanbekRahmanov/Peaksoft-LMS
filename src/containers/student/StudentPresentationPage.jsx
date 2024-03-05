import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import HeaderLayout from '../../components/UI/HeaderLoyout'
import { getPresentationById } from '../../store/slices/instructor-slices/materials/materials-actions'
import Wrapper from '../../components/UI/Wrapper'
import { VIEWER } from '../../utils/constants/constants'

const StudentPresentationPage = () => {
   const { presentationId } = useParams()
   const dispatch = useDispatch()
   const [dataPresentation, setDataPresentation] = useState({})

   useEffect(() => {
      dispatch(getPresentationById(presentationId))
         .unwrap()
         .then((result) => setDataPresentation(result))
   }, [])

   return (
      <Main>
         <HeaderLayout roles="Инструктор" />
         <Wrapper padding="20px 300px 20px 20px">
            <Embet
               src={VIEWER + dataPresentation.presentationLink}
               type="application/pdf"
               title="PeakSoft presentation viewer"
            />
            <Title>{dataPresentation.presentationName}</Title>
            <Text>{dataPresentation.description}</Text>
         </Wrapper>
      </Main>
   )
}

export default StudentPresentationPage

const Main = styled.div`
   padding: 0 10px;
   background-color: #eff0f4;
   width: 100%;
   overflow: auto;
`
const Embet = styled.embed`
   width: 792px;
   height: 464px;
   border-radius: 10px;
`
const Title = styled.h2`
   font-family: 'Open Sans', sans-serif;
   font-weight: 400;
   font-size: 20px;
   line-height: 27px;
   color: #000000;
   margin: 24px 0 16px 0;
`
const Text = styled.p`
   font-family: 'Open Sans';
   font-weight: 400;
   font-size: 15px;
   line-height: 24px;
   width: 792px;
`
