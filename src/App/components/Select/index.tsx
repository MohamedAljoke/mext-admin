import React from 'react'
import Select, { OptionsOrGroups, GroupBase } from 'react-select';

export type SelectOption = {
  label: string;
  value: string | number;
};
interface ICustomSelectProps {
  options: SelectOption[]
  isMulti?: boolean
  handleChange: (newValue: any) => void
  values: SelectOption[]
}
export default function CustomSelect({ options, isMulti, handleChange, values }: ICustomSelectProps) {
  return (
    <Select
      isSearchable
      isMulti={isMulti}
      options={options}
      value={values}
      onChange={(newValue) => handleChange(newValue)}
    />
  )
}
