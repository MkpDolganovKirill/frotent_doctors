import React, { FC, useState } from 'react';
import axios from 'axios';
import { SelectChangeEvent } from '@mui/material';
import Buttons from '../../../components/buttons/Buttons';
import InputValue from '../../../components/inputs/InputValue';
import DateInput from '../../../components/inputs/DateInput';
import InputSelect from '../../../components/inputs/InputSelect';
import { typesButtons } from '../../../../types/enums';
import '../../../../Styles/pages/subsidiaries/mainPage/CreateOrder.scss';
import { IDoctorsData } from '../../../../types/types';
import { useNavigate } from 'react-router-dom';

interface CreateOrderProps {
  updateOrders: () => void,
  lostConnect: () => void,
  doctors: IDoctorsData[]
};

const CreateOrder: FC<CreateOrderProps> = ({ updateOrders, lostConnect, doctors }) => {

  const navigate = useNavigate();

  const [createValues, setCreateValues] = useState({
    patient: '',
    ordersdate: '',
    complaints: '',
    doctorid: 0
  });

  const [invalid, setInvalid] = useState(true);

  const validateValues = (newValues: any) => {
    if (
      newValues.patient &&
      newValues.ordersdate &&
      new Date(newValues.ordersdate).getTime() / 8.64e+7 >= Math.floor(new Date().getTime() / 8.64e+7) &&
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
    await axios.post('http://localhost:8080/addNewOrder', {
      ...createValues
    }, {
      headers: {
        accesstoken: `${localStorage.getItem('token')}`
      }
    }).then(() => {
      setCreateValues({
        patient: '',
        doctorid: 0,
        ordersdate: '',
        complaints: ''
      });
      setInvalid(true);
      updateOrders();
    }).catch(err => {
      if (!err.response) return lostConnect();
      if (err.response.data === "Uncorrect token!") return navigate('/auth/authorization', { replace: true });
    })
  }

  return (
    <div className='CreateOrder'>
      <div className='create-input'>
        <InputValue
          id='patient'
          type='text'
          value={createValues.patient}
          onChange={changeValues}
          labelText='Имя'
          placeholder='Введите ваше имя'
        />
      </div>
      <div className='create-input'>
        <InputSelect
          id='doctorid'
          value={createValues.doctorid}
          doctors={doctors}
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