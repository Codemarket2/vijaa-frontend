import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';

import InputGroup from '../InputGroup';

interface IProps {
  formik: any;
}
export default function index({ formik }: IProps) {
  const [state, setState] = useState({
    value: '',
    emails: [],
    error: null,
  });

  useEffect(() => {
    formik.setFieldValue('emails', state.emails, false);
  }, [state.emails]);

  const handleChange = (e) => {
    setState({
      ...state,
      value: e.target.value,
      error: null,
    });
  };

  const handleDelete = (toBeRemoved) => {
    setState({ ...state, emails: state.emails.filter((email) => email !== toBeRemoved) });
  };
  function isEmail(email) {
    return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
  }

  function isInList(email) {
    return state.emails.find((e) => e === email);
  }

  function isValid(email) {
    let error = null;
    if (!isEmail(email)) {
      error = `${email} is not a valid email address.`;
    }

    if (isInList(email)) {
      error = `${email} has already been added.`;
    }

    if (error) {
      setState({ ...state, error });

      return false;
    }

    return true;
  }

  const handleKeyDown = (e) => {
    if (['Enter', 'Tab', ','].includes(e.key)) {
      e.preventDefault();
      let email = state.value.trim();
      if (email && isValid(email)) {
        setState({ ...state, emails: [...state.emails, email], value: '', error: null });
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    var paste = e.clipboardData.getData('text');
    var emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

    if (emails) {
      var toBeAdded = emails.filter((email) => !isInList(email));

      setState({ ...state, emails: [...state.emails, ...toBeAdded] });
    }
  };
  return (
    <>
      <InputGroup>
        <TextField
          fullWidth
          label="To"
          variant="outlined"
          name="emails"
          size="small"
          type="email"
          placeholder="Type or paste email addresses and press `Enter`"
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          value={state.value}
          onChange={handleChange}
          error={
            (state.error && Boolean(state.error)) ||
            (formik.touched.emails && Boolean(formik.errors.emails))
          }
          helperText={state.error || (formik.touched.emails && formik.errors.emails)}
        />
      </InputGroup>
      {state.emails.map((email) => (
        <React.Fragment key={email}>
          <Chip label={email} onDelete={() => handleDelete(email)} />
        </React.Fragment>
      ))}
    </>
  );
}
