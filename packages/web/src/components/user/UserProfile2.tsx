import { Container, Paper, IconButton, Divider, Grid, Typography } from '@material-ui/core';
import 'date-fns';
import React, { useState } from 'react';
import styled from 'styled-components';

import AutoComplete from './AutoComplete';
import DatePicker from './AutoComplete/DatePicker';

const StyledContainer = styled(Container)`
  padding: 2%;
`;

export default function UserProfile2() {
  return (
    <>
      <Paper
        variant="outlined"
        className="my-2 pr-1 d-flex justify-content-between align-items-center"
        style={{ minHeight: 55 }}>
        <StyledContainer>
          <Grid container alignItems="center" style={{ marginBottom: 20 }}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <h5>User Profile</h5>
              <Divider />
            </Grid>
          </Grid>
          <AutoComplete title="Cancer Type" data={cancerTypes} label="Add Cancer Type" />
          <AutoComplete title="Doctors " data={drNames} label="Add Doctor Name" />
          <AutoComplete title="symptoms " data={symptoms} label="Add symptoms " />
          <DatePicker />
        </StyledContainer>
      </Paper>
    </>
  );
}

const drNames = [
  { title: 'Muzzamil' },
  { title: 'Simon' },
  { title: 'Alex' },
  { title: 'Jennifer' },
  { title: 'Max' },
];

const symptoms = [
  { title: 'Pain' },
  { title: 'Fatigue' },
  { title: 'Fever' },
  { title: 'Weight loss without trying.' },
  { title: 'Changes in your skin.' },
];
const cancerTypes = [
  { title: 'Bladder Cancer' },
  { title: 'Colorectal Cancer' },
  { title: 'Kidney Cancer' },
  { title: 'Lung Cancer - Non-Small Cell' },
  { title: 'Lymphoma - Non-Hodgkin' },
  { title: 'Melanoma' },
  { title: 'Oral and Oropharyngeal Cancer' },
  { title: 'Pancreatic Cancer' },
];
