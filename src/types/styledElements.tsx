import { Button, ButtonProps, styled } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

/* Buttons */
export const InActiveButton = styled(Button)<ButtonProps>(() => ({
  backgroundColor: 'transparent',
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

/* Tables */
export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#E2574C',
    color: theme.palette.common.white,
    fontSize: 16,
    fontWeight: 700
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontWeight: 600
  },
}));