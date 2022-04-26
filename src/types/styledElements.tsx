import { Button, ButtonProps, styled } from '@mui/material';

/* Buttons */
export const InActiveButton = styled(Button)<ButtonProps>(() => ({
  backgroundColor: 'transparent',
  marginLeft: '20px',
  color: '#E2574C',
  transition: '.2s',
  fontWeight: '900',
  textDecoration: 'underline',
  fontSize: '1rem',
  '&:hover': {
    color: '#E2574C',
    backgroundColor: 'rgba(226, 87, 76, 0.1)',
    textDecoration: 'underline',
  }
}));