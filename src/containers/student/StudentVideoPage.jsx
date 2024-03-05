import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getVideoById } from '../../store/slices/instructor-slices/materials/materials-actions'
import HeaderLayout from '../../components/UI/HeaderLoyout'
import Wrapper from '../../components/UI/Wrapper'
import { getYoutubeThumbnail } from '../../utils/helpers/helper'

const StudentVideoPage = () => {
   const { videoId } = useParams()
   const dispatch = useDispatch()
   const [videoData, setVideoData] = useState({})

   useEffect(() => {
      dispatch(getVideoById(videoId))
         .unwrap()
         .then((result) => setVideoData(result))
   }, [])

   return (
      <Main>
         <HeaderLayout roles="Инструктор" />
         <Wrapper padding="20px 300px 20px 20px">
            <Iframe
               width="792px"
               height="464px"
               src={getYoutubeThumbnail(videoData.link)}
               title="PeakSoft video player"
               frameborder="0"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
               allowfullscreen
            />

            <Title>{videoData.videoName}</Title>
            <Text>{videoData.description}</Text>
         </Wrapper>
      </Main>
   )
}

export default StudentVideoPage

const Main = styled.div`
   padding: 0 10px;
   background-color: #eff0f4;
   width: 100%;
   overflow: auto;
`
const Iframe = styled.iframe`
   border-radius: 10px;
   border: none;
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
