import React, { FC } from 'react';
import { FormControl, InputLabel, MenuItem, ThemeProvider } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { theme } from '../../../types/themes';
import { IDoctorsData } from '../../../types/types';

interface InputSelectProps {
  id: string,
  value: number,
  doctors: IDoctorsData[],
  onChange: (id: string, event: SelectChangeEvent<number>) => void,
  label: string
};

const InputSelect: FC<InputSelectProps> = ({ id, value, doctors, onChange, label }) => {

  return (
    <ThemeProvider theme={theme}>
      <FormControl sx={{ m: 1, width: '100%' }}>
        <InputLabel id="simple-select-helper-label">{label}</InputLabel>
        <Select
          labelId="simple-select-helper-label"
          id="simple-select-helper"
          value={value}
          label={label}
          onChange={(e) => onChange(id, e)}
          defaultValue={value}
          sx={{
            width: '100%'
          }}
        >
          <MenuItem
            key={0}
            value={0}
          >Не выбран</MenuItem>
          {doctors.map((doctor) => (
            <MenuItem
              key={doctor.id}
              value={doctor.id}
            >
              {doctor.fullname}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ThemeProvider>
  )
};

export default InputSelect;