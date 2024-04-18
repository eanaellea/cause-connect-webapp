import { FC, useEffect, useState } from 'react'
import { Button, Modal, Tooltip } from 'antd'
import { getUsersFromMyAssociationQuery, UserResponse } from '@/services/mainApi/queries/users'
import { UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons'
import styles from './UserSelectionModal.module.scss'

interface Props {
  open: boolean
  onClose: (userIds: string[]) => void
  initialSelectedUserIds?: string[]
}

export const UserSelectionModal: FC<Props> = ({ open, onClose, initialSelectedUserIds = [] }) => {
  const initialSelectedUserIdsBackup = initialSelectedUserIds ?? []
  const [users, setUsers] = useState<UserResponse[]>([])
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>(initialSelectedUserIds)

  useEffect(() => {
    setSelectedUserIds(initialSelectedUserIds)
  }, [initialSelectedUserIds])

  useEffect(() => {
    const fetchUsers = async (): Promise<void> => {
      const users = await getUsersFromMyAssociationQuery()
      if (users === null) return
      setUsers(users)
    }
    void fetchUsers()
  }, [])

  const handleCancel = async (): Promise<void> => {
    setSelectedUserIds(initialSelectedUserIdsBackup)
    onClose(initialSelectedUserIdsBackup)
  }

  const handleClose = async (): Promise<void> => {
    onClose(selectedUserIds)
  }

  return (
    <Modal
      title='Users modal'
      open={open}
      onCancel={() => { void handleCancel() }}
      onOk={() => { void handleClose() }}
    >
      {
        users.map((user) => (
          <div className={styles.userRow} key={user.id}>
            <p>
              {user.fullName}
            </p>
            <Tooltip title={selectedUserIds.includes(user.id) ? 'Retirer' : 'Ajouter'}>
              {selectedUserIds.includes(user.id)
                ? <Button onClick={() => setSelectedUserIds(selectedUserIds.filter((id) => id !== user.id))} icon={<UserDeleteOutlined />} />
                : <Button type='primary' onClick={() => setSelectedUserIds([...selectedUserIds, user.id])} icon={<UserAddOutlined />} />}
            </Tooltip>
          </div>
        ))
      }
    </Modal>
  )
}
