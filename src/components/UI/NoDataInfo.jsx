import React from 'react'
import styled from 'styled-components'

export const NoDataInfo = ({ title }) => {
   return (
      <NoDataBlock>
         <h4>{title}</h4>
         <h5>¯\_(ツ)_/¯</h5>
      </NoDataBlock>
   )
}

const NoDataBlock = styled.div`
   text-align: center;
   display: flex;
   flex-direction: column;
`
