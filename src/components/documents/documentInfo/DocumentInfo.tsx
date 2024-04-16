import { Document } from '@/store/types'
import { FC } from 'react'
import styles from './DocumentInfo.module.scss'

interface Props {
  document: Document
}

export const DocumentInfo: FC<Props> = ({ document }) => {
  return (
    <div className={styles.userInfo}>
      <p>
        <span className={styles.infoProp}>Title:</span>
        {document.title}
      </p>
      <p>
        <span className={styles.infoProp}>Visibility:</span>
        {document.visibility}
      </p>
      <p>
        <span className={styles.infoProp}>Permissions:</span>
        {document.permissions.join(', ')}
      </p>
    </div>
  )
}
