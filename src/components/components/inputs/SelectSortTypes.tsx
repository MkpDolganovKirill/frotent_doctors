import React, { FC } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, ThemeProvider } from '@mui/material';
import { theme } from '../../../types/themes';
import { ISortMethods } from '../../../types/types';

interface SelectSortTypesProps {
  id: string,
  value: string,
  methods: ISortMethods[],
  changeValues: (id: string, event: SelectChangeEvent<string>) => void,
  label: string
};

const SelectSortTypes: FC<SelectSortTypesProps> = ({ id, label, value, methods, changeValues }) => {
  return (
    <ThemeProvider theme={theme}>
      <FormControl sx={{ m: 1, width: '100%' }}>
        <InputLabel id="sort-select-helper-label">{label}</InputLabel>
        <Select
          labelId="sort-select-helper-label"
          id="sort-select-helper"
          value={value}
          label={label}
          onChange={(e) => changeValues(id, e)}
          defaultValue={value}
          sx={{
            width: '100%'
          }}
        >
          {methods.map((method) => (
            <MenuItem
              key={method.id}
              value={method.id}
            >
              {method.sortMethod}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ThemeProvider>
  );
};

export default SelectSortTypes;