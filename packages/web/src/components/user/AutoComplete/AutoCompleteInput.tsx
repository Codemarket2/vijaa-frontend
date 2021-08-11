import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import produce from 'immer';

const filter = createFilterOptions();

interface IProps {
  label: string;
  data: any;
  value: any;
  setValue: any;
}

export default function AutoCompleteInput({ value, setValue, data, label }: IProps) {
  const [getValue, setGetValue] = useState(null);
  return (
    <>
      <Autocomplete
        value={getValue}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setValue(
              produce(value, (draft) => {
                draft.push({
                  title: newValue,
                });
              }),
            );
          } else if (newValue && newValue.inputValue) {
            setValue(
              produce(value, (draft) => {
                draft.push({
                  title: newValue.inputValue,
                });
              }),
            );
          } else {
            setValue(
              produce(value, (draft) => {
                draft.push(newValue);
              }),
            );
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          // Suggest the creation of a new value
          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              title: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        // selectOnFocus
        // clearOnBlur
        // handleHomeEndKeys
        id="free-solo-with-text-demo"
        options={data}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.title;
        }}
        renderOption={(option) => option.title}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label={label} variant="outlined" fullWidth />
        )}
      />
    </>
  );
}
