import { FC, Key, ReactNode, useState } from 'react'
import { Table, Button, Input, Tooltip } from 'antd'
import { SaveOutlined, SendOutlined, DeleteOutlined } from '@ant-design/icons'
import type { TableColumnsType, TableProps } from 'antd'
import { ZodError, z } from 'zod'

import { UserRole } from '@/services/mainApi/queries/auth'
import { Role, RoleSelect } from '@/components/roleSelect/RoleSelect'
import { updateUserAction, deleteUserAction, resetUserPasswordAction } from '@/store/usersSlice/actions'
import styles from './AssociationMembers.module.scss'
import toast from 'react-hot-toast'

const updateUserSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  role: z.enum([UserRole.ADMIN, UserRole.INTERNAL, UserRole.EXTERNAL])
})

interface User {
  id: string
  fullName: string
  email: string
  role: UserRole
}

interface AssociationMembersProps {
  members: User[]
}

interface UserRow {
  key: Key
  id: string
  fullName: string
  fullNameInput: ReactNode
  email: string
  emailInput: ReactNode
  roleSelect: ReactNode
  role: Role
  actions: ReactNode[]
}

export const AssociationMembers: FC<AssociationMembersProps> = ({ members }) => {
  const [errors, setErrors] = useState<Array<{ id: string, error: ZodError }>>([])
  const [modifiedMemberIds, setModifiedMemberIds] = useState<string[]>([])

  const errorsContain = (id: string, field: string): boolean => {
    return errors.some((error) => error.id === id && error.error.errors.some((error) => error.path[0] === field))
  }

  const getErrorMessage = (id: string, field: string): string | null => {
    const error = errors.find((error) => error.id === id)
    if (error !== undefined) {
      const fieldError = error.error.errors.find((error) => error.path[0] === field)
      if (fieldError != null) {
        return fieldError.message
      }
    }
    return null
  }

  const memberRows = members.map((member) => ({
    key: member.id,
    id: member.id,
    fullName: member.fullName,
    fullNameInput: (
      <>
        <Input
          defaultValue={member.fullName}
          onChange={(e) => handleFullNameChange(member.id, e.target.value)}
          status={errorsContain(member.id, 'fullName') ? 'error' : undefined}
        />
        {errorsContain(member.id, 'fullName') && <span>{getErrorMessage(member.id, 'fullName')}</span>}
      </>
    ),
    email: member.email,
    emailInput: (
      <>
        <Input
          defaultValue={member.email}
          onChange={(e) => handleEmailChange(member.id, e.target.value)}
          status={errorsContain(member.id, 'email') ? 'error' : undefined}
        />
        {errorsContain(member.id, 'email') && <span>{getErrorMessage(member.id, 'email')}</span>}
      </>
    ),
    role: Role[member.role as keyof typeof Role],
    roleSelect: (
      <RoleSelect
        onChange={(value: Role) => handleRoleChange(member.id, value)}
        initialValue={Role[member.role as keyof typeof Role]}
      />
    ),
    actions: [
      <Button
        type='primary'
        icon={<SaveOutlined />}
        className={styles.actionButton}
        disabled={!modifiedMemberIds.includes(member.id)}
        onClick={() => handleSave(member.id)}
        key='save'
      />,
      <Tooltip key={member.id} title='Envoyer un e-mail de réinitialisation de mot de passe'>
        <Button type='primary' icon={<SendOutlined />} className={styles.actionButton} onClick={() => handleForgottenPassword(member.id)} key='forgotten-password' />
      </Tooltip>,
      <Button type='primary' danger icon={<DeleteOutlined />} className={styles.actionButton} onClick={() => handleDelete(member.id)} key='delete' />
    ]
  }))

  const columns: TableColumnsType<UserRow> = [
    {
      title: 'Prénom NOM',
      dataIndex: 'fullNameInput',
      filters: [...new Set(members.map((member) => ({ text: member.fullName, value: member.fullName })))],
      filterSearch: true,
      onFilter: (value: boolean | Key, record) => record.fullName.startsWith(String(value)),
      sorter: (a, b) => a.fullName.length - b.fullName.length,
      sortDirections: ['descend'],
      width: '29%'
    },
    {
      title: 'Adresse e-mail',
      dataIndex: 'emailInput',
      width: '29%'
    },
    {
      title: 'Rôle',
      dataIndex: 'roleSelect',
      filters: [...new Set(members.map((member) => ({ text: member.role, value: member.role })))],
      onFilter: (value: boolean | Key, record) => record.role.indexOf(String(value)) === 0,
      width: '29%'
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      width: '13%'
    }
  ]

  const onChange: TableProps<UserRow>['onChange'] = () => {}

  const handleRoleChange = (memberId: string, value: Role): void => {
    const memberIndex = memberRows.findIndex((memberRow) => memberRow.id === memberId)
    if (memberIndex !== -1) {
      setModifiedMemberIds(previousState => [
        ...previousState,
        memberRows[memberIndex].id
      ])
      memberRows[memberIndex].role = value
      members[memberIndex].role = value.toString() as UserRole
      try {
        updateUserSchema.parse({
          fullName: members[memberIndex].fullName,
          email: members[memberIndex].email,
          role: members[memberIndex].role
        })
        setErrors(previousState => previousState.filter((error) => error.id !== memberId))
      } catch (error: ZodError | unknown) {
        if (error instanceof ZodError) {
          setErrors(previousState => ([
            ...previousState,
            { id: memberId, error: error as ZodError }
          ]))
        }
      }
    }
  }

  const handleFullNameChange = (memberId: string, value: string): void => {
    const memberIndex = memberRows.findIndex((memberRow) => memberRow.id === memberId)
    if (memberIndex !== -1) {
      setModifiedMemberIds(previousState => [
        ...previousState,
        memberRows[memberIndex].id
      ])
      memberRows[memberIndex].fullName = value
      members[memberIndex].fullName = value
      try {
        updateUserSchema.parse({
          fullName: members[memberIndex].fullName,
          email: members[memberIndex].email,
          role: members[memberIndex].role
        })
        setErrors(previousState => previousState.filter((error) => error.id !== memberId))
      } catch (error: ZodError | unknown) {
        if (error instanceof ZodError) {
          setErrors(previousState => ([
            ...previousState,
            { id: memberId, error: error as ZodError }
          ]))
        }
      }
    }
  }

  const handleEmailChange = (memberId: string, value: string): void => {
    const memberIndex = memberRows.findIndex((memberRow) => memberRow.id === memberId)
    if (memberIndex !== -1) {
      setModifiedMemberIds(previousState => [
        ...previousState,
        memberRows[memberIndex].id
      ])
      memberRows[memberIndex].email = value
      members[memberIndex].email = value
      try {
        updateUserSchema.parse({
          fullName: members[memberIndex].fullName,
          email: members[memberIndex].email,
          role: members[memberIndex].role
        })
        setErrors(previousState => previousState.filter((error) => error.id !== memberId))
      } catch (error: ZodError | unknown) {
        if (error instanceof ZodError) {
          setErrors(previousState => ([
            ...previousState,
            { id: memberId, error: error as ZodError }
          ]))
        }
      }
    }
  }

  const handleSave = (memberId: string): void => {
    const memberIndex = memberRows.findIndex((memberRow) => memberRow.id === memberId)
    if (memberIndex !== -1) {
      try {
        const updateUserBody = updateUserSchema.parse({
          fullName: members[memberIndex].fullName,
          email: members[memberIndex].email,
          role: members[memberIndex].role
        })
        void updateUserAction(memberId, updateUserBody)
        setModifiedMemberIds(previousState => previousState.filter((id) => id !== memberId))
        toast.success('Le membre a bien été modifié')
      } catch (error: ZodError | unknown) {
        if (error instanceof ZodError) {
          setErrors(previousState => ([
            ...previousState,
            { id: memberId, error: error as ZodError }
          ]))
        }
      }
    }
  }

  const handleForgottenPassword = (memberId: string): void => {
    const memberIndex = memberRows.findIndex((memberRow) => memberRow.id === memberId)
    if (memberIndex !== -1) {
      try {
        void resetUserPasswordAction(memberId)
        toast.success('Le membre a bien été modifié')
      } catch (error: ZodError | unknown) {
        if (error instanceof ZodError) {
          setErrors(previousState => ([
            ...previousState,
            { id: memberId, error: error as ZodError }
          ]))
        }
      }
    }
  }

  const handleDelete = (memberId: string): void => {
    const memberIndex = memberRows.findIndex((memberRow) => memberRow.id === memberId)
    if (memberIndex !== -1) {
      void deleteUserAction(memberId)
      setModifiedMemberIds(previousState => previousState.filter((id) => id !== memberId))
    }
    toast.success('Le membre a beien supprimé')
  }

  return (
    <Table
      columns={columns}
      dataSource={memberRows}
      onChange={onChange}
      className={styles.associationMembers}
    />
  )
}
