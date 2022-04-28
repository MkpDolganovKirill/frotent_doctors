import React, { FC, useState } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { ISortValues } from '../../../../types/types';
import SelectSortTypes from '../../../components/inputs/SelectSortTypes';
import '../../../../Styles/pages/subsidiaries/mainPage/SortPanel.scss';
import DateInput from '../../../components/inputs/DateInput';
import Buttons from '../../../components/buttons/Buttons';
import { typesButtons } from '../../../../types/enums';

interface SortPanelProps {
  values: ISortValues,
  changeValues: (field: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => void,
  dateGap: boolean,
  setDateGap: (flag: boolean) => void,
  setStateValues: (value: React.SetStateAction<{
    sortMethod: string,
    sortType: string,
    dateWith: string,
    dateFor: string
  }>) => void
};


const SortPanel: FC<SortPanelProps> = ({ values, changeValues, dateGap, setDateGap, setStateValues }) => {

  const closeFilter = () => {
    setDateGap(false);
    setStateValues({
      ...values,
      dateWith: '',
      dateFor: ''
    });
  };

  const [dateState, setDateState] = useState({
    dateWith: '',
    dateFor: ''
  });

  const changeValuesDate = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target.value;
    setDateState({
      ...dateState,
      [id]: target
    });
  };

  return (
    <div className='SortPanel'>
      <div className="sort">
        <div className='sort-method'>
          <SelectSortTypes
            id='sortMethod'
            value={values.sortMethod}
            label='Сортировать по:'
            methods={[
              {
                id: '',
                sortMethod: 'Не выбран'
              },
              {
                id: 'name',
                sortMethod: 'По имени'
              },
              {
                id: 'doctor',
                sortMethod: 'По докторам'
              },
              {
                id: 'date',
                sortMethod: 'По дате'
              }
            ]}
            changeValues={changeValues}
          />
        </div>
        {values.sortMethod ?
          <><div className='sort-type'>
            <SelectSortTypes
              id='sortType'
              value={values.sortType}
              label='Направление:'
              methods={[
                {
                  id: 'asc',
                  sortMethod: 'По возрастанию'
                },
                {
                  id: 'desc',
                  sortMethod: 'По убыванию'
                }
              ]}
              changeValues={changeValues}
            />
          </div>
          </>
          :
          <></>
        }
      </div>
      {values.sortMethod && !dateGap ?
        <h3
          className='filter'
          onClick={() => setDateGap(true)}
        >
          Добавить фильтр по дате
        </h3>
        :
        <>
          {
            values.sortMethod && dateGap ?
              <div className="date-gap">
                <div className='date-input'>
                  <DateInput
                    id='dateWith'
                    label='Дата с'
                    value={dateState.dateWith}
                    onChange={changeValuesDate}
                  />
                </div>
                <div className='date-input'>
                  <DateInput
                    id='dateFor'
                    label='Дата по'
                    value={dateState.dateFor}
                    onChange={changeValuesDate}
                  />
                </div>
                <Buttons
                  text='Фильтровать'
                  types={typesButtons.button}
                  onClick={() => setStateValues({ ...values, ...dateState })}
                />
                <Buttons
                  text='Закрыть'
                  types={typesButtons.button}
                  onClick={closeFilter}
                />
              </div>
              :
              <></>
          }
        </>
      }
    </div>
  );
};

export default SortPanel;