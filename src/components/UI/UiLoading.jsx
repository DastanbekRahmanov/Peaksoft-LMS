import React from 'react'
import styled from 'styled-components'
import FadeLoader from 'react-spinners/FadeLoader'

export const UiLoading = () => {
   return (
      <LoadingBlock>
         <FadeLoader size={200} color="#3772FF" />
      </LoadingBlock>
   )
}

const LoadingBlock = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
`
