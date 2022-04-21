import React from 'react';
import '../Styles/Input.scss';
import { createTheme, TextField, ThemeProvider } from '@mui/material';

interface InputProps {
  id: string,
  value: string,
  onChange: (id: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  type: string,
  labelText: string,
  placeholder?: string,
  helperText?: string
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#E2574C",
    },
  },
});

const Input = ({ id, type, value, onChange, labelText, placeholder, helperText }: InputProps) => {
  
  return (
    <ThemeProvider theme={theme} >
      <TextField
        name={id}
        value={value}
        onChange={(e) => onChange(id, e)}
        type={type}
        label={labelText}
        variant='outlined'
        color='primary'
        fullWidth
        helperText={helperText}
        autoComplete='off'
        size='medium'
        placeholder={placeholder}
        sx={{
          heigth: '50px',
          marginTop: '30px',
          fontWeight: '2rem'
        }}
      />
    </ThemeProvider>
  )
};

export default Input;