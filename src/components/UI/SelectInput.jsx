import React from 'react'
import {
   OutlinedInput,
   MenuItem,
   FormControl,
   Select,
   styled,
} from '@mui/material/'

const staticData = ['Видеоурок', 'Презентация', 'Задание', 'Ссылка', 'Тест']

export const SelectInput = ({ setSelectedItem }) => {
   const clickHandler = (item) => {
      setSelectedItem(item)
   }
   return (
      <div>
         <FormControl sx={{ m: 1, width: 300, mt: 3, borderRadius: 40 }}>
            <SelectContainer
               displayEmpty
               value=""
               input={<OutlinedInput />}
               sx={{ marginLeft: 2 }}
               renderValue={() => <p>Добавить</p>}
            >
               {staticData.map((item) => (
                  <MenuContainer
                     onClick={() => clickHandler(item)}
                     key={item}
                     value={item}
                  >
                     {item}
                  </MenuContainer>
               ))}
            </SelectContainer>
         </FormControl>
      </div>
   )
}

const SelectContainer = styled(Select)`
   width: 141px;
   height: 44px;
   border-radius: 8px;
   font-weight: 600;
   font-size: 14px;
   line-height: 19px;
   &.MuiSvgIcon-fontSizeMedium {
      width: 30px;
   }
   & .MuiSvgIcon-root {
      color: black;
   }
`
const MenuContainer = styled(MenuItem)`
   width: 147px;
   height: 43px;
   border-bottom: 1px solid rgba(36, 36, 36, 0.08);
   :last-child {
      border-bottom: none;
   }
   :focus {
      background-color: rgba(26, 35, 126, 0.07);
      color: #3772ff;
   }
`
