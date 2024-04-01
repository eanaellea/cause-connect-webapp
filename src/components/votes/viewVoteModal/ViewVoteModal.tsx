import { updateCurrentDisplayedVoteAction } from '@/store/votesSlice/actions'
import { Modal } from 'antd'
import { FC, useEffect } from 'react'

interface Props {
  voteId: string
  open: boolean
  onClose: () => void
}

export const ViewVoteModal: FC<Props> = ({ voteId, open, onClose }) => {
  useEffect(() => {
    void updateCurrentDisplayedVoteAction(voteId)
  }, [])

  return (
    <Modal
      title={`Partager ${document.title}`}
      open={open}
      onCancel={onClose}
      onOk={onClose}
    />
  )
}
