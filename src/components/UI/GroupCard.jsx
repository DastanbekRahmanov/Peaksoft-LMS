import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import styled from 'styled-components'

function GroupCard({
   someImage,
   someName,
   someYear,
   someParagraph,
   someButton,
   onClick,
}) {
   return (
      <CardGroup>
         <CardAction>
            <CardImg
               onClick={onClick}
               component="img"
               image={someImage}
               alt="img"
            />
            <CardContent>
               <TypographyYear>
                  <TypographyName
                     onClick={onClick}
                     gutterBottom
                     variant="h5"
                     component="div"
                  >
                     {someName}
                  </TypographyName>
                  <Year onClick={onClick}>{someYear}</Year>
               </TypographyYear>
               <TypographyParagraph
                  onClick={onClick}
                  variant="body2"
                  color="text.secondary"
               >
                  {someParagraph}
               </TypographyParagraph>
               <HorizonIcon>{someButton}</HorizonIcon>
            </CardContent>
         </CardAction>
      </CardGroup>
   )
}

export default GroupCard
const CardGroup = styled(Card)`
   &:hover {
      box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.5);
   }
   &.MuiPaper-root {
      box-sizing: border-box;
      width: 270px;
      height: 311px;
      background: #ffffff;
      border: 1px solid #d4d4d4;
      border-radius: 10px;
   }
`
const CardAction = styled(CardActionArea)`
   display: flex;
   flex-direction: column;
   height: 311px;
`
const CardImg = styled(CardMedia)`
   &.MuiCardMedia-root {
      height: 171px;
      text-align: center;
   }
`
const TypographyYear = styled.div`
   display: flex;
   width: 238px;
   justify-content: space-between;
   align-items: center;
`
const Year = styled.h3`
   width: 74px;
   height: 12px;
   font-style: normal;
   font-weight: 400;
   font-size: 12px;
   color: #1d293f;
`
const TypographyName = styled(Typography)`
   &.MuiTypography-root {
      font-family: 'Open Sans';
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 25px;
      color: #1d293f;
   }
   width: 136px;
   height: 24px;
   white-space: wrap;
   overflow: hidden;
   text-overflow: ellipsis;
   -webkit-line-clamp: 1;
   display: -webkit-box;
   -webkit-box-orient: vertical;
`
const HorizonIcon = styled.div`
   display: flex;
   justify-content: end;
`
const TypographyParagraph = styled(Typography)`
   &.MuiTypography-root {
      font-weight: 400;
      font-size: 16px;
      line-height: 21px;
      color: #1d293f;
   }
   height: 66px;
   text-overflow: ellipsis;
   overflow: hidden;
   -webkit-line-clamp: 3;
   display: -webkit-box;
   -webkit-box-orient: vertical;
`
