import React, { useState } from 'react';
import { Container, Paper, IconButton, Grid } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import styled from 'styled-components';

import { useGetUserProfile, useUpdateUserProfile } from '@frontend/shared/hooks/user/users';
import Loading from '../common/Loading';
import ErrorLoading from '../common/ErrorLoading';
import CreateUserProfile from './CreateUserProfile';
import DisplayUserProfile from './DisplayUserProfile';

const StyledContainer = styled(Container)`
  padding: 2%;
`;

const StyledGrid = styled(Grid)`
  display: flex;
  justify-content: flex-end;
`;

export default function UserProfile2() {
  const {
    error: getUserProfileError,
    data: getUserProfileData,
    loading: getUserProfileLoading,
  } = useGetUserProfile();
  const { data, error, loading, handleUpdateUserProfile, setState, state } = useUpdateUserProfile();

  const [showForm, setShowForm] = useState(false);

  // if (getUserProfileLoading) return <Loading />;
  if (getUserProfileError) return <ErrorLoading error={getUserProfileError} />;

  const { userProfile } = getUserProfileData?.getUserProfile;
  if (userProfile === null) {
    return (
      <CreateUserProfile
        setShowForm={setShowForm}
        showForm={setShowForm}
        data={data}
        error={error}
        loading={loading}
        handleUpdateUserProfile={handleUpdateUserProfile}
        setState={setState}
        state={state}
      />
    );
  }
  return (
    <>
      <Paper
        variant="outlined"
        className="my-2 pr-1 d-flex justify-content-between align-items-center"
        style={{ minHeight: 55 }}>
        <StyledContainer>
          <Grid container alignItems="center">
            <Grid item lg={11} md={11} sm={11} xs={11}>
              <h5>User Profile</h5>
            </Grid>
            <StyledGrid item lg={1} md={1} sm={1} xs={1}>
              <IconButton onClick={() => setShowForm(!showForm)}>
                <CreateIcon />
              </IconButton>
            </StyledGrid>
          </Grid>
          {showForm && (
            <CreateUserProfile
              setShowForm={setShowForm}
              showForm={setShowForm}
              data={data}
              error={error}
              loading={loading}
              handleUpdateUserProfile={handleUpdateUserProfile}
              setState={setState}
              state={state}
            />
          )}
          {!showForm && (loading ? <Loading /> : <DisplayUserProfile data={getUserProfileData} />)}
        </StyledContainer>
      </Paper>
    </>
  );
}
