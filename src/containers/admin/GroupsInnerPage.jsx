/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getGroupStudentById } from '../../store/slices/admin-slices/group-slices/group-actions'
import UiTable from '../../components/UI/UiTable'
import Wrapper from '../../components/UI/Wrapper'
import BreadCrumbs from '../../components/UI/BreadCrambs'
import PopUp from '../../components/UI/PopUp'
import { STUDENT_HEADER } from '../../utils/constants/constants'
import { UiLoading } from '../../components/UI/UiLoading'
import { NoDataInfo } from '../../components/UI/NoDataInfo'
import HeaderLoyout from '../../components/UI/HeaderLoyout'

export const GroupsInnerPage = () => {
   const { id } = useParams()
   const dispatch = useDispatch()

   const { groupStudents, error, status } = useSelector((state) => state.groups)
   const ADMIN_INNER_PATH = [
      { path: '/admin/groups', to: '/admin/groups', name: 'Группы' },
      { path: `/admin/groups/${id}`, name: groupStudents[0]?.groupName },
   ]

   const render = groupStudents?.map((item, i) => {
      return {
         id: i + 1,
         name: item.fullName,
         format: item.studyFormat,
         group: item.groupName,
         phone: item.phoneNumber,
         email: item.email,
      }
   })

   useEffect(() => {
      dispatch(getGroupStudentById(id))
   }, [dispatch])

   return (
      <StudetsMain>
         <HeaderBlock>
            <HeaderLoyout roles="Администратор" />
         </HeaderBlock>
         <BreadcrumsBlock>
            <BreadCrumbs paths={ADMIN_INNER_PATH} />
         </BreadcrumsBlock>

         {status === 'loading' ? (
            <UiLoading />
         ) : groupStudents.length === 0 ? (
            <NoDataInfo title="В этой группе пока нет студентов" />
         ) : (
            <TableMain>
               <Wrapper width="1140px" margin="24px 0" height="100vh">
                  <UiTable headData={STUDENT_HEADER} data={render} />
               </Wrapper>
            </TableMain>
         )}
         {error && <PopUp message={error} messageType="error" />}
      </StudetsMain>
   )
}
const StudetsMain = styled.div`
   padding: 0 10px;
   background-color: #eff0f4;
   width: 100%;
`
const TableMain = styled.div`
   display: flex;
   justify-content: center;
`
const BreadcrumsBlock = styled.div`
   display: flex;
   padding-top: 44px;
   margin-left: 39px;
`
const HeaderBlock = styled.div`
   padding: 0 25px;
`
