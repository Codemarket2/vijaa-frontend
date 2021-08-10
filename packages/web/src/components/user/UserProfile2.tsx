import { Container, Paper, IconButton, Divider, Grid, Typography } from '@material-ui/core';
import 'date-fns';
import React, { useState } from 'react';
import styled from 'styled-components';

import AutoComplete from './AutoComplete';
import ChipComponent from './AutoComplete/ChipComponent';
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
          <AutoComplete addtitle="Cancer Type" data={cancerTypes} label="Add Cancer Type" />
          <AutoComplete addtitle="Dr name" data={drNames} label="Add Doctor Name" />
          <DatePicker />
          <ChipComponent />
        </StyledContainer>
      </Paper>
    </>
  );
}

const drNames = [
  { name: 'muzzamil' },
  { name: 'simon' },
  { name: 'alex' },
  { name: 'jennifer' },
  { name: 'max' },
];

const cancerTypes = [
  { cancerType: 'Bladder Cancer' },
  { cancerType: 'Colorectal Cancer' },
  { cancerType: 'Kidney Cancer' },
  { cancerType: 'Lung Cancer - Non-Small Cell' },
  { cancerType: 'Lymphoma - Non-Hodgkin' },
  { cancerType: 'Melanoma' },
  { cancerType: 'Oral and Oropharyngeal Cancer' },
  { cancerType: 'Pancreatic Cancer' },
];
