import { useGlobalStore } from '@/store/store'
import { Button, Modal } from 'antd'
import { FC } from 'react'
import { VoteInfo } from '../voteInfo/VoteInfo'

interface Props {
  open: boolean
  onClose: () => void
  closeVote: () => void
}

export const ViewOpenVoteModal: FC<Props> = ({ open, onClose, closeVote }) => {
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
          danger key='start' type='primary' onClick={closeVote}
        >
          Fermer le vote
        </Button>
      ]}
    >
      <VoteInfo vote={currentDisplayedVote} />
    </Modal>
  )
}
