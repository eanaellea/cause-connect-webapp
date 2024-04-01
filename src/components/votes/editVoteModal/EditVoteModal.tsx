import { Vote } from '@/services/mainApi/queries/votes'
import { Modal } from 'antd'
import { FC } from 'react'

interface Props {
  vote: Vote
  open: boolean
  onClose: () => void
}

export const EditVoteModal: FC<Props> = ({ vote, open, onClose }) => {
  return (
    <Modal
      title={`Partager ${document.title}`}
      open={open}
      onCancel={onClose}
      onOk={onClose}
    />
  )
}
