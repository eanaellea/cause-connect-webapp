import { Modal } from 'antd'
import { FC } from 'react'
import styles from './CreateVoteModal.module.scss'

interface Props {
  open: boolean
  onClose: () => void
}

export const CreateVoteModal: FC<Props> = ({ open, onClose }) => {
  return (
    <Modal
      title='Créer un vote'
      open={open}
      onCancel={onClose}
      onOk={() => { /* void handleSubmit() */ }}
    >
      <div className={styles.formContent}>
        Use react hook form
      </div>
    </Modal>
  )
}
