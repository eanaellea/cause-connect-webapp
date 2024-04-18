import { resetConversationAction } from '@/store/chatbotSlice/actions'
import { Modal } from 'antd'
import { FC } from 'react'

interface Props {
  open: boolean
  onClose: () => void
}

export const DeleteChatbotConversationModal: FC<Props> = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      title='Confirmation de suppression de la conversation'
      okText='Supprimer'
      cancelText='Annuler'
      onOk={() => { void resetConversationAction(); onClose() }}
      onCancel={onClose}
    >
      Are you sure you want to delete this chatbot conversation?
    </Modal>
  )
}
