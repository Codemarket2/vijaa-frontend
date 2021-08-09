import React from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

const filter = createFilterOptions();
export default function AutoCompleteInput({ value, setValue, cancerTypes }) {
  return (
    <>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setValue({
              cancerType: newValue,
            });
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setValue({
              cancerType: newValue.inputValue,
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
              cancerType: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        // selectOnFocus
        // clearOnBlur
        // handleHomeEndKeys
        id="free-solo-with-text-demo"
        options={cancerTypes}
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
          return option.cancerType;
        }}
        renderOption={(option) => option.cancerType}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="Add Cancer Type" variant="outlined" fullWidth />
        )}
      />
    </>
  );
}
