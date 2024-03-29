import { FC } from 'react';
import { Select } from 'antd';

interface Option {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  options: Option[];
  placeholder: string;
  onChange: (value: string) => void;
}

const onSearch = (value: string) => {
  console.log('search:', value);
};

const filterOption = (input: string, option?: { label: string; value: string }) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

export const SearchableSelect: FC<SearchableSelectProps> = ({options, placeholder, onChange}) => {
  return (
    <Select
      showSearch
      allowClear
      placeholder={placeholder}
      optionFilterProp="label"
      onChange={onChange}
      onSearch={onSearch}
      filterOption={filterOption}
      options={options}
    />
  );
}