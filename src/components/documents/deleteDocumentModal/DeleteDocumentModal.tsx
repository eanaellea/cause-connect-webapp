import { Document } from '@/store/types'
import { Modal } from 'antd'
import { FC } from 'react'
import { deleteDocumentAction } from '@/store/documentsSlice/actions'

interface Props {
  document: Document
  open: boolean
  onClose: () => void
}

export const DeleteDocumentModal: FC<Props> = ({ document, open, onClose }) => {
  const deleteFile = (): void => {
    void deleteDocumentAction(document.id)
  }

  return (
    <Modal
      title={`Delete ${document.title} ?`}
      open={open}
      onCancel={onClose}
      onOk={deleteFile}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ content: 'Delete' }}
    >
      <p>Are you sure you want to delete this document? This action is irreversible.</p>
    </Modal>
  )
}
