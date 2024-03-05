import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import GroupCard from '../../components/UI/GroupCard'
import UIButton from '../../components/UI/UIButton'
import { ReactComponent as PlusIcon } from '../../assets/plusIconAdmin.svg'
import { GroupsModalWindow } from '../../components/admin-groups/GroupsModalWindow'
import { GroupsEditModal } from '../../components/admin-groups/GroupsEditModal'
import PopUp from '../../components/UI/PopUp'
import { GroupsMeatBalls } from '../../components/admin-groups/GroupsMeatBalls'
import { getGroups } from '../../store/slices/admin-slices/group-slices/group-actions'
import { GroupDeleteModal } from '../../components/admin-groups/DeleteModal'
import { UiLoading } from '../../components/UI/UiLoading'
import HeaderLoyout from '../../components/UI/HeaderLoyout'
import { NoDataInfo } from '../../components/UI/NoDataInfo'

export const GroupsPage = () => {
   const [params, setParams] = useSearchParams()
   const { modalOpen } = Object.fromEntries(params)

   const dispatch = useDispatch()
   const { error, status } = useSelector((state) => state.groups)
   const { groups } = useSelector((state) => state.groups)
   const navigate = useNavigate()

   useEffect(() => {
      dispatch(getGroups())
   }, [dispatch])

   const showModalHandler = () => {
      setParams({ modalOpen: 'CREATE-GROUP' })
   }
   const openDeleteModal = (id) => {
      setParams({ modalOpen: 'DELETE-GROUP', id })
   }

   const openEdditModal = (id) => {
      setParams({ modalOpen: 'EDDIT-GROUP', id })
   }

   const onCloseModal = () => {
      setParams({})
   }

   const navigateHanlder = (id) => {
      navigate(`/admin/groups/${id}`)
   }
   return (
      <GroupsMain>
         {error && <PopUp message={error} messageType="error" />}
         {status === 'created' && (
            <PopUp message="Группа успешно создана" messageType="success" />
         )}
         {status === 'deleted' && (
            <PopUp message="Группа удалена" messageType="success" />
         )}
         {status === 'edited' && (
            <PopUp
               message="Группа отредактирована успешно"
               messageType="success"
            />
         )}
         <HeaderBlock>
            <HeaderLoyout roles="Администратор" />
         </HeaderBlock>
         <ButtonBlock>
            <UIButton
               width="177px"
               height="40px"
               startIcon={<PlusIcon />}
               variant="contained"
               onClick={showModalHandler}
               background="#3772FF"
            >
               Создать группу
            </UIButton>
         </ButtonBlock>

         {status === 'loading' ? (
            <UiLoading />
         ) : (
            <GridGroups>
               {groups.length === 0 && (
                  <NoDataInfo title="Пока нет никаких групп, создайте" />
               )}
               {groups?.map((element) => (
                  <GroupCard
                     key={element.id}
                     someImage={element.image}
                     someName={element.groupName}
                     someParagraph={element.description}
                     someYear={element.dateOfStart}
                     onClick={() => navigateHanlder(element.id)}
                     someButton={
                        <GroupsMeatBalls
                           openDeleteModal={openDeleteModal}
                           openEdditModal={openEdditModal}
                           id={element.id}
                        />
                     }
                  />
               ))}
            </GridGroups>
         )}

         <GroupsModalWindow
            open={modalOpen === 'CREATE-GROUP'}
            onClose={onCloseModal}
         />
         <GroupDeleteModal
            open={modalOpen === 'DELETE-GROUP'}
            onClose={onCloseModal}
         />
         {modalOpen === 'EDDIT-GROUP' && (
            <GroupsEditModal
               open={modalOpen === 'EDDIT-GROUP'}
               onClose={onCloseModal}
            />
         )}
      </GroupsMain>
   )
}

const GroupsMain = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   background-color: #eff0f4;
`

const ButtonBlock = styled.div`
   display: flex;
   justify-content: end;
   margin: 20px 0;
   padding: 0 40px 0 20px;
`

const GridGroups = styled.div`
   display: grid;
   grid-template-columns: repeat(4, 1fr);
   column-gap: 20px;
   row-gap: 20px;
   padding: 0 40px 0 20px;
`
const HeaderBlock = styled.div`
   padding: 0 25px;
`
