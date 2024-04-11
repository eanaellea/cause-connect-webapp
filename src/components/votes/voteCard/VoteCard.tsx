import { Vote } from '@/services/mainApi/queries/votes'
import { Card } from 'antd'
import { FC } from 'react'
import styles from './VoteCard.module.scss'
import { EditOutlined, EyeOutlined } from '@ant-design/icons'
import { VoteInfo } from '../voteInfo/VoteInfo'
import { useGlobalStore } from '@/store/store'
import { UserRole } from '@/services/mainApi/queries/auth'
import { updateCurrentDisplayedVoteAction } from '@/store/votesSlice/actions'

interface Props {
  vote: Vote
  setIsEditModalOpen: (isOpen: boolean) => void
  setIsViewModalOpen: (isOpen: boolean) => void
}

export const VoteCard: FC<Props> = ({ vote, setIsEditModalOpen, setIsViewModalOpen }) => {
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
    </>
  )
}
