import { Document } from '@/store/types'
import { Card } from 'antd'
import { FC, useState } from 'react'
import styles from './DocumentCard.module.scss'
import { ShareAltOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons'
import { ShareDocumentModal } from '../shareDocumentModal/ShareDocumentModal'
import { DocumentInfo } from '../documentInfo/DocumentInfo'
import { DeleteDocumentModal } from '../deleteDocumentModal/DeleteDocumentModal'

interface Props {
  document: Document
}

export const DocumentCard: FC<Props> = ({ document }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const handleShareClick = (e: any): void => {
    console.log(e)
    setIsShareModalOpen(true)
  }
  const handleDeleteClick = (): void => {
    setIsDeleteModalOpen(true)
  }

  const actions = [
    document.permissions.length > 0
      ? <ShareAltOutlined key='share' onClick={handleShareClick} />
      : undefined,
    document.permissions.includes('edit')
      ? <DeleteOutlined key='delete' onClick={handleDeleteClick} />
      : undefined,
    <a key='download' href={document.fileUrl}><DownloadOutlined /></a>
  ]

  return (
    <>
      <Card
        className={styles.documentCard}
        title={document.title}
        actions={actions}
      >
        <DocumentInfo document={document} />
      </Card>
      <ShareDocumentModal document={document} open={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
      <DeleteDocumentModal document={document} open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} />
    </>
  )
}
