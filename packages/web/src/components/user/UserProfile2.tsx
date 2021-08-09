import React, { useState } from 'react';
import { Container, Paper, IconButton, Divider, Grid, Typography } from '@material-ui/core';

import styled from 'styled-components';
import AutoComplete from './AutoComplete';

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
          <AutoComplete />
        </StyledContainer>
      </Paper>
    </>
  );
}
