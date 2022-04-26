import { Button, createTheme, ThemeProvider } from '@mui/material';
import React from 'react';

enum typesButtons {
  button = 'button',
  submit = 'submit',
  reset = 'reset'
}

interface ButtonsProps {
  children?: React.ReactNode,
  text: string,
  disabled?: boolean,
  types: typesButtons,
  onClick?: () => void
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#E2574C",
    }
  },
});

const Buttons: React.FC<ButtonsProps> = ({ text, disabled, types, onClick }) => {
  return (
    <ThemeProvider theme={theme} >
      <Button 
        sx={{
          fontSize: '1.2rem',
          fontWeight: '600'
        }}
        type={types}
        variant='contained' 
        disabled={disabled}
        onClick={onClick}
      >
        {text}
      </Button>
    </ThemeProvider>
  )
};

export default Buttons;