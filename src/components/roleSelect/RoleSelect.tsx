import { FC } from 'react'
import { Select } from 'antd'

import styles from './RoleSelect.module.scss'

export enum Role {
  'admin' = 'Administateur',
  'internal' = 'Membre interne',
  'external' = 'Membre externe'
}

interface RoleSelectProps {
  onChange: (value: Role) => void
}

export const RoleSelect: FC<RoleSelectProps> = ({ onChange }) => {
  const options = Object.keys(Role).map((key) => ({
    label: Role[key as keyof typeof Role],
    value: key
  }))

  return (
    <Select
      options={options}
      onChange={onChange}
      className={styles.select}
      placeholder='Sélectionnez un rôle'
    />
  )
}
