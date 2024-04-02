import { Vote } from '@/services/mainApi/queries/votes'
import { Card } from 'antd'
import { FC, useState } from 'react'
import styles from './VoteCard.module.scss'
import { EditOutlined, EyeOutlined } from '@ant-design/icons'
import { EditVoteModal } from '../editVoteModal/EditVoteModal'
import { ViewVoteModal } from '../viewVoteModal/ViewVoteModal'
import { VoteInfo } from '../voteInfo/VoteInfo'
import { useGlobalStore } from '@/store/store'
import { UserRole } from '@/services/mainApi/queries/auth'
import { updateCurrentDisplayedVoteAction } from '@/store/votesSlice/actions'

interface Props {
  vote: Vote
}

export const VoteCard: FC<Props> = ({ vote }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const userRole = useGlobalStore((state) => state.user?.role)

  const handleEditClick = async (): Promise<void> => {
    await updateCurrentDisplayedVoteAction(vote.id)
    setIsEditModalOpen(true)
  }

  const handleViewClick = async (): Promise<void> => {
    await updateCurrentDisplayedVoteAction(vote.id)
    setIsViewModalOpen(true)
  }

  const actions = [
    userRole === UserRole.ADMIN
      ? <EditOutlined key='edit' onClick={() => { void handleEditClick() }} />
      : undefined,
    userRole === UserRole.ADMIN
      ? <EyeOutlined key='delete' onClick={() => { void handleViewClick() }} />
      : undefined
  ]

  return (
    <>
      <Card
        className={styles.voteCard}
        title={vote.title}
        actions={actions}
      >
        <VoteInfo vote={vote} />
      </Card>
      <EditVoteModal vote={vote} open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
      <ViewVoteModal voteId={vote.id} open={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} />
    </>
  )
}
