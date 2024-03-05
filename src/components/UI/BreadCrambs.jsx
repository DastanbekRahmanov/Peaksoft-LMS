import React from 'react'
import { Breadcrumbs, Typography } from '@mui/material'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const BreadCrumbs = ({ paths }) => {
   return (
      <StyledBreadcrumb aria-label="breadcrumbs" separator="\">
         {paths.map((path, index) => {
            const lastIndex = index === paths.length - 1
            return lastIndex ? (
               <Typography color="#000000" key={path.path}>
                  {path.name}
               </Typography>
            ) : (
               <Link key={path.path} to={path.to}>
                  {path.name}
               </Link>
            )
         })}
      </StyledBreadcrumb>
   )
}

export default BreadCrumbs

const StyledBreadcrumb = styled(Breadcrumbs)`
   width: 100%;
`
const Link = styled(NavLink)`
   color: ${({ color }) => color || '#747d74;'};
   text-decoration: none;
   font-weight: 400;
   font-size: 14px;
   line-height: 19px;
`
