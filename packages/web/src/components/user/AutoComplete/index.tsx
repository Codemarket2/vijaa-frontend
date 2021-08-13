import AddIcon from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';
import produce from 'immer';
import React, { useState } from 'react';

import AutoCompleteInput from './AutoCompleteInput';
import DisplayItems from './DisplayItems';
interface IProps {
  title: string;
  buttonTitle: string;
  data: any;
}
export default function AutoComplete({ buttonTitle, data, title }: IProps) {
  const [showForm, setShowFrom] = useState(false);
  const [displayItems, setDisplayItems] = useState([]);

  const handleCancel = (setValue) => {
    setValue(null);
    setShowFrom(false);
  };

  const handleDelete = (index) => {
    setDisplayItems(
      produce(displayItems, (draft) => {
        draft.splice(index, 1);
      }),
    );
  };

  const handleUpdateInput = (item, setEditForm) => (value, setValue) => {
    if (value !== null) {
      const index = displayItems.findIndex((index) => index.id === item.id);
      setDisplayItems(
        produce(displayItems, (draft) => {
          draft[index].title = value.title;
        }),
      );
      setValue(null);
      setEditForm(false);
    }
  };

  const handleSave = (value, setValue) => {
    if (value !== null) {
      setDisplayItems([...displayItems, value]);
      setValue(null);
      setShowFrom(false);
    }
  };

  return (
    <div>
      <h6>{title}</h6>
      <div style={{ marginBottom: 20 }}>
        {!showForm && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setShowFrom(!showForm)}>
            {buttonTitle}
          </Button>
        )}
        {showForm && (
          <>
            <AutoCompleteInput
              handleCancel={handleCancel}
              handleSave={handleSave}
              data={data}
              labelText={buttonTitle}
            />
          </>
        )}
      </div>
      {displayItems &&
        displayItems.map((item, index) => (
          <div key={item.id}>
            <DisplayItems
              index={index}
              handleDelete={handleDelete}
              data={data}
              handleUpdateInput={handleUpdateInput}
              item={item}
            />
          </div>
        ))}
    </div>
  );
}
