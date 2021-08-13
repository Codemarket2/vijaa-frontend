import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { Button, TextField, Grid } from '@material-ui/core';
import React, { useState } from 'react';

interface IProps {
  labelText?: string;
  data: any;
  editForm?: boolean;
  editInputValue?: any;
  handleCancel: any;
  handleSave: any;
}

const filter = createFilterOptions();

export default function AutoCompleteInput({
  labelText,
  data,
  editForm,
  editInputValue = null,
  handleCancel,
  handleSave,
}: IProps) {
  const [value, setValue] = useState(null);

  return (
    <>
      <Autocomplete
        value={value || editInputValue}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setValue({
              title: newValue,
            });
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setValue({
              title: newValue,
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
              title: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
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
        renderInput={(params) => (
          <TextField {...params} label={labelText} variant="outlined" fullWidth />
        )}
      />
      <Grid container lg={2} spacing={1} style={{ marginTop: 10 }}>
        <Grid item>
          <Button color="secondary" variant="contained" onClick={() => handleCancel(setValue)}>
            cancel
          </Button>
        </Grid>
        <Grid item>
          <Button color="primary" variant="contained" onClick={() => handleSave(value, setValue)}>
            save
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
