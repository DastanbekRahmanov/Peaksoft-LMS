import React from 'react'
import { MeatBalls } from '../UI/MeatBalls'
import { ReactComponent as DeleteIcon } from '../../assets/deleteIconGroup.svg'
import { ReactComponent as EditIcon } from '../../assets/editIcon.svg'

export const GroupsMeatBalls = ({ openDeleteModal, openEdditModal, id }) => {
   const navigate = [
      {
         id: '2',
         icon: <EditIcon />,
         name: 'Редактировать',
         click: () => openEdditModal(id),
      },
      {
         id: '1',
         icon: <DeleteIcon />,
         name: 'Удалить',
         click: () => openDeleteModal(id),
      },
   ]
   return <MeatBalls options={navigate} />
}
