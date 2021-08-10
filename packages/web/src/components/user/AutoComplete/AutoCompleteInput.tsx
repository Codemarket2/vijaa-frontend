import React from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

const filter = createFilterOptions();

interface IProps {
  label: string;
  data: any;
  value: any;
  setValue: any;
  generateKey: any;
}

export default function AutoCompleteInput({ value, setValue, data, label, generateKey }: IProps) {
  return (
    <>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setValue({
              [generateKey(data, 'getDataKey')]: newValue,
            });
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setValue({
              [generateKey(data, 'getDataKey')]: newValue.inputValue,
            });
          } else {
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          // Suggest the creation of a new value
          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              [generateKey(data, 'getDataKey')]: `Add "${params.inputValue}"`,
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
          const getKeys = Object.keys(option);
          let keyS = getKeys[0];
          // Value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          // generateKey(option);
          return option[keyS];
        }}
        renderOption={(option) => generateKey(option)}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label={label} variant="outlined" fullWidth />
        )}
      />
    </>
  );
}
