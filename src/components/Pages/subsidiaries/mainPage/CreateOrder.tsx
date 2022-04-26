import React, { FC, useState } from 'react';
import axios from 'axios';
import { SelectChangeEvent } from '@mui/material';
import Buttons from '../../../components/buttons/Buttons';
import InputValue from '../../../components/inputs/InputValue';
import DateInput from '../../../components/inputs/DateInput';
import InputSelect from '../../../components/inputs/InputSelect';
import { typesButtons } from '../../../../types/enums';
import '../../../../Styles/pages/subsidiaries/mainPage/CreateOrder.scss';

interface CreateOrderProps {
  updateOrders: () => void
};

const CreateOrder: FC<CreateOrderProps> = ({ updateOrders }) => {
  const [createValues, setCreateValues] = useState({
    fullname: '',
    ordersdate: '',
    complaints: '',
    doctorid: 0
  });

  const [invalid, setInvalid] = useState(true);

  const validateValues = (newValues: any) => {
    if (
      newValues.fullname &&
      newValues.ordersdate &&
      newValues.complaints &&
      newValues.doctorid
    ) {
      setInvalid(false);
    } else {
      setInvalid(true);
    };
  };

  const changeValues = (id: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<number>) => {
    let value = event.target.value;
    const newValues = { ...createValues, [id]: value };
    setCreateValues(newValues);
    validateValues(newValues);
  };

  const handleSubmit = async () => {
    console.log(createValues);
    await axios.post('http://localhost:8080/addNewOrder', {
      ...createValues 
    }, {
      headers: { 
        accesstoken: `${localStorage.getItem('token')}` 
      }
    }).then(res => {
      setCreateValues({
        fullname: '',
        doctorid: 0,
        ordersdate: '',
        complaints: ''
      });
      updateOrders();
    }).catch(err => {
      console.log({...err});
    })
  }

  return (
    <div className='CreateOrder'>
      <div className='create-input'>
        <InputValue 
          id='fullname' 
          type='text' 
          value={createValues.fullname} 
          onChange={changeValues} 
          labelText='Имя'
          placeholder='Введите ваше имя'
        />
      </div>
      <div className='create-input'>
        <InputSelect 
          id='doctorid'
          value={createValues.doctorid}
          onChange={changeValues} 
          label='Врач:' 
        />
      </div>
      <div className='create-input-date'>
        <DateInput 
          id='ordersdate' 
          value={createValues.ordersdate} 
          onChange={changeValues} 
          label='Дата приема'
        />
      </div>
      <div className='create-input-conplaints'>
        <InputValue 
          id='complaints'
          type='text' 
          value={createValues.complaints} 
          onChange={changeValues} 
          labelText='Жалобы'
          placeholder='Введите ваши жалобы' 
        />
      </div>
      <div className='create-button'>
        <Buttons 
          text='Добавить' 
          types={typesButtons.button} 
          onClick={handleSubmit} 
          disabled={invalid}
        />
      </div>
    </div>
  )
};

export default CreateOrder;