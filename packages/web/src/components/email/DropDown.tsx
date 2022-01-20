import React, { useState, useEffect } from 'react';
import { InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

import { useGetForms, useGetForm } from '@frontend/shared/hooks/form/getForm';
import ErrorLoading from '../common/ErrorLoading';
import LoadingBar from '../common/LoadingBar';
import LoadingButton from '../common/LoadingButton';
import InputGroup from '../common/InputGroup';

import BulkEmail from './BulkEmail';

export default function DropDown() {
  const { data, loading, error } = useGetForms({ page: 1, limit: 20 });

  const [state, setState] = useState(null);
  const [showBulkSection, setShowBulkSection] = useState(false);
  useEffect(() => {
    setState(data);
  }, [data]);

  const handleChange = (event) => {
    setState(event.target.value);
  };
  const handleOnClick = () => {
    setShowBulkSection(!showBulkSection);
  };
  if (loading) {
    return <LoadingBar />;
  }
  if (!error && (!data || !data.getForms)) {
    return <LoadingBar />;
  }
  if (error) {
    return <ErrorLoading error={error} />;
  }

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel>Select Form</InputLabel>
        <Select value={state} label="selectForm" onChange={handleChange}>
          {state?.getForms?.data.map((form) => (
            <MenuItem value={form?._id}>{form.name}</MenuItem>
          ))}
        </Select>
        <InputGroup>
          <LoadingButton onClick={handleOnClick} size="small">
            next
          </LoadingButton>
        </InputGroup>
      </FormControl>

      {showBulkSection && state}
      {showBulkSection && <BulkEmail _id={state} />}
    </div>
  );
}
