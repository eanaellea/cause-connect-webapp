import { Checkbox, Input, Modal, Upload } from 'antd'
import { FC, useState } from 'react'
import styles from './CreateDocumentModal.module.scss'
import { uploadDocumentAction } from '@/store/documentsSlice/actions'
import toast from 'react-hot-toast'

interface Props {
  open: boolean
  onClose: () => void
}

export const CreateDocumentModal: FC<Props> = ({ open, onClose }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [documentTitle, setDocumentTitle] = useState<string>('')
  const [fileVisibility, setFileVisibility] = useState<'private' | 'public'>('public')

  const handleSubmit = async (): Promise<void> => {
    if (uploadedFile == null) {
      toast.error('Please select a file')
      return
    }
    void uploadDocumentAction(uploadedFile, { title: documentTitle, visibility: fileVisibility })
    onClose()
  }

  return (
    <Modal
      title={`Partager ${document.title}`}
      open={open}
      onCancel={onClose}
      onOk={() => { void handleSubmit() }}
    >
      <div className={styles.formContent}>
        <div>
          <h3>File</h3>
          <Upload type={uploadedFile === null ? 'drag' : undefined} onRemove={() => setUploadedFile(null)} beforeUpload={(file) => { setUploadedFile(file); return false }} />
        </div>
        <div>
          <h3>Title (will be original file name if not specified)</h3>
          <Input value={documentTitle} onChange={(e) => setDocumentTitle(e.target.value)} placeholder='Document title' />
        </div>
        <div>
          <h3>Visibility</h3>
          <Checkbox onChange={(e) => setFileVisibility(e.target.checked ? 'private' : 'public')}>Private</Checkbox>
        </div>
      </div>
    </Modal>
  )
}
