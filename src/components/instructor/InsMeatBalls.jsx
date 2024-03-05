import React from 'react'
import { MeatBalls } from '../UI/MeatBalls'
import { ReactComponent as AddIcon } from '../../assets/addCourse.svg'

export const InsMeatBalls = ({ openAssignModal, id }) => {
   const navigate = [
      {
         id: '1',
         icon: <AddIcon />,
         name: 'Добавить группу на курс',
         click: () => openAssignModal(id),
      },
   ]
   return <MeatBalls options={navigate} />
}
