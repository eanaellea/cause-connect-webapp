import { FC, Key } from 'react'
import { Table } from 'antd'
import type { TableColumnsType, TableProps } from 'antd'
import { UserRole } from '@/services/mainApi/queries/auth'

interface User {
  key: Key
  id: string
  fullName: string
  email: string
  role: UserRole
}

interface AssociationMembersProps {
  members: User[]
}

export const AssociationMembers: FC<AssociationMembersProps> = ({ members }) => {
  const columns: TableColumnsType<User> = [
    {
      title: 'Prénom NOM',
      dataIndex: 'fullName',
      filters: [...new Set(members.map((member) => ({ text: member.fullName, value: member.fullName })))],
      filterSearch: true,
      onFilter: (value: boolean | Key, record) => record.fullName.startsWith(String(value)),
      sorter: (a, b) => a.fullName.length - b.fullName.length,
      sortDirections: ['descend']
    },
    {
      title: 'Adresse e-mail',
      dataIndex: 'email'
    },
    {
      title: 'Rôle',
      dataIndex: 'role',
      filters: [...new Set(members.map((member) => ({ text: member.role, value: member.role })))],
      onFilter: (value: boolean | Key, record) => record.role.indexOf(String(value)) === 0
    }
  ]

  const onChange: TableProps<User>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }

  return (
    <Table
      columns={columns}
      dataSource={members.map((member, index) => ({ ...member, key: index }))}
      onChange={onChange}
    />
  )
}
