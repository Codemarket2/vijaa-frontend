import DateFnsUtils from '@date-io/date-fns';
import { Button, Container, Grid, TextField } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import 'date-fns';
import React from 'react';
import styled from 'styled-components';

import ChipInput from './ChipInput';

const StyledGridContainer = styled(Grid)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default function CreateUserProfile({
  setShowForm,
  showForm,
  data,
  error,
  loading,
  handleUpdateUserProfile,
  setState,
  state,
}) {
  const handleDateChange = (date: Date | null) => {
    setState({ ...state, dateOfDiagnose: date });
    console.log(state.dateOfDiagnose);
  };

  const handleCancerType = (e) => {
    const cancerType = e.target.value;
    setState({ ...state, cancerType: cancerType });
  };

  const handleChangeInput = (index, event) => {
    const values = [...state.doctors];
    values[index][event.target.name] = event.target.value;
    setState({ ...state, doctors: values });
  };

  const handleAddFields = () => {
    setState({ ...state, doctors: [...state.doctors, { name: '', hospital: '' }] });
  };

  const handleRemoveFields = (index) => {
    const values = [...state.doctors];
    values.splice(index, 1);
    setState({ ...state, doctors: values });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateUserProfile({
      variables: {
        userProfile: state,
      },
    });
    setShowForm(!showForm);
  };

  const handleSymptoms = (symptom) => {
    setState({ ...state, symptoms: symptom });
  };

  return (
    <div>
      <Container>
        <form onSubmit={handleSubmit}>
          <TextField
            id="outlined-name"
            label="Cancer Type"
            value={state.cancerType}
            onChange={handleCancerType}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="dialog"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Select Date of Diagnose"
              fullWidth
              value={state.dateOfDiagnose}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'Date of Diagnose ',
              }}
            />
          </MuiPickersUtilsProvider>
          {state.doctors.map((inputField, index) => (
            <StyledGridContainer container lg={12} key={index} spacing={1}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  id="outlined-name"
                  label="Doctor Name"
                  name="name"
                  value={inputField.name}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  onChange={(event) => handleChangeInput(index, event)}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  id="outlined-name"
                  label="Hospital Name"
                  name="hospital"
                  value={inputField.hospital}
                  onChange={(event) => handleChangeInput(index, event)}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item lg={3} md={3} sm={6} xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddFields()}>
                  Add
                </Button>
              </Grid>
              {state.doctors.length === 1 ? null : (
                <Grid item lg={3} md={3} sm={6} xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRemoveFields(index)}>
                    remove
                  </Button>
                </Grid>
              )}
            </StyledGridContainer>
          ))}
          <ChipInput onChange={handleSymptoms} />
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Button fullWidth variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </form>
      </Container>
    </div>
  );
}
