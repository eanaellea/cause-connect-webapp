import { FC } from 'react'
import { Select } from 'antd'

interface Option {
  value: string
  label: string
}

interface SearchableSelectProps {
  loading?: boolean
  options: Option[]
  placeholder: string
  onChange: (value: string) => void
}

const filterOption = (input: string, option?: { label: string, value: string }): boolean =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

export const SearchableSelect: FC<SearchableSelectProps> = ({ loading, options, placeholder, onChange }) => {
  return (
    <Select
      showSearch
      allowClear
      placeholder={placeholder}
      optionFilterProp='label'
      onChange={onChange}
      filterOption={filterOption}
      options={options}
      loading={loading}
    />
  )
}
