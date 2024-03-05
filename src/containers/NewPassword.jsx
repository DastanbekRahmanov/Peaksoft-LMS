import React from 'react'
import styled from 'styled-components'
import LogoSignIn from '../assets/LogoSignIn.svg'
import NewPass from '../components/signIn/NewPass'

function NewPassword() {
   return (
      <Wrapper>
         <WrapperLogo>
            <Logo src={LogoSignIn} />
         </WrapperLogo>
         <WrapperSignIn>
            <NewPass />
         </WrapperSignIn>
      </Wrapper>
   )
}

export default NewPassword

const WrapperSignIn = styled.div``
const Wrapper = styled.div`
   background: #ffffff;
   display: flex;
   align-items: center;
   justify-content: center;
`
const WrapperLogo = styled.div`
   width: 720px;
   height: 100vh;
   background: #3772ff;
   display: flex;
   justify-content: center;
   align-items: center;
`
const Logo = styled.img`
   width: 264px;
   height: 462px;
`
