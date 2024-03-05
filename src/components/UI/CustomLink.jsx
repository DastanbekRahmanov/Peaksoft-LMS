import { Link, useMatch } from 'react-router-dom'
import styled from 'styled-components'

export const CustomLink = ({ children, to }) => {
   const match = useMatch(to)
   const active = {
      color: '#3772ff',
      borderBottom: '5px solid #3772ff',
   }
   return (
      <MyLink to={to} style={match && active}>
         {children}
      </MyLink>
   )
}
const MyLink = styled(Link)`
   color: #000000;
   padding: 25px;
   text-decoration: none;
`
