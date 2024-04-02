import { useGlobalStore } from '@/store/store'
import { Button, Modal } from 'antd'
import { FC } from 'react'
import { VoteInfo } from '../voteInfo/VoteInfo'

interface Props {
  open: boolean
  onClose: () => void
}

export const ViewDoneVoteModal: FC<Props> = ({ open, onClose }) => {
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
        <Button key='back' onClick={onClose}>Fermer</Button>
      ]}
    >
      <VoteInfo vote={currentDisplayedVote} />
    </Modal>
  )
}
