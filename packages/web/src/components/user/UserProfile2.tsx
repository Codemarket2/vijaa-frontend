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
          <AutoComplete buttonTitle="Add Cancer type" data={cancerTypes} title="Cancer Type" />
          <AutoComplete buttonTitle="Add Doctor" data={drNames} title="Add Doctor" />
          <AutoComplete buttonTitle="Add symptoms" data={symptoms} title="Add symptoms" />
          <DatePicker />
        </StyledContainer>
      </Paper>
    </>
  );
}

const drNames = [
  { title: 'Muzzamil', id: 1 },
  { title: 'Simon', id: 2 },
  { title: 'Alex', id: 3 },
  { title: 'Jennifer', id: 4 },
  { title: 'Max', id: 5 },
];

const symptoms = [
  { title: 'Pain', id: 1 },
  { title: 'Fatigue', id: 2 },
  { title: 'Fever', id: 3 },
  { title: 'Weight loss without trying.', id: 4 },
  { title: 'Changes in your skin.', id: 5 },
];
const cancerTypes = [
  { title: 'Bladder Cancer', id: 1 },
  { title: 'Colorectal Cancer', id: 2 },
  { title: 'Kidney Cancer', id: 3 },
  { title: 'Lung Cancer - Non-Small Cell', id: 4 },
  { title: 'Lymphoma - Non-Hodgkin', id: 5 },
];
