import { useGlobalStore } from '@/store/store'
import { Button, Modal } from 'antd'
import { FC } from 'react'
import { VoteInfo } from '../voteInfo/VoteInfo'

interface Props {
  open: boolean
  onClose: () => void
  openVote: () => void
}

export const ViewNotStartedVoteModal: FC<Props> = ({ open, onClose, openVote }) => {
  const currentDisplayedVote = useGlobalStore((state) => state.currentDisplayedVote)

  if (currentDisplayedVote == null) {
    return null
  }

  return (
    <Modal
      title={currentDisplayedVote.title}
      open={open}
      onCancel={onClose}
      onOk={onClose}
      footer={[
        <Button key='back' onClick={onClose}>Annuler</Button>,
        <Button
          key='cta' type='primary' onClick={openVote}
        >
          Commencer le vote
        </Button>
      ]}
    >
      <VoteInfo vote={currentDisplayedVote} />
    </Modal>
  )
}
