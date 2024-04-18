import { Button, Input } from 'antd'
import { FileAddOutlined } from '@ant-design/icons'
import { FC, useEffect, useState } from 'react'
import styles from './Documents.module.scss'
import { DocumentCard } from '@/components/documents/documentCard/DocumentCard'
import { useGlobalStore } from '@/store/store'
import { getMyDocumentsAction } from '@/store/documentsSlice/actions'
import { CreateDocumentModal } from '@/components/documents/createDocumentModal/CreateDocumentModal'

const REFETCH_DOCUMENTS_INTERVAL = 10000

export const Documents: FC = () => {
  const [searchValue, setSearchValue] = useState('')
  const documents = useGlobalStore((state) => state.documents).filter((document) => document.title.includes(searchValue))
  const [isCreateDocumentModalOpen, setIsCreateDocumentModalOpen] = useState(false)

  useEffect(() => {
    void getMyDocumentsAction()

    const interval = setInterval(() => {
      void getMyDocumentsAction()
    }, REFETCH_DOCUMENTS_INTERVAL)

    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <h1>Coffre fort numérique</h1>
      <div className={styles.documentsHeader}>
        <Button type='primary' icon={<FileAddOutlined />} onClick={() => setIsCreateDocumentModalOpen(true)}>Ajouter un document</Button>
        <Input.Search value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder='Rechercher un document' />
      </div>
      <div className={styles.documentsList}>
        {documents.map((document) => (
          <DocumentCard document={document} key={document.id} />
        ))}
      </div>
      <CreateDocumentModal open={isCreateDocumentModalOpen} onClose={() => setIsCreateDocumentModalOpen(false)} />
    </div>
  )
}
