import React, { useState } from 'react';
import '../Styles/Input.scss';
import { 
  createTheme, 
  FormControl, 
  IconButton, 
  InputAdornment, 
  InputLabel, 
  OutlinedInput, 
  ThemeProvider } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface InputProps {
  id: string,
  value: string,
  onChange: (id: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  type: string,
  stateValidate: boolean,
  labelText: string,
  placeholder?: string,
  helperText?: string
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#E2574C",
    }
  },
});

const InputValue = ({ id, type, stateValidate, value, onChange, labelText, placeholder, helperText }: InputProps) => {

  const [showPass, setShowPass] = useState('password'); 

  const setTypePass = () => {
    setShowPass(showPass === 'text' ? 'password' : 'text');
  }
  
  return (
    <ThemeProvider theme={theme} >
      <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
        <InputLabel htmlFor={id}>{labelText}</InputLabel>
        <OutlinedInput
          id={id}  
          type={type === 'text' ? 'text' : `${showPass}`}
          value={value}
          autoComplete='off'
          fullWidth
          color={stateValidate ? 'success' : 'error'}
          onChange={(e) => onChange(id, e)}
          endAdornment={
            id !== 'login' ?
            <InputAdornment position="end">
                <IconButton
                  onClick={setTypePass}
                  edge="end"
                >
                {showPass === 'text' ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment> 
            : 
            ''
          }
          label={labelText}
          placeholder={placeholder}
        />
        <p className='helperText'>{helperText}</p>
      </FormControl>
    </ThemeProvider>
  )
};

export default InputValue;