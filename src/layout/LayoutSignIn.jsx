import React from 'react'
import styled from 'styled-components'
import LogoSignIn from '../assets/LogoSignIn.svg'

function LayoutSignIn() {
   return (
      <Wrapper>
         <WrapperLogo>
            <Logo src={LogoSignIn} />
         </WrapperLogo>
      </Wrapper>
   )
}

export default LayoutSignIn

const Wrapper = styled.div`
   width: 1440px;
   background: #ffffff;
   display: flex;
`
const WrapperLogo = styled.div`
   width: 665px;
   height: 100vh;
   background: #3772ff;
   display: flex;
   justify-content: center;
   align-items: center;
`
const Logo = styled.img`
   width: 264px;
   height: 462px;
   /* margin: 273px 201px 285px 200px; */
`
