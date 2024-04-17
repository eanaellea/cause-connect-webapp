import { FC, useEffect, useState } from 'react'
import { Button, Modal, Tooltip } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import styles from './VoteSelectionModal.module.scss'
import { fetchVotes as getVotes, Vote } from '@/services/mainApi/queries/votes'

interface Props {
  open: boolean
  onClose: (voteIds: string[]) => void
  initialSelectedVoteIds?: string[]
}

export const VoteSelectionModal: FC<Props> = ({ open, onClose, initialSelectedVoteIds = [] }) => {
  const initialSelectedUserIdsBackup = initialSelectedVoteIds ?? []
  const [votes, setVotes] = useState<Vote[]>([])
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>(initialSelectedVoteIds)

  useEffect(() => {
    setSelectedUserIds(initialSelectedVoteIds)
  }, [initialSelectedVoteIds])

  useEffect(() => {
    const fetchVotes = async (): Promise<void> => {
      const votes = await getVotes()
      if (votes === null) return
      setVotes(votes)
    }
    void fetchVotes()
  }, [])

  const handleCancel = async (): Promise<void> => {
    setSelectedUserIds(initialSelectedUserIdsBackup)
    onClose(initialSelectedUserIdsBackup)
  }

  const handleClose = async (): Promise<void> => {
    onClose(selectedUserIds)
  }

  return (
    <Modal
      title='Users modal'
      open={open}
      onCancel={() => { void handleCancel() }}
      onOk={() => { void handleClose() }}
    >
      {
        votes.map((vote) => (
          <div className={styles.userRow} key={vote.id}>
            <p>
              {vote.title}
            </p>
            <Tooltip title={selectedUserIds.includes(vote.id) ? 'Remove' : 'Add'}>
              {selectedUserIds.includes(vote.id)
                ? <Button onClick={() => setSelectedUserIds(selectedUserIds.filter((id) => id !== vote.id))} icon={<DeleteOutlined />} />
                : <Button type='primary' onClick={() => setSelectedUserIds([...selectedUserIds, vote.id])} icon={<PlusOutlined />} />}
            </Tooltip>
          </div>
        ))
      }
    </Modal>
  )
}
