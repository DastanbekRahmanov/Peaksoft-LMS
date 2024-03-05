import React, { useState } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { styled as style, Menu, MenuItem } from '@mui/material/'
import styled from 'styled-components'

export const MeatBalls = ({ options }) => {
   const [anchorEl, setAnchorEl] = useState(null)
   const open = Boolean(anchorEl)
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget)
   }
   const handleClose = () => {
      setAnchorEl(null)
   }
   return (
      <div>
         <MeatBallsButton
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
         >
            <MoreHorizIcon />
         </MeatBallsButton>

         <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
               'aria-labelledby': 'basic-button',
            }}
         >
            {options.map((element) => (
               <MenuItems key={element.id} onClick={() => element.click()}>
                  <MenuItemIcon>{element.icon}</MenuItemIcon>
                  <p>{element.name}</p>
               </MenuItems>
            ))}
         </Menu>
      </div>
   )
}

const MeatBallsButton = styled.p`
   color: #343a40;
   padding: 0;
   margin: 0;
`
const MenuItems = style(MenuItem)`
   transition: all 0.2s;
   :hover {
      background: rgba(26, 35, 126, 0.07);
   }
`

const MenuItemIcon = styled.p`
   padding-right: 10px;
`
