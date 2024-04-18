import { Document } from '@/store/types'
import { Checkbox, Input, Modal } from 'antd'
import { FC, useEffect, useState } from 'react'
import { DocumentInfo } from '../documentInfo/DocumentInfo'
import { generateShareCode } from '@/services/mainApi/queries/documents'
import { CopyOutlined, ReloadOutlined } from '@ant-design/icons'
import toast from 'react-hot-toast'
import styles from './ShareDocumentModal.module.scss'
import { CheckboxChangeEvent } from 'antd/es/checkbox'

interface Props {
  document: Document
  open: boolean
  onClose: () => void
}

export const ShareDocumentModal: FC<Props> = ({ document, open, onClose }) => {
  const EMPTY_SHARE_LINK = 'No share link'
  const [shareLink, setShareLink] = useState<string>(EMPTY_SHARE_LINK)
  const [readPermission, setReadPermission] = useState<boolean>(false)
  const [editPermission, setEditPermission] = useState<boolean>(false)

  useEffect(() => {
    if (shareLink !== EMPTY_SHARE_LINK) {
      void handleGenerateShareCode()
    }
  }, [readPermission, editPermission])

  const handleGenerateShareCode = async (): Promise<void> => {
    const permissions: Array<('read' | 'edit')> = []
    if (readPermission) permissions.push('read')
    if (editPermission) permissions.push('edit')

    const shareCodeResponse = await generateShareCode(document.id, { permissions })
    setShareLink(
      shareCodeResponse?.shareCode != null
        ? `https://www.causeconnect.fr/app/documents/use-share-code/${shareCodeResponse.shareCode}`
        : 'Pas de lien.')
  }

  const handleCopyShareCode = async (): Promise<void> => {
    if (shareLink !== EMPTY_SHARE_LINK) {
      void navigator.clipboard.writeText(shareLink)
      toast.success('Lien de partage copié dans le presse-papiers')
    }
  }

  const handleSharePermissionsReadChange = (e: CheckboxChangeEvent): void => {
    setReadPermission(e.target.checked)
  }

  const handleSharePermissionsEditChange = (e: CheckboxChangeEvent): void => {
    setEditPermission(e.target.checked)
  }

  return (
    <Modal
      title={`Partager ${document.title}`}
      open={open}
      onCancel={onClose}
      onOk={onClose}
      cancelButtonProps={{ style: { display: 'none' } }}
    >
      <DocumentInfo document={document} />
      <div>
        <Input
          onClick={() => { void handleCopyShareCode() }}
          className={styles.shareCodeFakeInput}
          classNames={{ input: styles.shareCodeFakeInput, suffix: styles.shareCodeFakeInput }}
          addonAfter={
            <CopyOutlined
              className={styles.inputIcon}
              onClick={() => { void handleCopyShareCode() }}
            />
          }
          addonBefore={
            <ReloadOutlined
              className={styles.inputIcon}
              onClick={() => { void handleGenerateShareCode() }}
            />
          }
          value={shareLink}
        />
      </div>
      <div>
        <h2>People with link can</h2>
        <Checkbox checked={readPermission} disabled={!document.permissions.includes('read')} onChange={handleSharePermissionsReadChange}>Lecture</Checkbox>
        <Checkbox checked={editPermission} disabled={!document.permissions.includes('edit')} onChange={handleSharePermissionsEditChange}>Écriture</Checkbox>
      </div>
    </Modal>
  )
}
