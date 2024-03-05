import React from 'react'
import styled from 'styled-components'
import { useSearchParams } from 'react-router-dom'
import headerLogo from '../../assets/headerLogo.svg'
import arrowIcon from '../../assets/arrowIcon.svg'
import { CustomLink } from './CustomLink'
import { LogOutModal } from './LogoutModal'

const HeaderLoyout = ({ roles, links }) => {
   const [params, setParams] = useSearchParams()
   const { modalOpen } = Object.fromEntries(params)

   return (
      <>
         <Header>
            <div> </div>
            <Navigation>
               {links?.map((item) => (
                  <CustomLink key={item.name} to={item.path}>
                     {item.name}
                  </CustomLink>
               ))}
            </Navigation>
            <NavContainer onClick={() => setParams({ modalOpen: 'LOG-OUT' })}>
               <EllipseLogo>
                  <img src={headerLogo} alt="logo" />
               </EllipseLogo>
               <ProfileBlock>
                  <p>{roles}</p>
                  <img src={arrowIcon} alt="logo" />
               </ProfileBlock>
            </NavContainer>
         </Header>
         <LogOutModal
            open={modalOpen === 'LOG-OUT'}
            onClose={() => setParams({})}
         />
      </>
   )
}
export default HeaderLoyout

const Navigation = styled.nav`
   display: flex;
   align-items: center;
   justify-content: space-around;
   width: 254px;
`
const Header = styled.header`
   display: flex;
   justify-content: space-between;
   align-items: center;
   background: #eff0f4;
   width: 100%;
   height: 75px;
   border-bottom: 1px solid #c4c4c4;
`
const NavContainer = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-around;
   height: 46px;
   cursor: pointer;
`
const EllipseLogo = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   width: 30px;
   height: 30px;
   border-radius: 50%;
   background-color: #d9d9d9;
`
const ProfileBlock = styled.div`
   display: flex;
   align-items: center;
   padding-left: 8px;
   p {
      margin-right: 8px;
   }
`
