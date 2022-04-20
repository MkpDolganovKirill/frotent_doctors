import React from 'react';
import '../Styles/Input.scss';
import { createTheme, TextField, ThemeProvider } from '@mui/material';

interface InputProps {
  labelText: string,
  placeholder?: string
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#E2574C",
    },
  },
});

const Input = ({ labelText, placeholder }: InputProps) => {
  return (
    <ThemeProvider theme={theme} >
      <TextField
        label={labelText}
        variant='outlined'
        color='primary'
        fullWidth
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
}

export default Input;