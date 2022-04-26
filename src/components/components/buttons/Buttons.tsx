import React from 'react';
import { Button, ThemeProvider } from '@mui/material';
import { typesButtons } from '../../../types/enums';
import { theme } from '../../../types/themes';

interface ButtonsProps {
  children?: React.ReactNode,
  text: string,
  disabled?: boolean,
  types: typesButtons,
  onClick?: () => void
};

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