import styled from 'styled-components'
import SideBarHeader from '../components/UI/SideBarHeader'

const SidebarLayout = ({ children }) => {
   return (
      <MainSidebar>
         <BlockSide>
            <Fixed>
               <BlockHeader>
                  <BlockLinear />
                  <BlockTheme>PEAKSOFT</BlockTheme>
               </BlockHeader>
               <BlockItems>
                  <SideBarHeader />
               </BlockItems>
            </Fixed>
         </BlockSide>
         {children}
      </MainSidebar>
   )
}

export default SidebarLayout

const Fixed = styled.div`
   position: fixed;
`
const MainSidebar = styled.div`
   display: flex;
`
const BlockSide = styled.div`
   padding-right: 88px;
   padding-left: 90px;
   position: relative;
   width: 240px;
   height: 100vh;
   background: #fff;
   display: flex;
   align-items: center;
   flex-direction: column;
   gap: 40px;
`
const BlockHeader = styled.nav`
   position: relative;
   margin-top: 42px;
   display: flex;
   justify-content: center;
   align-items: flex-start;
   margin-bottom: 50px;
`

const BlockTheme = styled.h2`
   font-family: 'Poppins', sans-serif;
   font-weight: 700;
   font-size: 24px;
   line-height: 36px;
   color: #1f6ed4;
`
const BlockLinear = styled.div`
   background: linear-gradient(225deg, #fa2b56 0%, #f91c3d 100%);
   width: 10px;
   height: 10px;
   border-radius: 50%;
   position: relative;
   left: 147px;
   bottom: 5px;
`
const BlockItems = styled.div`
   display: flex;
   flex-direction: column;
   gap: 10px;
   cursor: pointer;
`
