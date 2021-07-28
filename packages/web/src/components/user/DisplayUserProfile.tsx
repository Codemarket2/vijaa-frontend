import { Button, Container, Paper, Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  display: flex !important;
  justify-content: center !important;
  align-items: center;
  flex-direction: column;
  padding: 5%;
`;

export default function DisplayUserProfile({ data, setShowUserProfile, showUserProfile }) {
  const { cancerType, dateOfDiagnose, symptoms, doctors } = data?.getUserProfile?.userProfile;
  return (
    <div>
      <Paper
        variant="outlined"
        className="my-2 pr-1 d-flex justify-content-between align-items-center"
        style={{ minHeight: 55 }}>
        <StyledContainer>
          <Typography>Cancer Type : {cancerType}</Typography>
          <Typography>Date Of Diagnose : {dateOfDiagnose}</Typography>
          {doctors.map((doctor) => (
            <div key={doctor?._id}>
              <Typography>Doctor Name: {doctor?.name}</Typography>
              <Typography>Hospital Name: {doctor?.hospital}</Typography>
            </div>
          ))}
          <Typography>
            symptoms:
            {symptoms.map((symptom) => `${symptom} `)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowUserProfile(!showUserProfile)}>
            Update UserProfile
          </Button>
        </StyledContainer>
      </Paper>
    </div>
  );
}
