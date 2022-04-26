import React from 'react';
import { createTheme, TextField, ThemeProvider } from '@mui/material';

interface IDateInput {
  id: string,
  value: string,
  onChange: (id: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  label: string
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#E2574C",
    }
  },
});

const DateInput = ({ id, value, onChange, label }: IDateInput) => {
  return (
    <ThemeProvider theme={theme} >
      <TextField
        id="date"
        label={label}
        type="date"
        value={value}
        sx={{
          width: '100%'
        }}
        onChange={(e) => onChange(id, e)}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </ThemeProvider>
  )
};

export default DateInput;