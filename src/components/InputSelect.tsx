import { FormControl, InputLabel, MenuItem } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import { IDoctorsData } from '../types/types';

interface InputSelectProps {
  id: string,
  value: number,
  onChange: (id: string, event: SelectChangeEvent<number>) => void,
  label: string
};

const InputSelect: FC<InputSelectProps> = ({ id, value, onChange, label }) => {

  const [doctorsList, setDoctorsList] = useState <IDoctorsData[]>([{
    id: 0,
    fullname: ''
  }]);

  useEffect(() => {
    getDoctors();
  }, []);

  const getDoctors = async () => {
    await axios.get('http://localhost:8080/getAllDoctors').then(res => {
      setDoctorsList(res.data);
    }).catch(err => {
      if (err) return;
    })
  }

  return (
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
        {doctorsList.map((element) => (
          <MenuItem
            key={element.id}
            value={element.id}
          >
            {element.fullname}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
};

export default InputSelect;